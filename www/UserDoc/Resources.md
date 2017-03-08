[Home](./index.md) > Resources

# Resources
## What are Resources?
Resources are loosely defined as being any outside application, or service that the IRCT communicates with. This includes resources that provide data such as i2b2/tranSMART, or services such as ExAC. Since the IRCT supports multiple different resource types the IRCT needs to describe what they can do. This helps to define what this 'Resource Driven API' can accomplish.

You can learn more about what resources are offered by default from the IRCT by visiting our Resource Interface wiki [here](https://github.com/hms-dbmi/IRCT-RI/wiki).

## Getting a List of Resources

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

## Understanding Resource Components
In this section we will look at the different parts of the JSON description of a resource. This is not an exhaustive list of all the different combinations that are possible but it will provide a general overview of the different features that a resource can expose. We accomplish this by dividing the JSON from the above example into several different parts, and describe each of those parts.

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

###Predicates

```JSON
{
  "predicateName": "<Predicate Name",
  "displayName": "<Display Name",
  "description": "<Description>",
  "default": true,
  "relationship": "<Relationship>",
  "fields": [],
  "dataTypes": [],
  "paths": []
}
```

Key | Meaning
-----|--------
predicateName | The name of the predicate that is used to create a query
displayName | The name of the predicate to be displayed
description | A description of the predicate
default | The default predicate to be run
relationship | This is the relationship that must be associated with a path in a query
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

Example Predicate
```JSON
{
  "predicateName": "CONTAINS",
  "displayName": "Contains",
  "description": "Contains value",
  "default": true,
  "fields": [
    {
      "name": "By Encounter",
      "path": "ENCOUNTER",
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

Example Predicate with Relationship
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


###Select Fields
Resources in the IRCT can support fields that are not associated with a select operation.

```JSON
{
  "name" : "<Select Field Name>",
  "path" : "<Select Path>",
  "description" : "<Description of the Select Field>",
  "required" : "<Boolean if the field is required>",
  "dataTypes" : "<Data Types>",
  "permittedValues" : "<An optional list of permitted values>"
}

```

Key | Meaning
-----|--------
name | The name of the select field as it is to be displayed
path | The reference path of the select field as it is to be used in a query
description | A description of the select field
required | Is this select field required or not
dataTypes | Types of data that can be passed as a value of this select field
permittedValues | A list of possible values that can be set for this select field


Example Select Field
```JSON
{
  "name": "Compact",
  "path": "COMPACT",
  "description": "Compact the wildcard columns down to the parent level",
  "required": false,
  "dataTypes": [],
  "permittedValues": [
    "TRUE",
    "FALSE"
  ]
}
```

###Select Operations

```JSON
{
  "operationName": "<Select Operation Name>",
  "displayName": "<Select Operation Display Name>",
  "description": "<Description of the Select Operation>",
  "fields": [],    
  "dataTypes": [],
  "paths": []
}
```

Key | Meaning
-----|--------
operationName | The name of the select operation that is used to create a query
displayName | The name of the select operation to be displayed
description | A description of the select operation
fields | An array of fields that either have to or can be passed as part of the select operation for the query. Fields are described above.
dataTypes | The data types that this select operation can be run on
paths | The paths that this select operation can be run on


Example Select Operation
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

###Join Operations

```JSON
{
  "name": "<Join Operation Name>",
  "displayName": "<Join Operation Display Name>",
  "description": "<Description of the Join Operation>",
  "fields": [],    
  "dataTypes": [],
  "paths": []
}
```

Key | Meaning
-----|--------
operationName | The name of the join operation that is used to create a query
displayName | The name of the join operation to be displayed
description | A description of the join operation
fields | An array of fields that either have to or can be passed as part of the join operation for the query. Fields are described above.
dataTypes | The data types that this join operation can be run on
paths | The paths that this join operation can be run on

Example Join Operation
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
```
###Sort Operations

```JSON
{
  "operationName": "<Sort Operation Name>",
  "displayName": "<Sort Operation Display Name>",
  "description": "<Description of the Sort Operation>",
  "fields": [],    
  "dataTypes": [],
  "paths": []
}
```

Key | Meaning
-----|--------
operationName | The name of the sort operation that is used to create a query
displayName | The name of the sort operation to be displayed
description | A description of the sort operation
fields | An array of fields that either have to or can be passed as part of the sort operation for the query. Fields are described above.
dataTypes | The data types that this sort operation can be run on
paths | The paths that this sort operation can be run on

Example Sort Operation
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

###Process Operations
```JSON
{
  "name": "<Process Operation Name>",
  "displayName": "<Process Operation Display Name>",
  "description": "<Description of the Process Operation>",
  "fields": [],    
  "dataTypes": [],
  "paths": []
}
```

Key | Meaning
-----|--------
name | The name of the process operation that is used to create a query
displayName | The name of the process operation to be displayed
description | A description of the process operation
fields | An array of fields that either have to or can be passed as part of the process operation for the query. Fields are described above.
dataTypes | The data types that this process operation can be run on
paths | The paths that this process operation can be run on

Example process
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

## Navigating Resources
Resources that provide query functionality will typically have a collection of entities that can be queried upon. These entities can have different relationships with each other but are typically arranged in a tree structure (i.e. Parent/Child). All entities are assigned a unique identifier called the Path Unique Identifier (PUI). All paths to entities are delimited by a '/' character. The first part is always the resource name, while all proceeding parts is the IRCTs interpretation of the resources internal paths to a given entity.

Example PUI
/nhanes/Demo/demographics/demographics/SEX/male

The above path references the male sex demographics entity in the NHANES resource.


*GET /rest/v1/resourceService/path/&lt;resource&gt;/&lt;path&gt;?relationship=&lt;relationship&gt;*

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
