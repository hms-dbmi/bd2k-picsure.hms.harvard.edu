[Home](./index.md) > Security

# Security
### Overview
One of the features of the IRCT is that allows for users to interact with different resources as their logged in user. This allows the resources themselves to set the access levels that they want to provide their users and doesn't require that multiple organizations come to an agreement on authorization privileges. To allow a user to switch between different applications without having to log in again the IRCT can start a secure session with a generated unique key. This key can be used to start another secure session in a different application as the same user by calling the start session function of the security service. These keys are valid for only a set period of time.

Since the IRCT allows for multiple actions then the means by which the user communicates with the IRCT needs to support cookies. You should check with the library or program that you are using to make the sure the calls allow for the proper handling of cookies.

### Obtaining Keys
A user can obtain keys in one of two ways. The first, and more popular way, is through another system such as i2b2/tranSMART. The second way is by submitting a valid Java Web Token (JWT) to the IRCT security service requesting a token. This can be accomplished by calling doing the Security Services Create Key function. Both of these methods result in the user obtaining a randomly generated and unique 26 character alphanumeric string.

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

### Using Keys to Start a Secure Session
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

### Ending a Secure Session
When a user is finished with their session they can end it by submitting a request to the end session function. This will result in the users session being ended, all further secure requests will be blocked until the user starts a secure session again.

*GET /rest/v1/securityService/endSession*

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
