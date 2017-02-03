# User Guide

## Introduction
#### Purpose of this Document
This document will provide users with an understanding of how to interact with the Inter-Resource Communication Tool (IRCT). This includes an understanding of what the IRCT is, how to understand how to interact with resources it is connected to.

This document is broken into nine sections. The first section provides an overview
of the IRCT and dives into how a resource driven API, and individual components work.
We then provide a quick start where users can quickly write their first query against
the NHANES i2b2/tranSMART instance. We follow this up with an introduction into
security and interacting with secure resources. Then we explain more about resources,
and how users can understand what services, queries, and processes they support.
We follow this up by sections on searching for terms, writing queries, running processes,
and finally retrieving results in different formats. We wrap it all up with a section
on bringing it all together, how the IRCT can work for you, and some closing thoughts.

Since the IRCT is versioned we keep references to previous versions of the API in this document. Please check with your IRCT administrator to obtain your IRCT version.

###### Style Guide

Stle | Meaning
-----|--------
_Italic_ | Calls to the RESTFull Service
**Bold** | Important notes
`Monospace` | Code, sent or returned data

## IRCT
#### What is the IRCT?
One of the stated goals of the NIH Big Data to Knowledge (BD2K) initiative is to harvest the wealth of information contained in Big Data to advance our knowledge of human health and disease. As part of this initiative the Harvard University Medical School (HMS) Department of Biomedical Informatics Patient-Centered Informatics Common: Standard Unification of Research Elements (PIC-SURE) is developing an open-source infrastructure that will foster the incorporation of multiple heterogeneous patient level clinical, omic, and environmental datasets. This system embraces the idea of decentralized repositories (resources) of varying types, and protocols. It provides a single simple secure communication interface that can perform queries, joins, and computations across different resources. To implement this we created the BD2K PIC-SURE RESTfull API. Short acronym is IRCT (Inter Resource Communication Tool) which provides a resource agnostic service through which multiple resources of varying types, and protocols can be accessed. Users communicate with this service using a series of Representative State Transfer (RESTful) calls.

#### What can the IRCT do?
The easiest way to understand what the IRCT is by explaining what it isn’t. First and foremost it is not an attempt at a universal API. It is not going to be the one API, or protocol that all biomedical application should implement. It does not require existing resource to change their protocol. It does not define an ontology, or prefer one type of ontology over another. And it does not restrict the where, or how data is stored.

The core idea behind IRCT is that no API, protocol, ontology, or application is going to be a perfect fit for all biomedical research. However being able to combine data across different resources will provide a powerful tool for researches. The IRCT accomplishes this by allows different resources to be defined – by initial configuration -  what they are, what they have, and what they can do. It can support existing resources without requiring them to make any changes, and allows new resources to be quickly integrated. This is accomplished by creating a ‘Resource-Driven API’.

#### What is a Resource Driven API?
All actions that can be performed by resources from the IRCT are abstracted into a set of definitions. These definitions provide basic information such as what predicates are supported, and can be executed on the resource. Since the IRCT doesn’t restrict what actions, and commands can be performed individual resources can define any number of predicate operators, data types, parameters, and. This model is flexible enough to support several different resource types, but still rigid enough to allow users to quickly create and execute different actions with the IRCT

#### IRCT Components Overview
![IRCT Overview](./IRCT Component Overview.png)

The IRCT consists of four components; Communication Layer (IRCT-CL), API (IRCT-API), Extensions (IRCT-EXT), and Resource Interfaces (IRCT-RI). Each component performs a specific task so that a query, or any other action can be successfully accomplished.

The IRCT Communication Layer (IRCT-CL) provides a secure resource agnostic REpresentative State Transfer (RESTful) service. Users build queries by making a series of calls to the RESTful service that can span multiple datasets and resources. These queries, and other actions are passed onto the IRCT-API. The IRCT Application Programming Interface (IRCT-API) is the core of the IRCT project. It manages the queries for data, and processing across the different resources. Beyond just this it ensures that all the actions that are attempted by the end user are valid, manages the available resources, and provides some basic security. The IRCT Extension (IRCT-EXT) provides a way of adding additional functionality to an IRCT instance. Administrators can add any number of additional features without having to make code changes, or recompiling the IRCT. The IRCT Resource Interface (IRCT-RI) provides a way of connecting the IRCT application to different resources for querying, and running processes. Some examples of resources are i2b2, i2b2/tranSMART, SciDB, and the ExAC browser.

## Quick Start
#### Your First Query
For this query we are going to query the NHANES i2b2/tranSMART resource to obtain the mean systolic, and mean diastolic pressure for all males who are over the age of 65. We want to have this data returned to us in CSV format so that we may analyze it later with another piece of software.

###### Obtaining your access key


###### Starting a session
*GET https://<span></span>nhanes.hms.harvard.edu/rest/v1/securityService/startSession?key=&lt;key&gt;*

Response
```JSON
{
  "status": "success"
}
```

