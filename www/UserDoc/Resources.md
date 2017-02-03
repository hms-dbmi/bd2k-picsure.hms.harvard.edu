[Home](./index.md) > Resources

# Resources
### What are Resources?
Resources are loosely defined as being any outside application, or service that the IRCT communicates with. This includes resources that provide data such as i2b2/tranSMART, or services such as ExAC.

! Because the IRCT has the ability to communicate with a variety of different types of resources, and what type of implementation they support the IRCT needs to describe what they do to the end user.

! As described above this creates a Resource Driven API.

! We look more into the different parts of how to understand what a resource supports, and what you can do with it.

### Getting a List of Resources

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

### Understanding Resource Components
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

### Navigating Resources
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
