[Home](./index.md) > Results

# Results
## Getting a List of Available Results
Users can retrieve a list of results that are available to them. The command to the result service available function will return an array of result statuses that include the resultId and the status of that result. Users can use this information to retrieve previously run actions.

*POST /rest/v1/resultService/available*

Response
```JSON
[
  {
    "resultId" : "<Result Id>",
    "status" : "<Status>"
  }
]
```

Example Response
```JSON
[
  {
    "resultId": 1303,
    "status": "AVAILABLE"
  },
  {
    "resultId": 1319,
    "status": "AVAILABLE"
  },
  {
    "resultId": 1353,
    "status": "AVAILABLE"
  },
  {
    "resultId": 1406,
    "status": "AVAILABLE"
  },
  {
    "resultId": 1408,
    "status": "AVAILABLE"
  },
  {
    "resultId": 1452,
    "status": "AVAILABLE"
  },
  {
    "resultId": 1454,
    "status": "AVAILABLE"
  }
]
```

## Checking on the Status of a Result
A user can request the status of an action by calling the resultStatus function. This will return a JSON object that includes the resultId and the current status of the action. The status allows the user to know the state of the action which is in one of four states; CREATED, RUNNING, AVAILABLE, and ERROR. Users can only check on the status of actions that they created.

*POST /rest/v1/resultService/resultStatus/&lt;resultId&gt;*

Response
```JSON
{
  "resultId" : "<Result Id>",
  "status" : "<Status>"
}
```

Possible Statuses

Response | Definition
---------|-----------
CREATED | The action has been created but has not started
RUNNING | The action is currently running
AVAILABLE | The results of the action is available for retrieval
ERROR | There was an error running the query

Example Response
```JSON
{
  "resultId": 10151,
  "status": "AVAILABLE"
}
```

## Getting a List of Formats Available for a Result
The IRCT can return the results of an action in severl different formats. The type of formats that can be returned for a user can be obtained by the availableFormats function. This will return a list of formats that the result can be converted to. Users can only retrieve the results of the actions that they created.

*POST /rest/v1/resultService/availableFormats/&lt;resultId&gt;*

Response
```JSON
[ "<Formats>"]
```

Example Response
```JSON
[
  "JSON",
  "XML",
  "XLSX",
  "CSV"
]
```

## Retrieving Results In A Chosen Format
Results can be retrieved in several different formats as specified above. Results are typically streamed back to a user as soon as a request is made. A user can also choose to have the result returned as a file by including the downloaded url parameter with a value of 'YES'.

*POST /rest/v1/resultService/result/&lt;resultId&gt;/&lt;format&gt;?download=YES*


Example Response
```CSV
PATIENT_NUM,Age
206998,3
207060,7
207030,1
207041,5
207010,7
```