###### Seeing the available resources
*GET https://<span></span>nhanes.hms.harvard.edu/rest/v1/resourceService/resources*
Response
```JSON
[
  {
    "id": 1,
    "name": "nhanes",
    "ontologyType": "TREE",
    "implementation": "i2b2/tranSMART",
    "relationships": [
      "PARENT",
      "CHILD",
      "SIBLING",
      "MODIFIER",
      "TERM"
    ],
    "logicaloperators": [
      "AND",
      "OR",
      "NOT"
    ],
    "predicates": [
      {
        "predicateName": "CONTAINS",
        "displayName": "Contains",
        "description": "Contains value",
        "default": true,
        "fields": [
          {
            "name": "By Encounter",
            "path": "ENOUNTER",
            "description": "By Encounter",
            "required": true,
            "dataTypes": [],
            "permittedValues": [
              "YES",
              "NO"
            ]
          }
        ],
        "dataTypes": [
          "STRING",
          "INTEGER",
          "FLOAT"
        ],
        "paths": []
      },
      {
        "predicateName": "CONSTRAIN_MODIFIER",
        "displayName": "Constrain by Modifier",
        "description": "Constrain by Modifier",
        "default": false,
        "fields": [
          {
            "name": "Modifier",
            "path": "MODIFIER_KEY",
            "description": "Constrain by a modifier of this entity",
            "required": true,
            "dataTypes": [],
            "permittedValues": [],
            "relationship": "MODIFIER"
          },
          {
            "name": "By Encounter",
            "path": "ENOUNTER",
            "description": "By Encounter",
            "required": true,
            "dataTypes": [],
            "permittedValues": [
              "YES",
              "NO"
            ]
          }
        ],
        "dataTypes": [
          "STRING",
          "INTEGER",
          "FLOAT"
        ],
        "paths": []
      },
      {
        "predicateName": "CONSTRAIN_VALUE",
        "displayName": "Constrain by Value",
        "description": "Constrains by Value",
        "default": false,
        "fields": [
          {
            "name": "Operator",
            "path": "OPERATOR",
            "description": "Operator",
            "required": true,
            "dataTypes": [],
            "permittedValues": [
              "EQ",
              "NE",
              "GT",
              "GE",
              "LT",
              "LE",
              "BETWEEN",
              "LIKE[exact]",
              "LIKE[begin]",
              "LIKE[end]",
              "LIKE[contains]"
            ]
          },
          {
            "name": "Constraint",
            "path": "CONSTRAINT",
            "description": "Constraint",
            "required": true,
            "dataTypes": [
              {
                "name": "string",
                "pattern": "^.*$",
                "description": "A string value"
              },
              {
                "name": "integer",
                "pattern": "^\\d+$",
                "description": "An integer value"
              },
              {
                "name": "float",
                "pattern": "^([+-]?\\d*\\.?\\d*)$",
                "description": "A float value"
              }
            ],
            "permittedValues": []
          },
          {
            "name": "Unit of Measure",
            "path": "UNIT_OF_MEASURE",
            "description": "Unit of Measure",
            "required": false,
            "dataTypes": [
              {
                "name": "string",
                "pattern": "^.*$",
                "description": "A string value"
              }
            ],
            "permittedValues": []
          },
          {
            "name": "By Encounter",
            "path": "ENOUNTER",
            "description": "By Encounter",
            "required": true,
            "dataTypes": [],
            "permittedValues": [
              "YES",
              "NO"
            ]
          }
        ],
        "dataTypes": [
          "STRING",
          "INTEGER",
          "FLOAT"
        ],
        "paths": []
      },
      {
        "predicateName": "CONSTRAIN_DATE",
        "displayName": "Constrain by Date",
        "description": "Constrains by Date",
        "default": false,
        "fields": [
          {
            "name": "From Inclusive",
            "path": "FROM_INCLUSIVE",
            "description": "Inclusive From Date",
            "required": true,
            "dataTypes": [],
            "permittedValues": [
              "YES",
              "NO"
            ]
          },
          {
            "name": "From Time",
            "path": "FROM_TIME",
            "description": "From Date Start or End",
            "required": true,
            "dataTypes": [],
            "permittedValues": [
              "START_DATE",
              "END_DATE"
            ]
          },
          {
            "name": "From Date",
            "path": "FROM_DATE",
            "description": "From Date",
            "required": true,
            "dataTypes": [
              {
                "name": "date",
                "pattern": "^\\d{4}\\-(0?[1-9]|1[012])\\-(0?[1-9]|[12][0-9]|3[01])$",
                "description": "Date in yyyy-mm-dd format",
                "typeof": "dateTime"
              }
            ],
            "permittedValues": []
          },
          {
            "name": "To Inclusive",
            "path": "TO_INCLUSIVE",
            "description": "Inclusive To Date",
            "required": true,
            "dataTypes": [],
            "permittedValues": [
              "YES",
              "NO"
            ]
          },
          {
            "name": "To Time",
            "path": "TO_TIME",
            "description": "To Date Start or End",
            "required": true,
            "dataTypes": [],
            "permittedValues": [
              "START_DATE",
              "END_DATE"
            ]
          },
          {
            "name": "To Date",
            "path": "TO_DATE",
            "description": "To Date",
            "required": true,
            "dataTypes": [
              {
                "name": "date",
                "pattern": "^\\d{4}\\-(0?[1-9]|1[012])\\-(0?[1-9]|[12][0-9]|3[01])$",
                "description": "Date in yyyy-mm-dd format",
                "typeof": "dateTime"
              }
            ],
            "permittedValues": []
          },
          {
            "name": "By Encounter",
            "path": "ENOUNTER",
            "description": "By Encounter",
            "required": true,
            "dataTypes": [],
            "permittedValues": [
              "YES",
              "NO"
            ]
          }
        ],
        "dataTypes": [],
        "paths": []
      }
    ],
    "selectOperations": [],
    "joins": [],
    "sorts": [],
    "processes": [],
    "visualization": [],
    "dataTypes": [
      {
        "name": "dateTime",
        "pattern": "^(\\d{4})-(\\d{2})-(\\d{2}) (\\d{2}):(\\d{2}):(\\d{2})$",
        "description": "Date in yyyy-mm-dd hh:mm:ss format. With hours in 24 hour format"
      },
      {
        "name": "date",
        "pattern": "^\\d{4}\\-(0?[1-9]|1[012])\\-(0?[1-9]|[12][0-9]|3[01])$",
        "description": "Date in yyyy-mm-dd format",
        "typeof": "dateTime"
      },
      {
        "name": "integer",
        "pattern": "^\\d+$",
        "description": "An integer value"
      },
      {
        "name": "string",
        "pattern": "^.*$",
        "description": "A string value"
      },
      {
        "name": "float",
        "pattern": "^([+-]?\\d*\\.?\\d*)$",
        "description": "A float value"
      }
    ]
  }
]
```

###### Running a query
*POST https://<span></span>nhanes.hms.harvard.edu/rest/v1/queryService/runQuery*

BODY
```JSON
{
	"select": [
	  {
		    "field": {
			    "pui": "/nhanes/Demo/examination/examination/blood pressure/mean systolic/",
			    "dataType": "STRING"
		    },
    		"alias": "Systolic Pressure"
	  }
	],
	"where": [
	  {
		    "field": {
			    "pui": "/nhanes/Demo/demographics/demographics/SEX/male",
    			"dataType": "STRING"
	    	},
		    "predicate": "CONTAINS",
		    "fields": {
			    "ENOUNTER": "YES"
		    }
	  }
	]
}
```

Response
```JSON
{
  "resultId": 169801
}
```

