import { Component, OnInit } from '@angular/core';
import { DataService } from '../shared/DataService';
import { User } from '../models/User';
import { Organization } from '../models/organization';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  user: User = new User();
  submitted = false;

  constructor(private dataSvc: DataService) {
  }

  public organizations: Organization[] = [];


  ngOnInit() {
    this.loadOrgs();
  }

  loadOrgs() {
    this.dataSvc.getOrganizations()
      .subscribe(success => {
        if (success) {
          this.organizations = this.dataSvc.organizations;
        }
      });
  }

  newUser(): void {
    this.submitted = false;
    this.user = new User();
  }

  save() {
    let orgId = this.parseId();
    this.user.organizationId = orgId;
    this.dataSvc.addUser(this.user)
      .subscribe(data => console.log(data), error => console.log(error));
    this.user = new User();
  }

  onSubmit() {
    this.submitted = true;
    this.save();
  }

  parseId() {
    let idString: string;
    idString = this.user.organizationId.toLocaleString();
    this.user.organizationId = parseInt(idString.replace(/[^\d.-]/g, ''));
    return this.user.organizationId;
  }
}
