import { Component, OnInit } from '@angular/core';
import { DataService } from "../shared/dataservice";
import { Observable } from 'rxjs';
import { Organization } from "../models/organization";
import { UserListComponent } from '../user-list/user-list.component';

@Component({
  selector: 'app-org-list',
  templateUrl: './org-list.component.html',
  styleUrls: ['./org-list.component.css']
})
export class OrgListComponent implements OnInit {

  constructor(private dataSvc: DataService) { }

  public organizations: Organization[] = [];

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.dataSvc.getOrganizations()
      .subscribe(success => {
        if(success) {
          this.organizations = this.dataSvc.organizations;
          console.log(this.organizations);
        }
      })
  }

  deleteOrg(id: number) {
    console.log(id);
    this.dataSvc.deleteOrganization(id)
      .subscribe((data) => {
          console.log(data);
          this.reloadData();
      },
     error => console.log(error));
  }

}
