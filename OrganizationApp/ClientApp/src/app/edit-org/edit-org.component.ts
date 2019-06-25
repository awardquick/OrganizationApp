import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../shared/DataService';
import { Organization } from '../models/organization';

@Component({
  selector: 'app-edit-org',
  templateUrl: './edit-org.component.html',
  styleUrls: ['./edit-org.component.css']
})
export class EditOrgComponent implements OnInit {

  @Input() organization: Organization;


  constructor(private dataSvc: DataService) { }

 

  ngOnInit() {
    if (this.dataSvc.organizations) {
      this.organization = this.dataSvc.organizations[0];
    }
    console.log(this.organization);
  }

  updateOrganization(): void {
  }

  save() {
    this.dataSvc.updateOrganization(this.organization.organizationId, this.organization)
      .subscribe(data => console.log(data), error => console.log(error));
    console.log(this.organization);
    alert("Organization successfully edited")
  }

  onSubmit() {
    this.save();
  }
}
