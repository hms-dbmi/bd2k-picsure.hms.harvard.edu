[Home](./index.md) > Queries

# Queries
### What are Queries?
All queries against any system can all be broken down into one simple idea; I want this data, from these places, given these conditions. In SQL parlance this is the same as select Data from Tables where these Predicates are true. As the IRCT supports multiple different types of resources we designed a way to handle the variety of different types of queries a resource can provide. A query can be thought of as a simple way to retrieve data out of a resource.

### How do I Write a Query?
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

### Where Clauses

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


### Select Clauses

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

### Join Clauses
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


### Sort Operations


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

### Subqueries
Subqueries, when supported by a resource, allow for a user to perform multiple operations in a single step. Subqueries in the IRCT are constructed in the sam way as queries are. However subqueries are assigned names which are the key part of the key/value pair, with the subquery being the value. This allows for multiple subqueries to be declared in the same query. Subqueries support all the functionality of queries including subqueries. This allows the end user to create nested subqueries.

```JSON
{
   "subquery" : {
     "name" : {}
   }
}
```

**Not all resources support subqueries**

### Basic Queries
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

### Nested Queries
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

### Advanced Queries
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
