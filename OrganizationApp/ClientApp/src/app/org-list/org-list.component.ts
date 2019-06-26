import { Component, OnInit } from '@angular/core';
import { DataService } from "../shared/DataService";
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
  userspage = false;
  public organizations: Organization[] = [];
  selected = false;
  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.dataSvc.getOrganizations()
      .subscribe(success => {
        if(success) {
          this.organizations = this.dataSvc.organizations;
        }
      })
  }

  deleteOrg(id: number) {
    this.dataSvc.deleteOrganization(id)
      .subscribe((data) => {
          this.reloadData();
      },
     error => console.log(error));
  }

}
