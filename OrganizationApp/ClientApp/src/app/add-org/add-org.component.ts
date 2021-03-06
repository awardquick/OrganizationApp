import { Component, OnInit } from '@angular/core';
import { DataService } from '../shared/DataService';
import { Organization } from '../models/organization';

@Component({
  selector: 'app-add-org',
  templateUrl: './add-org.component.html',
  styleUrls: ['./add-org.component.css']
})
export class AddOrgComponent implements OnInit {

  organization: Organization = new Organization();
  submitted = false;

  constructor(private dataSvc: DataService) {
  }

  ngOnInit() {
  }

  newOrganization(): void {
    this.submitted = false;
    this.organization = new Organization();
  }

  save() {
    this.dataSvc.addOrganization(this.organization)
      .subscribe(data => console.log(data), error => console.log(error));
    this.organization = new Organization();
  }

  onSubmit() {
    this.submitted = true;
    this.save();
  }
}
