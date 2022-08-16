export * as WarehouseProduct from "./warehouseProduct"

import { QueryCommand, QueryCommandInput } from "@aws-sdk/client-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb"
import { GetClient, GetTableName } from "./dynamo";

const client = GetClient();
const tableName = GetTableName();

export type WarehouseProductEntityType = {
  warehouseId: string;
  productId: string;
  inventoryCost: number;
  inventoryCount: number;
  inventoryValue: number;
}

export async function GetWarehouseProduct(warehouseId: string, productId: string) {
  const input: QueryCommandInput = {
    TableName: tableName,
    KeyConditionExpression: "#pk = :warehouseId and #sk = :productId",
    ExpressionAttributeNames: {
      "#pk" : "pk",
      "#sk": "sk"
    },
    ExpressionAttributeValues: {
      ":productId": { S: "product#" + productId },
      ":warehouseId": { S: "warehouse#" + warehouseId}
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

export async function GetProductsInWarehouse(warehouseId: string) {
  const input: QueryCommandInput = {
    TableName: tableName,
    KeyConditionExpression: "#pk = :warehouseId and begins_with(#sk,:product) ",
    ExpressionAttributeNames: {
      "#pk" : "pk",
      "#sk": "sk"
    },
    ExpressionAttributeValues: {
      ":product": { S: "product" },
      ":warehouseId": { S: "warehouse#" + warehouseId}
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

export async function GetWarehousesForProduct(productId: string) {
  const input: QueryCommandInput = {
    TableName: tableName,
    IndexName: "gsi1",
    KeyConditionExpression: "#gsi1pk = :productId and begins_with(#gsi1sk,:warehouse)",
    ExpressionAttributeNames: {
      "#gsi1pk" : "gsi1pk",
      "#gsi1sk": "gsi1sk"
    },
    ExpressionAttributeValues: {
      ":productId": { S: "product#" + productId },
      ":warehouse": { S: "warehouse"}
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