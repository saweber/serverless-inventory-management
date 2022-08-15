export * as Dynamo from "./dynamo";

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
const client = new DynamoDBClient({ region: "us-east-1" });

export function GetTableName() {
  return process.env.TABLE_NAME;
}

export function GetClient() {
  return client;
}