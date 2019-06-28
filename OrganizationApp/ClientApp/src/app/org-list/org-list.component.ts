import { Component, OnInit } from '@angular/core';
import { DataService, AlertService  } from 'src/app/shared';
import { Observable } from 'rxjs';
import { Organization } from "../models/organization";
import { User } from "../models/user";
import { UserListComponent } from '../user-list/user-list.component';

@Component({
  selector: 'app-org-list',
  templateUrl: './org-list.component.html',
  styleUrls: ['./org-list.component.css']
})
export class OrgListComponent implements OnInit {
  loaded: boolean;
  userspage = false;
  public organizations: Organization[] = [];
  public user: User[] = [];
  selected = false;

  constructor(private dataSvc: DataService, private alertSvc: AlertService) {}
 
  ngOnInit() {
    this.reloadData();
    this.loaded = true;
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
        error => {
          this.alertSvc.error(error);
        });
  }

}
