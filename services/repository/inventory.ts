export * as Inventory from "./inventory"

import { AttributeValue, PutItemCommand, PutItemInput, QueryCommand, QueryCommandInput } from "@aws-sdk/client-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb"
import { GetClient, GetTableName } from "./dynamo";

const client = GetClient();
const tableName = GetTableName();

export type InventoryEntityType = {
  warehouseId: string;
  productId: string;
  inventoryCost: number;
  inventoryCount: number;
  inventoryValue: number;
  itemCost: number;
  itemPrice: number;
}

export async function GetInventoryForProductAndWarehouse(productId: string, warehouseId: string) : Promise<any> {
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

export async function GetInventoryForWarehouse(warehouseId: string) : Promise<any> {
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
  if (response.Items?.length === 0) {
    return {}
  } else {
    const items: Record<string, any>[] = [];
    response.Items?.forEach(item => items.push(unmarshall(item)));
    return items;
  }
}

export async function GetInventoryForProduct(productId: string) : Promise<any> {
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
  if (response.Items?.length === 0) {
    return {}
  } else {
    const items: Record<string, any>[] = [];
    response.Items?.forEach(item => items.push(unmarshall(item)));
    return items;
  }
}

export function SaveInventory(inventory: InventoryEntityType) {
  const warehouseKey = "warehouse#" + inventory.warehouseId;
  const productKey = "product#" + inventory.productId;
  const time = new Date().toISOString();
  const item: Record<string, AttributeValue> = {
    'pk': {S : warehouseKey},
    'sk': {S: productKey},
    'entityType': {S : 'inventoryItem'},
    'gsi1pk': { S : productKey},
    'gsi1sk': { S: warehouseKey },
    'gsi2pk': { S: 'inventoryItems' },
    'gsi2sk': { S: time },
    'inventoryCount': { N: inventory.inventoryCount.toString() },
    'inventoryCost': { N: inventory.inventoryCost.toString() },
    'inventoryValue': { N: inventory.inventoryValue.toString() },
    'warehouseId': { S: inventory.warehouseId },
    'productId': { S: inventory.productId },
    'itemCost': { S: inventory.itemCost.toString() },
    'itemPrice': { S: inventory.itemPrice.toString()}
  }
  const input: PutItemInput = {
    TableName: tableName,
    Item: item
  }
  const command = new PutItemCommand(input);
  client.send(command);
}