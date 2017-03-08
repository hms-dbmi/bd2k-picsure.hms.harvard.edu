[Home](./index.md) > Joins

# Joins
## What are Joins?
Joins are any type of process that is performed by the IRCT to combine two or more results. These are done using different algorithms that are loaded by the IRCT. The IRCT provides this service as a means of simplifying the joining of different result sets.

## How do I get a list of supported joins?
Calling the joins function in the join service returns an array of possible joins.

*GET /rest/v1/joinService/joins*


## How do I write a Join?

```JSON
{
  "joinType" : "<Join Name>",
  "fields" : {}
}
```

```JSON
{
  "name": "rightOuterJoin",
  "displayName": "Right Outer Join",
  "description": "Performs a right outer join on two result sets",
  "fields": [
    {
      "name": "Left Result Set",
      "path": "LeftResultSet",
      "description": "Result set on left side of join",
      "required": true,
      "dataTypes": [
        {
          "name": "resultSet",
          "pattern": "^-?\\d{1,19}$",
          "description": "A resultset identifier"
        }
      ],
      "permittedValues": []
    },
    {
      "name": "Left Result Set Column",
      "path": "LeftColumn",
      "description": "Column for result set on left side of join",
      "required": true,
      "dataTypes": [
        {
          "name": "column",
          "pattern": "^.*$",
          "description": "A column identifier"
        }
      ],
      "permittedValues": []
    },
    {
      "name": "Right Result Set",
      "path": "RightResultSet",
      "description": "Result set on right side of join",
      "required": true,
      "dataTypes": [
        {
          "name": "resultSet",
          "pattern": "^-?\\d{1,19}$",
          "description": "A resultset identifier"
        }
      ],
      "permittedValues": []
    },
    {
      "name": "Right Result Set Column",
      "path": "RightColumn",
      "description": "Column for result set on right side of join",
      "required": true,
      "dataTypes": [
        {
          "name": "column",
          "pattern": "^.*$",
          "description": "A column identifier"
        }
      ],
      "permittedValues": []
    }
  ]
}
```


To Use

```JSON
{
	"joinType" : "leftOuterJoin",
	"fields" : {
		"LeftResultSet" : "11502",
		"LeftColumn" : "CustomerID",
		"RightResultSet" : "11504",
		"RightColumn" : "CustomerID"
	}
}
```

## How do I run a Join?
Once the JSON for the join has been created it needs to be submitted to the IRCT so that it can first be evaluated and if possible run. This is accomplished in a similar manner as submitting other actions such as Queries, and Processes. The user creates a POST request against the runJoin function with the JSON as the payload. A user must be in a valid session at the time, and all formatting with valid fields must be submitted otherwise the request will return with an error. If the process is successfully submitted then the IRCT will return back a resultId. This id can be used to track the progress of the process and can be used to retrieve the results.

*POST /rest/v1/joinService/runJoin*

Response
```JSON
{
  "resultId" : "<Result Id>"
}
```

```JSON
{
  "resultId": 10153
}
```