###### Checking on the status of a query

*GET https://<span></span>nhanes.hms.harvard.edu/rest/v1/resultService/resultStatus/&lt;resultId&gt;*

Response
```JSON
{
  "resultId": 169801,
  "status": "AVAILABLE"
}
```


##### Getting the CSV results of a query
*GET https://<span></span>nhanes.hms.harvard.edu/rest/v1/resultService/result/&lt;resultId&gt;/CSV*

Response
```CSV
PATIENT_NUM,Systolic Pressure
10997,136
10998,132.66667
22528,111.33333
23658,115.33333
22526,106.66667
34229,99.33333
22525,112.66667
34227,117.33333
10990,124
25795,118
34225,112.66667
25796,102
34226,120.66667
10993,125.33333
23651,109.33333
34224,113.33333
10996,143.33333
23653,138.66667
34222,102
25794,114
22518,109.33333
22515,114
34219,176
22517,128.66667
```

###### Ending a session
_GET https://<span></span>nhanes.hms.harvard.edu/rest/v1/securityService/endSession_

Response
```JSON
{
  "status": "success"
}
```

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

## Resources
#### What are Resources?
Resources are loosely defined as being any outside application, or service that the IRCT communicates with. This includes resources that provide data such as i2b2/tranSMART, or services such as ExAC.

! Because the IRCT has the ability to communicate with a variety of different types of resources, and what type of implementation they support the IRCT needs to describe what they do to the end user.

! As described above this creates a Resource Driven API.

! We look more into the different parts of how to understand what a resource supports, and what you can do with it.

#### Getting a List of Resources

*GET /rest/v1/resourceService/resources*

Example Response
```JSON
[
  {
    "id": 1,
    "name": "nhanes",
    "ontologyType": "TREE",
    "implementation": "i2b2/tranSMART",
    "relationships": [
      "PARENT",
      "CHILD",
      "SIBLING",
      "MODIFIER",
      "TERM"
    ],
    "logicaloperators": [
      "AND",
      "OR",
      "NOT"
    ],
    "predicates": [
      {
        "predicateName": "CONTAINS",
        "displayName": "Contains",
        "description": "Contains value",
        "default": true,
        "fields": [
          {
            "name": "By Encounter",
            "path": "ENOUNTER",
            "description": "By Encounter",
            "required": true,
            "dataTypes": [],
            "permittedValues": [
              "YES",
              "NO"
            ]
          }
        ],
        "dataTypes": [
          "STRING",
          "INTEGER",
          "FLOAT"
        ],
        "paths": []
      },
      {
        "predicateName": "CONSTRAIN_MODIFIER",
        "displayName": "Constrain by Modifier",
        "description": "Constrain by Modifier",
        "default": false,
        "fields": [
          {
            "name": "Modifier",
            "path": "MODIFIER_KEY",
            "description": "Constrain by a modifier of this entity",
            "required": true,
            "dataTypes": [],
            "permittedValues": [],
            "relationship": "MODIFIER"
          },
          {
            "name": "By Encounter",
            "path": "ENOUNTER",
            "description": "By Encounter",
            "required": true,
            "dataTypes": [],
            "permittedValues": [
              "YES",
              "NO"
            ]
          }
        ],
        "dataTypes": [
          "STRING",
          "INTEGER",
          "FLOAT"
        ],
        "paths": []
      },
      {
        "predicateName": "CONSTRAIN_VALUE",
        "displayName": "Constrain by Value",
        "description": "Constrains by Value",
        "default": false,
        "fields": [
          {
            "name": "Operator",
            "path": "OPERATOR",
            "description": "Operator",
            "required": true,
            "dataTypes": [],
            "permittedValues": [
              "EQ",
              "NE",
              "GT",
              "GE",
              "LT",
              "LE",
              "BETWEEN",
              "LIKE[exact]",
              "LIKE[begin]",
              "LIKE[end]",
              "LIKE[contains]"
            ]
          },
          {
            "name": "Constraint",
            "path": "CONSTRAINT",
            "description": "Constraint",
            "required": true,
            "dataTypes": [
              {
                "name": "string",
                "pattern": "^.*$",
                "description": "A string value"
              },
              {
                "name": "integer",
                "pattern": "^\\d+$",
                "description": "An integer value"
              },
              {
                "name": "float",
                "pattern": "^([+-]?\\d*\\.?\\d*)$",
                "description": "A float value"
              }
            ],
            "permittedValues": []
          },
          {
            "name": "Unit of Measure",
            "path": "UNIT_OF_MEASURE",
            "description": "Unit of Measure",
            "required": false,
            "dataTypes": [
              {
                "name": "string",
                "pattern": "^.*$",
                "description": "A string value"
              }
            ],
            "permittedValues": []
          },
          {
            "name": "By Encounter",
            "path": "ENOUNTER",
            "description": "By Encounter",
            "required": true,
            "dataTypes": [],
            "permittedValues": [
              "YES",
              "NO"
            ]
          }
        ],
        "dataTypes": [
          "STRING",
          "INTEGER",
          "FLOAT"
        ],
        "paths": []
      },
      {
        "predicateName": "CONSTRAIN_DATE",
        "displayName": "Constrain by Date",
        "description": "Constrains by Date",
        "default": false,
        "fields": [
          {
            "name": "From Inclusive",
            "path": "FROM_INCLUSIVE",
            "description": "Inclusive From Date",
            "required": true,
            "dataTypes": [],
            "permittedValues": [
              "YES",
              "NO"
            ]
          },
          {
            "name": "From Time",
            "path": "FROM_TIME",
            "description": "From Date Start or End",
            "required": true,
            "dataTypes": [],
            "permittedValues": [
              "START_DATE",
              "END_DATE"
            ]
          },
          {
            "name": "From Date",
            "path": "FROM_DATE",
            "description": "From Date",
            "required": true,
            "dataTypes": [
              {
                "name": "date",
                "pattern": "^\\d{4}\\-(0?[1-9]|1[012])\\-(0?[1-9]|[12][0-9]|3[01])$",
                "description": "Date in yyyy-mm-dd format",
                "typeof": "dateTime"
              }
            ],
            "permittedValues": []
          },
          {
            "name": "To Inclusive",
            "path": "TO_INCLUSIVE",
            "description": "Inclusive To Date",
            "required": true,
            "dataTypes": [],
            "permittedValues": [
              "YES",
              "NO"
            ]
          },
          {
            "name": "To Time",
            "path": "TO_TIME",
            "description": "To Date Start or End",
            "required": true,
            "dataTypes": [],
            "permittedValues": [
              "START_DATE",
              "END_DATE"
            ]
          },
          {
            "name": "To Date",
            "path": "TO_DATE",
            "description": "To Date",
            "required": true,
            "dataTypes": [
              {
                "name": "date",
                "pattern": "^\\d{4}\\-(0?[1-9]|1[012])\\-(0?[1-9]|[12][0-9]|3[01])$",
                "description": "Date in yyyy-mm-dd format",
                "typeof": "dateTime"
              }
            ],
            "permittedValues": []
          },
          {
            "name": "By Encounter",
            "path": "ENOUNTER",
            "description": "By Encounter",
            "required": true,
            "dataTypes": [],
            "permittedValues": [
              "YES",
              "NO"
            ]
          }
        ],
        "dataTypes": [],
        "paths": []
      }
    ],
    "selectOperations": [],
    "joins": [],
    "sorts": [],
    "processes": [],
    "visualization": [],
    "dataTypes": [
      {
        "name": "dateTime",
        "pattern": "^(\\d{4})-(\\d{2})-(\\d{2}) (\\d{2}):(\\d{2}):(\\d{2})$",
        "description": "Date in yyyy-mm-dd hh:mm:ss format. With hours in 24 hour format"
      },
      {
        "name": "date",
        "pattern": "^\\d{4}\\-(0?[1-9]|1[012])\\-(0?[1-9]|[12][0-9]|3[01])$",
        "description": "Date in yyyy-mm-dd format",
        "typeof": "dateTime"
      },
      {
        "name": "integer",
        "pattern": "^\\d+$",
        "description": "An integer value"
      },
      {
        "name": "string",
        "pattern": "^.*$",
        "description": "A string value"
      },
      {
        "name": "float",
        "pattern": "^([+-]?\\d*\\.?\\d*)$",
        "description": "A float value"
      }
    ]
  }
]
```

