[Home](./index.md) > Release Notes

# Release Notes

### 1.3.2
Updated the Result field to include information about what part of the execution process created this result (i.e. EXECUTION/ACTION)

### 1.3.1
This release includes improved documentation and minor code cleanup. This release includes improved documentation, as well as an update to the sql file for adding result data converters to a new IRCT installation. This release includes improved documentation, and an update on the SciDB.sql file. The i2b2/tranSMART resource interface has been refactored to better support '/' characters. The i2b2/tranSMART JSON result converter has been refactored to better handle large arrays of JSON objects that are returned from the Clinical Data Service.

### 1.3
The 1.3 release of the IRCT allows for subqueries, and for queries to be contained as values in fields. It also adds support for arrays to be values in fields. Queries can also include sort clauses, and select operations can now have aggregates. This release includes a refactoring of the Query Service RESTFull service. It adds better support for joins, as well as new support for subqueries, and sort predicates. This release includes improvements in the SciDB resource interface that includes improved query performance.

### 1.2.2
Fixes a bug which caused the IRCT to keep open some files, eventually causing the application to crash. This release includes the first implementation of the SciDB resource interface. Also included are performance improvements in the CSV result data converter. Minor development code clean up are also included.

### 1.2.1
Fixes minor bugs and improves the DB connection to prevent dropped DB connections. This release includes some minor bug fixes with logging, as well as saving the results in AWS S3. It also includes better documentation. It includes standardized end user error messages for system exceptions, and unknown URL requests.

### 1.2
This release includes new event listeners that expand the search functionality when enabled. These listeners allow for the capitalization of the search terms, and finding UMLS synonyms. Minor code cleanup was also included in this release. Improvements in the JPA, and minor bug fixes were also included.

### 1.1
This release adds event listener functionality so that some features can be added and removed by each implementation, and does not require any changes to the core code. The result data converters were moved to the RI repo, from the API repo. This is the initial release of the IRCT Extensions. It has been tagged as release version 1.1 so it synchs better with the other components of the IRCT (CL, RI, and API). Included in this release are the event listers for monitoring, and saving and retrieving results to AWS S3. This release includes minor improvements in the i2b2, and i2b2/tranSMART resource interfaces, as well as the sql scripts needed to add these resource interfaces to an IRCT instance. This release cleans up some code, as well as fixes some minor bugs.

### 1.0
This is the first release of the IRCT.

### 0.3
This release fixes bugs in the IRCT 0.2 release

### 0.2
This is the initial prerelease of the IRCT it provides a proof of concept of the IRCT.
