import { Component, OnInit, Input } from '@angular/core';
import { DataService } from "../shared/dataservice";
import { Observable, pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/User';
import { Organization } from '../models/organization';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  @Input() organization: Organization;

  constructor(private dataSvc: DataService) {
  }

  public users: User[] = [];
  public orgId;

  ngOnInit() {
    if (this.dataSvc.organizations[0].organizationId >= 0) {
      this.orgId = this.dataSvc.organizations[0].organizationId;
    }
    this.reloadData(this.orgId);
  }

  reloadData(id: number) {
    this.dataSvc.getUsersByOrg(id)
      .subscribe((success) => {
        if (success) {
          this.users = this.dataSvc.users;
          console.log(this.users);
        }
      });
  }

  deleteUser(id: number) {
    console.log(id);
    this.dataSvc.deleteUser(id)
      .subscribe((data) => {
        console.log(data);
        this.reloadData(this.orgId);
      },
        error => console.log(error));
  }

}
