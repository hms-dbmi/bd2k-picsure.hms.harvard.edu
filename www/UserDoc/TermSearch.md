[Home](./index.md) > Term Search

# Term Search
In order to help users to find terms that occur at any given resource, or resources the IRCT supports searching. A user can either search for a term, or they can search for an ontological term across a single resource, or across all resources that support searching. Any resource that doesn't support searching will return an empty array.

## Searching for a Term Across Resources
To search for a term across all available resources with the IRCT. Set the search term as the term path parameter to the find function. This will return an array of all entities that match that term from all resources that support searching.

*GET /rest/v1/resourceService/find?term=&lt;TERM&gt;*


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

## Searching for a Term on a Resource
To search across a single resource add the resource name to the URI. To search within a specific path inside a resource add the path information to the URI.

*GET /rest/v1/resourceService/find/&lt;RESOURCE&gt;?term=&lt;TERM&gt;*

**Not all resources support searching for a term, and those that don't will return an empty array**

## Searching for an Ontology Term
To search for an ontological term instead of passing a term path parameter, pass an ontolgyTerm, and ontologyType parameter. The ontologyTerm will be the term as specified by the ontology, and the ontologyType will be the ontology. Additionally you may also restrict your term to one resource by adding the resource parameter as shown above.

*GET /rest/v1/resourceService/find?ontologyTerm=&lt;TERM&gt;&ontologyType=&lt;TYPE&gt;*

**Not all resources support search for ontological terms, and those that don't will return an empty array**

## Using Search Extensions
Some IRCT instances may support additional search extensions such as searching for synonyms. These additional parameters can be configured by adding additional path parameters to the URI.

*GET /rest/v1/resourceService/find?term=&lt;TERM&gt;&&lt;PARAMETER&gt;=&lt;VALUE&gt;*

**You can search using an extension across a single resource by adding the Resource Name**
