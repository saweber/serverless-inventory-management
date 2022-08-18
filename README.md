# warehouse-serverless

## Summary

My intention is to build out a minimal first slice of the case interview. I focused on getting critical portions set up correctly, having a basic CI/CD pipeline, and enabling rapid future iterations.

## Process

1. Build out database model
   a. Understand domain model and data relationships
   b. Understand read access patterns
   c. Design DynamoDB single table
   d. Manually load table with some data to validate above steps
2. Design and build out basic API for returning data
3. Design and build out ingestion process
   a. SST stack for required resources
   b. Write lambda code

## Decisions and Assumptions

Normally, there would be considerable discussion with a subject matter expert to validate the structure of the data, access patterns, and lay relevant groundwork for future functionality. Without one, I am making assumptions - and documenting them here.

### Definitions

Warehouse - physical location that contains items for sale
Product - 0 or more items for sale of the same type
WarehouseProduct - the available product at a given warehouse

Inventory Cost - the cost of a product multiplied by the number of the product in inventory
Inventory Value - the retail price of a product multiplied by the number of the product in inventory

### Denormalizing inventory count and value onto product entity

Assumption is that totals may be frequently accessed, and would certainly get more expensive to compute dynamically, as the number of warehouses could grow. In other words, I am assuming write once, read many (WORM).

I'm assuming that eventually consistent reads are acceptable. Not implemented is transactional writes - which are desired to ensure the consistency of counts and values between the WarehouseProduct and the Product (cut for time).

### SST.dev (Serverless Stack)

- Familiarity
- CDK stack based
- Local debugging of Lambda functions
- Bootstrap / code generation for dynamodb and graphql is effective

### Github Actions

- Familiarity
- Already had a working pipeline with SST

## External Documents

[Data Model](https://docs.google.com/spreadsheets/d/1PUTvMG-kMZ4WCtnuLU0aQ4wYuYywusLiwKrV2ie6w4c/edit?usp=sharing)

## How to Run

`yarn install`
`yarn sst start`

This should also work with npm.

`Inventory API.postman_collection.json` -> load into postman, set the `endpoint` variable to the API gateway endpoint.

## Skipped for Time and Limitations

- Authentication / Authorization - requires additional time, I would look heavily into lambda authorizers and Cognitio with API Gateway.
- Automated testing - extremely important, but there is no significant business logic to test at this time, and integration and e2e tests are going to take a significant amount of time.
- Schema refactoring - I would do some subentities, like location on a warehouse, to clearly group correlated fields.
- No service layer between repository and graphql resolvers - currently there is no 'business logic' or significant data transformation.
- No error handling, this only assumes the 'happy path'
- Especially on data ingestion - code needs refactoring, mostly to reduce repetition
- No EventBridge or other event stream, instead of piping s3 events directly to lambda
- This works for small data sets, but more robust pipelines would be needed for ingestion at larger scale (perhaps Glue, Batch, EMR serverless, etc)
- Currently there are no deletions - the dynamodb schema supports it through finding records with old timestamps, but the functionality is presently unused.
- Warehouse and Product files must be uploaded before inventory - otherwise denormalized fields may not have data
