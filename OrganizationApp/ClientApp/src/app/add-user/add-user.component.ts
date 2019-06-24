import { Component, OnInit } from '@angular/core';
import { DataService } from '../shared/dataservice';
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
    this.dataSvc.getOrganizations()
      .subscribe(success => {
        if (success) {
          this.organizations = this.dataSvc.organizations;
          console.log(this.organizations);
        }
      })
  }

  newUser(): void {
    this.submitted = false;
    this.user = new User();
  }

  save() {
    let id;
    let idString: string;
    idString = this.user.organizationId.toLocaleString();
      this.user.organizationId = parseInt(idString.replace(/[^\d.-]/g, ''));
    this.dataSvc.addUser(this.user)
      .subscribe(data => console.log(data), error => console.log(error));
    this.user = new User();
    console.log(this.user);
  }

  onSubmit() {
    this.submitted = true;
    this.save();
  }
}