#### Understanding Resource Components
In this section we will look at the different parts of the JSON description of a resource. This is not an exhaustive list of all the different combinations that are possible but it will provide a general overview of the different features that a resource can expose.

```JSON
{
  "id": 1,
  "name": "nhanes",
  "ontologyType": "TREE",
  "implementation": "i2b2/tranSMART",
  "relationships": [
    "PARENT",
    "CHILD",
    "SIBLING",
    "MODIFIER",
    "TERM"
  ]
}
```
 Key | Meaning
-----|--------
id   | The id of the resource
name | The name of the resource
ontologyType | The type of relationships between entities
implementation | The type of resource that it is
relationships | This is a list of all the different types of relationships that can exist in this resource

**Not all resources will have relationships**

```JSON
{
  "logicaloperators": [
    "AND",
    "OR",
    "NOT"
  ]
}
```

Key | Meaning
-----|--------
logicaloperators | Are the series of logical operators that can be used to join predicates.

**Not all resources will support logical operations**


```JSON
{
"predicates": [
]
}
```
This predicates attribute contains an array of all the available operations that can be done during a query. Since the IRCT can support many different types of operations we will have multiple examples.

```JSON
{
  "predicateName": "CONTAINS",
  "displayName": "Contains",
  "description": "Contains value",
  "default": true,
  "fields": [
    {
      "name": "By Encounter",
      "path": "ENOUNTER",
      "description": "By Encounter",
      "required": true,
      "dataTypes": [],
      "permittedValues": [
        "YES",
        "NO"
      ]
    }
  ],
  "dataTypes": [
    "STRING",
    "INTEGER",
    "FLOAT"
  ],
  "paths": []
}
```
Key | Meaning
-----|--------
predicateName | The name of the predicate that is used to create a query
displayName | The name of the predicate to be displayed
description | A description of the predicate
default | The default predicate to be run
fields | An array of fields that either have to or can be passed as part of the predicate for the query. Fields are described below.
dataTypes | The data types that this predicate can be run on
paths | The paths that this predicate can be run on


Fields

Key | Meaning
-----|--------
name | The name of the field as it is to be displayed
path | The reference path of the fields as it is to be used in a query
description | A description of the field
required | Is this field required or not
dataTypes | Types of data that can be passed as a value of this field
permittedValues | A list of possible values that can be set for this field



```JSON
{
    "name": "Modifier",
    "path": "MODIFIER_KEY",
    "description": "Constrain by a modifier of this entity",
    "required": true,
    "dataTypes": [],
    "permittedValues": [],
    "relationship": "MODIFIER"
}
```

Key | Meaning
-----|--------
relationship | This is the relationship that must be associated with a path in a query


```JSON
{
"selectOperations": [
  {
    "operationName": "AGGREGATE",
    "displayName": "Aggregate",
    "description": "A set of aggregate functions that can be run",
    "fields": [
      {
        "name": "Function",
        "path": "FUNCTION",
        "description": "Aggregate Function",
        "required": true,
        "dataTypes": [],
        "permittedValues": [
          "count",
          "approxdc",
          "avg",
          "var",
          "stdev",
          "mad",
          "min",
          "max",
          "median",
          "first_value",
          "last_value",
          "sum",
          "prod"
        ]
      },
      {
        "name": "Dimension",
        "path": "DIMENSION",
        "description": "Aggregate Dimension",
        "required": false,
        "dataTypes": [
          {
            "name": "array",
            "pattern": ".*",
            "description": "An array"
          },
          {
            "name": "array",
            "pattern": ".*",
            "description": "An array"
          }
        ],
        "permittedValues": []
      }
    ],
    "dataTypes": [
      "ATTRIBUTE",
      "DIMENSION"
    ],
    "paths": []
  }
]
}
```

