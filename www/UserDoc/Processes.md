[Home](./index.md) > Processes

# Processes
## What are Processes?
Processes are any type of method that can be performed by a resource. These are typically specialized services that a resource offer that would be impractical, or computationally inefficient to run locally. The IRCT can use these outside processes by either passing the results of another action(e.g. Query) to it, or by strictly passing parameters to it in a similar manner as running a query.

## How do I Write a Process?
Processes in the IRCT are run by passing both the resource name, and process name that it supports. Any fields that are needed are put in a fields object where the key is the field name, and the value of that field for that process.

```JSON
{
  "resource" : "<Resource Name>",
  "name" : "<Process Name>",
  "fields" : {}
}
```

Example Process
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

To Use

```JSON
{
  "resource" : "exac",
  "name" : "RARITY",
  "fields" : {
    "RESULTSET" : "1634",
    "CHROMOSOME" : "chrom",
    "POSITION" : "start",
    "REFERENCE" : "ref",
    "VARIANT" : "var"
  }
}
```

## How do I run a Process?
Once the JSON for the process has been created it needs to be submitted to the IRCT so that it can be evaluated and run. This is accomplished by creating a POST request against the runProcess function with the JSON as the payload. The user most be in a valid session at the time, otherwise the request will return an error. Any formatting, or invalid fields will also result in an error being returned. If the process is successfully submitted then the IRCT will return back with a resultId. This id can be used to track the progress of the process and can be used to retrieve the results.

*POST /rest/v1/processService/runProcess*

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
