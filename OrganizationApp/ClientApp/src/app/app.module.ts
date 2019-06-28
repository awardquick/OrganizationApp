import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { OrgListComponent } from './org-list/org-list.component';
import { AddOrgComponent } from './add-org/add-org.component';
import { DataService } from './shared/DataService';
import { AddUserComponent } from './add-user/add-user.component';
import { UserListComponent } from './user-list/user-list.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { EditOrgComponent } from './edit-org/edit-org.component';
import { AlertComponent } from './alert/alert.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    OrgListComponent,
    AddOrgComponent,
    AddUserComponent,
    UserListComponent,
    EditUserComponent,
    EditOrgComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'org-list', component: OrgListComponent },
      { path: 'add-org', component: AddOrgComponent },
      { path: 'user-list', component: UserListComponent },
      { path: 'add-user', component: AddUserComponent },
      { path: 'edit-user', component: EditUserComponent },
      { path: 'edit-org', component: EditOrgComponent }
    ])
  ],
  providers: [
    DataService
],
  bootstrap: [AppComponent]
})
export class AppModule { }
