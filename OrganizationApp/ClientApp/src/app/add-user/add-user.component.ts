import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../shared/DataService';
import { User } from '../models/user';
import { Organization } from '../models/organization';
import { HttpClient } from '@angular/common/http';
import { EmailValidation } from '../models/emaildata';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {


  user: User = new User();
  submitted = false;
  validation: any;
  mailData: any;

  constructor(private dataSvc: DataService, private http: HttpClient) {
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
    const emailData = {
      "email": this.user.email
    }

    this.dataSvc.checkEmail(emailData).subscribe(data => {
      this.mailData = data;
      console.log(this.mailData);
      if (this.mailData) {
        if (this.mailData.score < 0.65 && this.mailData.format_valid != true) {
            alert("Sorry your email doesn't seem to be valid. Please enter a valid Email")
        }
        else if(this.mailData == "Please pass an email in the request body"){
          alert("Email is required in order to submit this form!")
        }
          else {
            this.submitted = true;
            this.save();
          }
        }
      (error: any) => {
          console.log(error);
        }
    });
    //this.submitted = true;
    //this.save();
  }

  parseId() {
    let idString: string;
    idString = this.user.organizationId.toLocaleString();
    this.user.organizationId = parseInt(idString.replace(/[^\d.-]/g, ''));
    return this.user.organizationId;
  }
}
