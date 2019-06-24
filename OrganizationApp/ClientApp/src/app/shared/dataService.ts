import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from "rxjs/operators";
import { Observable } from 'rxjs';
import { Organization } from '../models/organization';
import { User } from '../models/User';

@Injectable()

export class DataService {

  constructor(private http: HttpClient) { }

  public organizations: Organization [] = [];
  public users: User [] = [];

  getOrganizations() {
    return this.http.get('/api/organizations')
      .pipe(
      map((data: any[]) => {
        this.organizations = data;
        return true;
      }));
  }

  addOrganization(organization: Object): Observable<Object> {
    return this.http.post('/api/organizations', organization);
  }

  deleteOrganization(id: number): Observable<number>{
    return this.http.delete<number>('/api/organizations/' + id)
  }

  getUsers() {
    return this.http.get('/api/users')
      .pipe(
        map((data: any[]) => {
          this.users = data;
          return true;
        }));

  }

  addUser(user: Object): Observable<Object> {
    return this.http.post('/api/users', user);
  }

  getUsersByOrg(id: number) {
    return this.http.get('/api/users/usersbyorg/' + id)
      .pipe(
        map((data: any[]) => {
          this.users = data;
          return true;
        }));
  }

  deleteUser(id: number): Observable<number> {
    return this.http.delete<number>('/api/users/' + id)
  }

}