```JSON
{
"joins": [
  {
    "name": "CROSSJOIN",
    "displayName": "Cross Join",
    "description": "Performs a cross-product join with equality predicates.",
    "fields": [
      {
        "name": "Right",
        "path": "RIGHT",
        "description": "Right Query",
        "required": true,
        "dataTypes": [
          {
            "name": "subQuery",
            "pattern": ".*",
            "description": "A IRCT subquery"
          }
        ],
        "permittedValues": []
      },
      {
        "name": "Dimensions",
        "path": "DIMENSIONS",
        "description": "DIMENSIONS",
        "required": true,
        "dataTypes": [
          {
            "name": "dimension",
            "pattern": "^.*$",
            "description": "DIMENSION",
            "typeof": "string"
          },
          {
            "name": "array",
            "pattern": ".*",
            "description": "An array"
          },
          {
            "name": "dimension",
            "pattern": "^.*$",
            "description": "DIMENSION",
            "typeof": "string"
          }
        ],
        "permittedValues": []
      },
      {
        "name": "Left Alias",
        "path": "LEFT_ALIAS",
        "description": "Left Alias",
        "required": false,
        "dataTypes": [
          {
            "name": "dimension",
            "pattern": "^.*$",
            "description": "DIMENSION",
            "typeof": "string"
          }
        ],
        "permittedValues": []
      },
      {
        "name": "Right Alias",
        "path": "RIGHT_ALIAS",
        "description": "Right Alias",
        "required": false,
        "dataTypes": [],
        "permittedValues": []
      }
    ]
  }
]
}
```

```JSON
{
"sorts": [
  {
    "operationName": "SORT",
    "displayName": "Sort",
    "description": "Sort",
    "fields": [
      {
        "name": "Direction",
        "path": "DIRECTION",
        "description": "Direction",
        "required": false,
        "dataTypes": [],
        "permittedValues": [
          "DESC",
          "ASC"
        ]
      }
    ],
    "dataTypes": [],
    "paths": []
  }
]
}
```


```JSON
{
    "id": 2,
    "name": "ExAC",
    "ontologyType": "TREE",
    "implementation": "exac",
    "relationships": [
      "PARENT",
      "CHILD"
    ],
    "processes": [
      {
        "name": "RARITY",
        "displayName": "Calculate Rarity",
        "description": "Calculate the rarity of a variant against the ExAC database",
        "fields": [
          {
            "name": "Result",
            "path": "RESULTSET",
            "description": "Result Set",
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
            "name": "Chromosome",
            "path": "CHROMOSOME",
            "description": "Chromosome Column",
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
            "name": "Position",
            "path": "POSITION",
            "description": "Position Column",
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
            "name": "Reference",
            "path": "REFERENCE",
            "description": "Reference Column",
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
            "name": "Variant",
            "path": "VARIANT",
            "description": "Variant Column",
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
        ],
        "returns": []
      }
    ]
}
```



```JSON
{
  "processes": [
  ]
}
```
The processes attribute contains an array of all the possible operations that a resource can do.

```JSON
{
  "name": "RARITY",
  "displayName": "Calculate Rarity",
  "description": "Calculate the rarity of a variant against the ExAC database",
  "fields": [
    {
      "name": "Result",
      "path": "RESULTSET",
      "description": "Result Set",
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
      "name": "Chromosome",
      "path": "CHROMOSOME",
      "description": "Chromosome Column",
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
      "name": "Position",
      "path": "POSITION",
      "description": "Position Column",
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
      "name": "Reference",
      "path": "REFERENCE",
      "description": "Reference Column",
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
      "name": "Variant",
      "path": "VARIANT",
      "description": "Variant Column",
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
  ],
  "returns": []
}
```
Key | Meaning
-----|--------
name | The name of the process is used to execute the query
displayName | The name of the process to be displayed
description | A description of the process
fields | An array of fields that either have to or can be passed as part of the process. Fields are described above.
returns | This is an optional field that describes what will be returned.

#### Navigating Resources
Resources that provide query functionality will typically have a collection of entities that can be queried upon. These entities can have different relationships with each other but are typically arranged in a tree structure (i.e. Parent/Child). All entities are assigned a unique identifier called the Path Unique Identifier (PUI). All paths to entities are delimited by a '/' character. The first part is always the resource name, while all proceeding parts is the IRCTs interpretation of the resources internal paths to a given entity.

Example PUI
/nhanes/Demo/demographics/demographics/SEX/male

The above path references the male sex demographics entity in the NHANES resource.


*GET /rest/v1/resourceService/path/&lt;resource&gt;/&lt;path&gt;?relationship=&gt;relationship&lt;*

Parameter | Required | Definition
----------|----------|-----------
resource | true | The name of the resource
path | false | The Path Unique Identifier to get relationships from
relationship | false | Default is child

This request will return an array a list of entities.

Example Request

https://nhanes.hms.harvard.edu/rest/v1/resourceService/path/nhanes/Demo/demographics/demographics/RACE/

Partial Response
```JSON
[
  {
    "pui": "/nhanes/Demo/demographics/demographics/RACE/black/",
    "name": "black",
    "displayName": "black",
    "description": "",
    "ontology": "",
    "ontologyId": "",
    "dataType": {
      "name": "string",
      "pattern": "^.*$",
      "description": "A string value"
    },
    "relationships": [],
    "counts": {
      "count": 10282
    },
    "attributes": {
      "valuetypeCd": null,
      "level": "2",
      "sourcesystemCd": null,
      "columnname": "CONCEPT_PATH",
      "tablename": "CONCEPT_DIMENSION",
      "facttablecolumn": "CONCEPT_CD",
      "name": "black",
      "columndatatype": "T",
      "visualattributes": "LA ",
      "comment": null,
      "dimcode": "\\demographics\\RACE\\black\\",
      "synonymCd": "N",
      "operator": "LIKE",
      "key": "\\\\demographics\\demographics\\RACE\\black\\",
      "tooltip": "\\demographics\\RACE\\black\\"
    }
  },
  {
    "pui": "/nhanes/Demo/demographics/demographics/RACE/mexican/",
    "name": "mexican",
    "displayName": "mexican",
    "description": "",
    "ontology": "",
    "ontologyId": "",
    "dataType": {
      "name": "string",
      "pattern": "^.*$",
      "description": "A string value"
    },
    "relationships": [],
    "counts": {
      "count": 11535
    },
    "attributes": {
      "valuetypeCd": null,
      "level": "2",
      "sourcesystemCd": null,
      "columnname": "CONCEPT_PATH",
      "tablename": "CONCEPT_DIMENSION",
      "facttablecolumn": "CONCEPT_CD",
      "name": "mexican",
      "columndatatype": "T",
      "visualattributes": "LA ",
      "comment": null,
      "dimcode": "\\demographics\\RACE\\mexican\\",
      "synonymCd": "N",
      "operator": "LIKE",
      "key": "\\\\demographics\\demographics\\RACE\\mexican\\",
      "tooltip": "\\demographics\\RACE\\mexican\\"
    }
  }
]
```

