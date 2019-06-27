import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../shared/DataService';
import { User } from '../models/user';
import { Organization } from '../models/organization';


@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  @Input() user: User;

  constructor(private dataSvc: DataService) { } 

  public organizations: Organization[] = [];
  submitted = false;

  ngOnInit() {
    this.loadOrgs();
    if (this.dataSvc.users) {
      this.user = this.dataSvc.users[0];
    }
  }

  loadOrgs() {
    this.dataSvc.getOrganizations()
      .subscribe(success => {
        if (success) {
          this.organizations = this.dataSvc.organizations;
        }
      });
  }

  save() {
    let orgId = this.parseId();
    this.user.organizationId = orgId;
    this.dataSvc.updateUser(this.user.userId, this.user)
      .subscribe(data => console.log(data), error => console.log(error));
    console.log(this.user);
    alert("Organization successfully edited")
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
