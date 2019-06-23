import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from "rxjs/operators";
import { Observable } from 'rxjs';
import { Organization } from '../shared/organization';

@Injectable()
export class DataService {

  constructor(private http: HttpClient) { }

  public organizations: Organization[] = [];

  getOrganizations(): Observable<boolean> {
    return this.http.get("/api/organizations")
      .pipe(
        map((data: any[]) => {
        this.organizations = data;
        return true;
      }));
  }
}