Entities

Key | Meaning
-----|--------
pui | The path unique identifier
name | The name of the entity
displayName | The name to be displayed to the end user
description | A description about the entity
ontology | The ontology of the entity
ontologyId | The id in the ontology that the field corresponds to
dataType | The IRCT data type this entity should be treated as
relationships | An relationships that this entity may have
counts | An object containing all vales of counts
attributes | These are resource unique attributes about the entity

## Term Search
In order to help users to find terms that

#### Searching for a Term Across Resources
*GET /rest/v1/resourceService/find?term=&lt;TERM&gt;*

Returns a list of entities that match the search term. This search will occur across all the resources that the IRCT instance has a connection to.

**Not all resources support searching for terms and will return empty arrays**

Example Response
```JSON
[
  {
    "pui": "/TM-DEV/Public Studies/465 Clinical Notes (cTAKES NLP)/01 SNOMED/Clinical finding/Disease/Disorder by body site/Disorder of body system/Disorder of respiratory system/Asthma/",
    "name": "",
    "displayName": "",
    "description": "",
    "ontology": "",
    "ontologyId": "",
    "relationships": [],
    "counts": {},
    "attributes": {}
  },
  {
    "pui": "/TM-DEV/Public Studies/465 Clinical Notes (cTAKES NLP)/01 SNOMED/Clinical finding/Disease/Disorder by body site/Disorder of body system/Disorder of respiratory system/Asthma/Intermittent asthma/",
    "name": "",
    "displayName": "",
    "description": "",
    "ontology": "",
    "ontologyId": "",
    "relationships": [],
    "counts": {},
    "attributes": {}
  },
  {
    "pui": "/TM-DEV/Public Studies/465 Clinical Notes (cTAKES NLP)/01 SNOMED/Clinical finding/Disease/Disorder by body site/Disorder of body system/Disorder of respiratory system/Asthma/Intermittent asthma/Mild intermittent asthma/",
    "name": "",
    "displayName": "",
    "description": "",
    "ontology": "",
    "ontologyId": "",
    "relationships": [],
    "counts": {},
    "attributes": {}
  }
]
```

#### Searching for a Term on a Resource
To search across a single resource add the resource name to the URI. To search within a specific path inside a resource add the path information to the URI.

*GET /rest/v1/resourceService/find/&lt;RESOURCE&gt;?term=&lt;TERM&gt;*

**Not all resources support searching for a term, and those that don't will return an empty array**

#### Searching for an Ontology Term
To search for an ontological term instead of passing a term path parameter, pass an ontolgyTerm, and ontologyType parameter. The ontologyTerm will be the term as specified by the ontology, and the ontologyType will be the ontology. Additionally you may also restrict your term to one resource by adding the resource parameter as shown above.

*GET /rest/v1/resourceService/find?ontologyTerm=&lt;TERM&gt;&ontologyType=lt;TYPE&gt;*

**Not all resources support search for ontological terms, and those that don't will return an empty array**

#### Using Search Extensions
Some IRCT instances may support additional search extensions such as searching for synonyms. These additional parameters can be configured by adding additional path parameters to the URI.

*GET /rest/v1/resourceService/find?term=&lt;TERM&gt;&&lt;PARAMETER&gt;=&lt;VALUE&gt;*

**You can search using an extension across a single resource by adding the Resource Name**


## Queries
#### What are Queries?
All queries against any system can all be broken down into one simple idea; I want this data, from these places, given these conditions. In SQL parlance this is the same as select Data from Tables where these Predicates are true. As the IRCT supports multiple different types of resources we designed a way to handle the variety of different types of queries a resource can provide. A query can be thought of as a simple way to retrieve data out of a resource.

#### How do I Write a Query?
Queries in the IRCT share a similar to structure as SQL queries. They can contain a combination of selects, wheres, and joins clauses as well as subqueries. These are put together into a JSON object as shown below.

```JSON
{
  "select" : [],
  "where" : [],
  "join" : [],
  "sort" : [],
  "subquery" : []
}
```

#### Where Clauses

The first step in writing a query is to choose the type of predicate you want to use in your query. The list of available predicates are described by the resource and can be obtained by the /resourceService/resources command as described above. The predicate object describes all the information you need to construct the where clause of your query. The basic structure of a where clause consists of the field that it is being run against, an alias of that field, what predicate is to be used, and what, if any, additional fields are needed. This can be seen below.

```JSON
{
  "field" : {},
  "alias" : "Alias",
  "predicate" : "Predicate Name",
  "fields" : {}
}
```

The field object contains two parts. The first is the PUI which contains the path to the field that is being queried upon. The second is the datatype of that field.

```JSON
{
  "pui" : "path",
  "dataType" : "Data Type"
}
```

The fields object contains all additional predicate information that may or may not be required for the predicate that has been used. These additional fields are set as key value pairs in the fields object.

```JSON
{
  "KEY" : "VALUE"
}
```

Example Where Clause
```JSON
{
  "predicateName": "CONTAINS",
  "displayName": "Contains",
  "description": "Contains value",
  "default": true,
  "fields": [],
  "dataTypes": [
    "STRING",
    "INTEGER",
    "FLOAT"
  ],
  "paths": []
}
```

To use the above predicate to find all patients in the NHANES resource that contains the demographics/SEX/male attribute we would construct the following where clause.

```JSON
{
  "field": {
    "pui": "/nhanes/Demo/demographics/demographics/SEX/male",
    "dataType": "STRING"
  },
  "predicate": "CONTAINS"
}
```

