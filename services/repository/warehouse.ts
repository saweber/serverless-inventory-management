export * as Warehouse from "./warehouse"

import { QueryCommand, QueryCommandInput } from "@aws-sdk/client-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb"
import { GetClient, GetTableName } from "./dynamo";

const client = GetClient();
const tableName = GetTableName();

export type WarehouseEntityType = {
  id: string;
  phoneNumber: string;
  address: string;
  city: string;
  stateAbbreviation: string;
  zipCode: string;
}

export async function GetWarehouses() {
  const input : QueryCommandInput = {
    IndexName: "gsi1",
    TableName: tableName,
    KeyConditionExpression: "#gsi1pk = :warehouses",
    ExpressionAttributeNames: {
      "#gsi1pk": "gsi1pk"
    },
    ExpressionAttributeValues: {
      ":warehouses": { S: "warehouses" }
    }
  }
  const command = new QueryCommand(input);
  const response = await client.send(command);
  const items = response.Items?.map(item => unmarshall(item))
  return items
}

export async function GetWarehouse(warehouseId: string) {
  const input: QueryCommandInput = {
    TableName: tableName,
    KeyConditionExpression: "#pk = :pk and #sk = :pk",
    ExpressionAttributeNames: {
      "#pk": "pk",
      "#sk": "sk"
    },
    ExpressionAttributeValues: {
      ":pk": { S:  "warehouse#" + warehouseId}
    }
  }
  const command = new QueryCommand(input);
  const response = await client.send(command); 
  if (response.Items?.length === 1) {
    const item = unmarshall(response.Items[0])
    return item;
  } else {
    return {}
  }
}
