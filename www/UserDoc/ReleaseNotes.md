[Home](./index.md) > Release Notes

# Release Notes

### 1.3.2
Updated the Result field to include information about what part of the execution process created this result (i.e. EXECUTION/ACTION)

### 1.3.1
This release includes improved documentation, as well as an update to the sql file for adding result data converters to a new IRCT installation. It also includes an update on the SciDB.sql file. Additionally the i2b2/tranSMART resource interface has been refactored to support '/' characters and to better handle large arrays of JSON objects that are returned from the Clinical Data Service.

### 1.3
The 1.3 release of the IRCT allows for subqueries, arrays, and for queries to be contained as values in fields. Queries can also include sort clauses, and select clauses can now have aggregates and other functions. As part of these improvements the Query Service RESTFull service was refactored. This release also includes improvements in the SciDB resource interface that includes improved query performance by supporting orders of operation.

### 1.2.2
Fixes a bug which caused the IRCT to keep open some files, eventually causing the application to crash. This release includes the first implementation of the SciDB resource interface. Also included are performance improvements in the CSV result data converter, and minor development code clean up.

### 1.2.1
This release fixes minor bugs and improves the DB connection to prevent dropped connections. This release also includes some minor bug fixes with logging, as well as saving the results in AWS S3. Standardized end user error messages for system exceptions, and unknown URL requests were also added.

### 1.2
This release includes new event listeners that expand the search functionality. These listeners allow for the capitalization of the search terms, and finding UMLS synonyms. Improvements to support a newer version of JPA, and minor bug fixes were also included in this release.

### 1.1
This release adds event listener functionality so that some features can be added and removed with each implementation, and will not require any changes to the core code. This includes the creation of the IRCT-EXT repo which has been tagged as release version 1.1 so it synchs up with the other IRCT components (CL, API, and RI). Included in the first release of the IRCT-EXT are event listeners for monitoring, saving, and retrieving results. Additional minor improvements were made to the i2b2, and i2b2/tranSMART resource interfaces.

### 1.0
This is the first major release of the IRCT. It includes a complete rewrite of all major components, as well as adding new features such as Security.

### 0.3
This release fixes bugs in the IRCT 0.2 release

### 0.2
This is the initial prerelease of the IRCT which provides a proof of concept of the ideas behind it.