Example Where Clause
```JSON
{
  "predicateName": "CONSTRAIN_VALUE",
  "displayName": "Constrain by Value",
  "description": "Constrains by Value",
  "default": false,
  "fields": [
    {
      "name": "Operator",
      "path": "OPERATOR",
      "description": "Operator",
      "required": true,
      "dataTypes": [],
      "permittedValues": [
        "EQ",
        "NE",
        "GT",
        "GE",
        "LT",
        "LE",
        "BETWEEN",
        "LIKE[exact]",
        "LIKE[begin]",
        "LIKE[end]",
        "LIKE[contains]"
      ]
    },
    {
      "name": "Constraint",
      "path": "CONSTRAINT",
      "description": "Constraint",
      "required": true,
      "dataTypes": [
        {
          "name": "string",
          "pattern": "^.*$",
          "description": "A string value"
        },
        {
          "name": "integer",
          "pattern": "^\\d+$",
          "description": "An integer value"
        },
        {
          "name": "float",
          "pattern": "^([+-]?\\d*\\.?\\d*)$",
          "description": "A float value"
        }
      ],
      "permittedValues": []
    },
    {
      "name": "Unit of Measure",
      "path": "UNIT_OF_MEASURE",
      "description": "Unit of Measure",
      "required": false,
      "dataTypes": [
        {
          "name": "string",
          "pattern": "^.*$",
          "description": "A string value"
        }
      ],
      "permittedValues": []
    },
    {
      "name": "By Encounter",
      "path": "ENOUNTER",
      "description": "By Encounter",
      "required": true,
      "dataTypes": [],
      "permittedValues": [
        "YES",
        "NO"
      ]
    }
  ],
  "dataTypes": [
    "STRING",
    "INTEGER",
    "FLOAT"
  ],
  "paths": []
}
```

To use the above predicate to find all the patients in the NHANES resource that are older than or equal to 65 years old we would create the following object.

```JSON
{
  "field": {
    "pui": "/nhanes/Demo/demographics/demographics/AGE",
    "dataType": "STRING"
  },
  "predicate": "CONSTRAIN_VALUE",
  "fields" : {
    "OPERATOR" : "GE",
    "CONSTRAINT" : 65
  }
}
```


#### Select Clauses

Select clauses allow the user to select which fields that they want to have returned from a resource. Some resources allow for additional operations on resources such as aggregate counts, min or max values, and other functions. These operations are described in the selectOperations field returned as part of the descriptor of the resource. The basic structure of a select object contains information about the field that is to be returned, an alias if requested, and an operation and any supporting fields that may be requested.

```JSON
{
  "field" : {},
  "alias" : "Alias",
  "operation" : "Select Operation",
  "fields" : {}
}

To create a simple select clause to return the patients mean systolic pressure from a query using the NHANES resource it would like the following.

```JSON
{
  "field": {
    "pui": "/nhanes/Demo/examination/examination/blood pressure/mean systolic/"
  },
  "alias": "Systolic Pressure"
}
```

Select operations as describe above look like this

```JSON
{
  "operationName": "AGGREGATE",
  "displayName": "Aggregate",
  "description": "A set of aggregate functions that can be run",
  "fields": [
    {
      "name": "Function",
      "path": "FUNCTION",
      "description": "Aggregate Function",
      "required": true,
      "dataTypes": [],
      "permittedValues": [
        "count",
        "approxdc",
        "avg",
        "var",
        "stdev",
        "mad",
        "min",
        "max",
        "median",
        "first_value",
        "last_value",
        "sum",
        "prod"
      ]
    },
    {
      "name": "Dimension",
      "path": "DIMENSION",
      "description": "Aggregate Dimension",
      "required": false,
      "dataTypes": [
        {
          "name": "array",
          "pattern": ".*",
          "description": "An array"
        },
        {
          "name": "array",
          "pattern": ".*",
          "description": "An array"
        }
      ],
      "permittedValues": []
    }
  ],
  "dataTypes": [
    "ATTRIBUTE",
    "DIMENSION"
  ],
  "paths": []
}
```

This operation allows us to do an aggregate count over the number of entries returned for this query we create the following select clause object.

```JSON
{
  "field": {
    "pui": "/SciDB/MetaData"
  },
  "alias": "NUMBER_OF_FAMILY_MEMBERS",
  "operation": "AGGREGATE",
  "fields" : {
    "FUNCTION" : "count"
  }
}
```

**Not all resources support select clauses.**

#### Join Clauses
Join clauses allow a user to direct a resource to combine multiple datasets into one. A resource may support any number of different types of joins with each having different functionality. Not all resources support Joins, and those that do will have their description displayed in the joinOperations field of the resource description. More information about this is described above. Join objects are similar to both the select and where clauses. They contain three parts; The field object which describes which field is to be joined, joinType is the name of the type of join to be performed, and fields is an object of key/value pairs for any additional fields that can or need to be set to perform the join.


```JSON
{
  "field": {},
  "joinType" : "Type of Join",
  "fields" : {}
}
```

**Joining across multiple resources is not currently allowed**

Example Join description
```JSON
{
    "name": "CROSSJOIN",
    "displayName": "Cross Join",
    "description": "Performs a cross-product join with equality predicates.",
    "fields": [
      {
        "name": "Right",
        "path": "RIGHT",
        "description": "Right Query",
        "required": true,
        "dataTypes": [
          {
            "name": "subQuery",
            "pattern": ".*",
            "description": "A IRCT subquery"
          }
        ],
        "permittedValues": []
      },
      {
        "name": "Dimensions",
        "path": "DIMENSIONS",
        "description": "DIMENSIONS",
        "required": true,
        "dataTypes": [
          {
            "name": "dimension",
            "pattern": "^.*$",
            "description": "DIMENSION",
            "typeof": "string"
          },
          {
            "name": "array",
            "pattern": ".*",
            "description": "An array"
          }
        ],
        "permittedValues": []
      },
      {
        "name": "Left Alias",
        "path": "LEFT_ALIAS",
        "description": "Left Alias",
        "required": false,
        "dataTypes": [
          {
            "name": "dimension",
            "pattern": "^.*$",
            "description": "DIMENSION",
            "typeof": "string"
          }
        ],
        "permittedValues": []
      },
      {
        "name": "Right Alias",
        "path": "RIGHT_ALIAS",
        "description": "Right Alias",
        "required": false,
        "dataTypes": [],
        "permittedValues": []
      }
    ]
  }
