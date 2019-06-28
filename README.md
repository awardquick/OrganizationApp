# OrganizationApp 

## Challenge Instructions 

Be on either AWS or Azure as a native app.
Leverage some element of Azure or AWS for part of the application functionality.  Does not matter which part or what it actually does, as long as it is somewhat relevant in the overall app.
Leverage at least one third party API to demonstrate integration with an API or service, does not matter which one or what it does.
A reasonably well thought out and clean Ux.  Note we are not evaluating Ux design, however design should be clear, clean, and functional.
All code must be stored on a Github repository for evaluation.

## Design Overview
This solution was built from the Visual Studio ASP.NET Core 2.2 Angular template. The ASP.Net core app has a hosted service which allows users
to create, edit, update and delete organizations and users. Upon creation of a new user the login form fires a call to an azure function which
then calls to the mailboxvalidatorAPI which will respond with an on the screen alert to notify the user unless the email is validated. 

## Client-Side
The frontend of this application is Angular 6 which is rendered from the appModule.html The commponents are standard angular with bootstrap. 

## ServerSide

##### Models
The models are built off of EF Core with a standard MVC style .net core folder layout. 

##### Repository
I decided to implement the repository pattern keeping in mind a possible future buildout where we wanted to implement more models and methods by which they interact with the DB. All the classes here implement the IOrgrepo generic interface. 

##### Controller
The controller logic of course is handling on the requests and interactions with the models returning relevant results based on the rest call and api route.

This site is being currently hosted at 
https://organizationapplearnondemand.azurewebsites.net/
