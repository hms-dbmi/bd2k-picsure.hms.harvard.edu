## Security
#### Overview
The IRCT allows for users to interact with several different resources as themselves. This allows the resources to dictate the access levels that they want to provide their users and doesn't require that multiple organizations come to an agreement on authorization privileges. To allow a user to switch between different applications without having to log in again the IRCT generates a unique key. This key can be used to start another secure session in a different application as the same user by calling the start session function of the security service.

Since the IRCT allows for multiple actions then the means by which the user communicates with the IRCT needs to support cookies. You should check with the library you are using to make the sure the calls allow for the proper handling of cookies.

#### Obtaining Keys
A user can obtain keys in one of two ways. The first, and most popular way, is through another system such as i2b2/tranSMART. The second way is by submitting a valid Java Web Token (JWT) to the IRCT security service requesting a token. This can be accomplished by calling doing the Security Services Create Key function. Both of these methods result in an end user obtaining a randomly generated and unique 26 character alphanumeric string.

_GET /rest/v1/securityService/createKey_

HTTP Header
```
Authorization : Bearer <JWT_TOKEN>
```

Response
```JSON
{
  "key": "<key>"
}
```

Example Response
```JSON
{
  "key":"afed8417s1u67v7ln9s9oflh6k"
}
```

#### Using Keys
Keys are a simple way to start a secure session with the IRCT so that they can then interact with other resources. Keys expire after a set period of time. Users should check with their IRCT administrator to see how long their keys are valid.


*GET /rest/v1/securityService/startSession?key=&lt;key&gt;*

Response
```JSON
{
  "status": "<status>"
}
```


Example Response
```JSON
{
  "status": "success"
}
```