```

This operation will join an individual id from a Data array in the SciDB resource with the results of a query against the MetaData array where the Status field is equal to 'MO'.

Example Join
```JSON
{
        "field": {
           "pui": "/SciDB/Data/Individual_ID"
        },
        "joinType" : "CROSSJOIN",
        "fields" : {
           "RIGHT" : {
      			"where": [
      				{
        				"field": {
          					"pui": "/SciDB/MetaData/Status",
          					"dataType": "ATTRIBUTE"
        				},
        				"predicate": "FILTER",
        				"fields": {
          					"OPERATOR" : "EQ",
          					"VALUE" : "mo"
        				}
      				}
  				]
           },
           "DIMENSIONS" : ["Data.Individual_ID", "MetaData.Individual_ID"]
        }
}
```

**Not all resources support join clauses**


#### Sort Operations


```JSON
{
  "field": {},
  "sortType" : "SORT",
  "fields": {}
}
```

```JSON
{
    "operationName": "SORT",
    "displayName": "Sort",
    "description": "Sort",
    "fields": [
      {
        "name": "Direction",
        "path": "DIRECTION",
        "description": "Direction",
        "required": false,
        "dataTypes": [],
        "permittedValues": [
          "DESC",
          "ASC"
        ]
      }
    ],
    "dataTypes": [],
    "paths": []
}
```


```JSON
{
  "field": {
    "pui": "/SciDB/SQ/NUMBER_OF_MOTHERS_WITH_THIS_VARIANT"
  },
  "sortType" : "SORT",
  "fields": {
    "DIRECTION" : "DESC"
  }
}
```

**Not all resources support sort clauses**

#### Subqueries
Subqueries, when supported by a resource, allow for a user to perform multiple operations in a single step. Subqueries in the IRCT are constructed in the sam way as queries are. However subqueries are assigned names which are the key part of the key/value pair, with the subquery being the value. This allows for multiple subqueries to be declared in the same query. Subqueries support all the functionality of queries including subqueries. This allows the end user to create nested subqueries.

```JSON
{
   "subquery" : {
     "name" : {}
   }
}
```

**Not all resources support subqueries**

#### Basic Queries
A basic query would consist of a where clause and possibly a select clause. Using the example in the quick start we can see that we want the mean systolic pressure from all entries in the NHANES database that have the gender Male.

```JSON
{
	"select": [
	  {
		    "field": {
			    "pui": "/nhanes/Demo/examination/examination/blood pressure/mean systolic/",
			    "dataType": "STRING"
		    },
    		"alias": "Systolic Pressure"
	  }
	],
	"where": [
	  {
		    "field": {
			    "pui": "/nhanes/Demo/demographics/demographics/SEX/male",
    			"dataType": "STRING"
	    	},
		    "predicate": "CONTAINS",
		    "fields": {
			    "ENOUNTER": "YES"
		    }
	  }
	]
}
```

#### Nested Queries
If a resource supports it queries can be fed as input into fields to allow for nested queries. Any field that supports the Query data type will allow for a nested query to be an input. In the example below the nested query returns data from the SciDB resource where the MetaDataI Family_ID field is equal to 11002. The result of this query are fed into a join operation which will perform a CROSSJOIN operation between the Individual_ID that is returned by the nested query, and the DataI Individual_ID. These results are then counted aggregated to get a count of the Individual_ID that is returned by the join.

```JSON
{
  "select": [
      {
        "field": {
          "pui": "/SciDB/MetaDataI/Individual_ID"
        },
        "operation": "AGGREGATE",
        "fields" : {
           "FUNCTION" : "count",
           "DIMENSION" : "Individual_ID"
        }
      }
  ],
  "join" : [
      {
        "field": {
           "pui": "/SciDB/DataI/Individual_ID"
        },
        "joinType" : "CROSSJOIN",
        "fields" : {
           "RIGHT" : {
      			"where": [
      				{
        				"field": {
          					"pui": "/SciDB/MetaDataI/Family_ID",
          					"dataType": "ATTRIBUTE"
        				},
        				"predicate": "FILTER",
        				"fields": {
          					"OPERATOR" : "EQ",
          					"VALUE" : "11002"
        				}
      				}
  				]
           },
           "DIMENSIONS" : "MetaDataI.Individual_ID"
        }
      }
    ]
}
```

#### Advanced Queries
Queries in the IRCT can be used to perform complicated multi-step procedures with one call. The below query performs several steps across several different Arrays in the SciDB resource to obtain the ten most common variants amongst individuals who are mothers.

```JSON
{
  "subquery" : {
      "SORTEDQ" : {
        "subquery" : {
          "SQ" : {
  "select": [
      {
        "field": {
          "pui": "/SciDB/MetaData/Individual_ID"
        },
        "alias": "NUMBER_OF_MOTHERS_WITH_THIS_VARIANT",
        "operation": "AGGREGATE",
        "fields" : {
           "FUNCTION" : "count",
           "DIMENSION" : ["Chr", "Start", "End"]

        }
      }
  ],
  "join" : [
      {
        "field": {
           "pui": "/SciDB/Data/Individual_ID"
        },
        "joinType" : "CROSSJOIN",
        "fields" : {
           "RIGHT" : {
      			"where": [
      				{
        				"field": {
          					"pui": "/SciDB/MetaData/Status",
          					"dataType": "ATTRIBUTE"
        				},
        				"predicate": "FILTER",
        				"fields": {
          					"OPERATOR" : "EQ",
          					"VALUE" : "mo"
        				}
      				}
  				]
           },
           "DIMENSIONS" : ["Data.Individual_ID", "MetaData.Individual_ID"]
        }
      }
    ]
    }},
    "sort" : [
      {
      	"field": {
          "pui": "/SciDB/SQ/NUMBER_OF_MOTHERS_WITH_THIS_VARIANT"
        },
        "sortType" : "SORT",
        "fields": {
          "DIRECTION" : "DESC"
        }
      }
    ]
}
},
	"where": [
		{
        	"field": {
          		"pui": "/SciDB/SORTEDQ",
          		"dataType": "ATTRIBUTE"
        	},
        	"predicate": "BETWEEN",
        	"fields": {
          		"LOWBOUNDS" : "0",
          		"HIGHBOUNDS" : "10"
        	}
      	}
  	]
}
```

## Processes
#### What are Processes?
#### How do I Write a Process?

## Results
#### Result Status
#### Result Converters
#### Result Retrieval

## Bringing it all together
