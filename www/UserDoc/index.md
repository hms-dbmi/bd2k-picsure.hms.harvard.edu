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
	  },
      {
		    "field": {
			    "pui": "/nhanes/Demo/examination/examination/blood pressure/mean diastolic/",
			    "dataType": "STRING"
		    },
    		"alias": "Diastolic Pressure"
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
	  },
      {
        "field": {
          "pui": "/nhanes/Demo/demographics/demographics/AGE",
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
  "resultId": 158101
}
```

###### Checking on the status of a query

*GET https://<span></span>nhanes.hms.harvard.edu/rest/v1/resultService/resultStatus/&lt;resultId&gt;*

Response
```JSON
{
  "resultId": 158101,
  "status": "AVAILABLE"
}
```


##### Getting the CSV results of a query
*GET https://<span></span>nhanes.hms.harvard.edu/rest/v1/resultService/result/&lt;resultId&gt;/CSV*

Response
```JSON
{
  "status": "success"
}
```

###### Ending a session
_GET https://<span></span>nhanes.hms.harvard.edu/rest/v1/securityService/endSession_

Response
```CSV
PATIENT_NUM,Systolic Pressure
14759, 12.3

...
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
In this section we will look at the different parts of the JSON description of a resource.

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
This predicates attribute contains a list of all the available operations that can be done during a query. Since the IRCT can support many different types of operations we will have multiple examples.

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
predicateName | The name of the predicate name that is to be referenced in a query
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

```JSON

```

## Term Search
#### Searching for a Term Across Resources
*GET /rest/v1/resourceService/find?term=&lt;TERM&gt;*

#### Searching for a Term on a Resource
*GET /rest/v1/resourceService/&lt;RESOURCE&gt;?term=&lt;TERM&gt;*

#### Using Search Extensions
*GET /rest/v1/resourceService/&lt;RESOURCE&gt;?term=&lt;TERM&gt;&&lt;PARAMETER&gt;=&lt;VALUE&gt;*

## Queries
#### What are Queries?
Queries are a simple way to retrieve data out of a resource.

In the IRCT they are resource agnostic, and are automatically translated to the native language of the resource.

#### How do I Write a Query?

#### Basic Queries

#### Nested Queries

#### Advanced Queries


## Processes
#### What are Processes?
#### How do I Write a Process?

## Results
#### Result Status
#### Result Converters
#### Result Retrieval

## Bringing it all together
