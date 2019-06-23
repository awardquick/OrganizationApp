import { Component, OnInit } from '@angular/core';
import { DataService } from "../shared/dataService";
import { Organization } from "../shared/organization";

@Component({
  selector: 'app-org-list',
  templateUrl: './org-list.component.html',
  styleUrls: ['./org-list.component.css']
})
export class OrgListComponent implements OnInit {

  constructor(private data: DataService) {
    this.organizations = data.organizations;
  }

  public organizations: Organization[]= [];

  ngOnInit() {
    this.data.getOrganizations()
      .subscribe(success => {
        if (success) {
          this.organizations = this.data.organizations;
        }
      });
  }

}
