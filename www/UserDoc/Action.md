Working example of querying across two resources, and combining them with a join

```JSON
{
"select": [
   {
    "field": {
    	"pui": "/SciDB/Variants/Alt",
        "dataType": "ATTRIBUTE"
    }
   },
   {
    "field": {
    	"pui": "/SciDB/Variants/VCF_ID",
        "dataType": "ATTRIBUTE"
    }
   }
],
"where": [
   {
		"field" : {
			"pui" : "/Local Genomic Files/Join.csv",
			"dataType": "STRING"
		},
		"predicate" : "FILE"
	},
   {
        "field": {
          "pui": "/SciDB/Variants/Gene_refGene",
          "dataType": "ATTRIBUTE"
        },
        "predicate": "FILTER",
        "fields": {
          "OPERATOR" : "EQ",
          "VALUE" : "CHD8"
        }
      }
],
"join" : [
		{
			"joinType" : "innerJoin",
			"fields" : {
				"Left" : "/SciDB/VCF_ID",
				"Right" : "/Local Genomic Files/VCF_ID"
			}
		}
	]
}
```
