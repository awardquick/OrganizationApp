### OrganizationApp


##### Design Overview
This solution was built from the Visual Studio ASP.NET Core 2.2 Angular template. The ASP.Net core app has a hosted service which allows users
to create, edit, update and delete organizations and users. Upon creation of a new user the login form fires a call to an azure function which
then calls to the mailboxvalidatorAPI which will respond with an on the screen alert to notify the user unless the email is validated. 

The 
