export * as Product from "./product"

import { AttributeValue, PutItemCommand, PutItemInput, QueryCommand, QueryCommandInput, UpdateItemCommand, UpdateItemInput } from "@aws-sdk/client-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";
import { GetClient, GetTableName } from "./dynamo";

const client = GetClient();
const tableName = GetTableName();

export type ProductEntityType = {
  id: string;
  inventoryCost?: number;
  inventoryCount?: number;
  inventoryValue?: number;
  itemCost: number;
  itemPrice: number;
  manufacturer: string;
  name: string;
}

export async function GetProducts() : Promise<any> {
  const input : QueryCommandInput = {
    IndexName: "gsi2",
    TableName: tableName,
    KeyConditionExpression: "#gsi2pk = :products",
    ExpressionAttributeNames: {
      "#gsi2pk": "gsi2pk"
    },
    ExpressionAttributeValues: {
      ":products": { S: "products" }
    }
  }
  const command = new QueryCommand(input);
  const response = await client.send(command);
  const items = response.Items?.map(item => unmarshall(item))
  return items
}

export async function GetProduct(productId: string) : Promise<any> {
   const input: QueryCommandInput = {
    TableName: tableName,
    KeyConditionExpression: "#pk = :pk and #sk = :pk",
    ExpressionAttributeNames: {
      "#pk" : "pk",
      "#sk": "sk"
    },
    ExpressionAttributeValues: {
      ":pk": { S:  "product#" + productId}
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

export function SaveProduct(product: ProductEntityType): void {
  const productKey = "product#" + product.id
  const time = new Date().toISOString();
  const item: Record<string, AttributeValue> = {
    'pk': { S: productKey },
    'sk': { S: productKey },
    'entityType': { S: "product" },
    'gsi1pk': { S: productKey },
    'gsi1sk': { S: productKey },
    'gsi2pk': { S: "products" },
    'gsi2sk': { S: time },
    'id': { S: product.id},
    'name': { S: product.name },
    'manufacturer': { S: product.manufacturer },
    'itemCost': { N: product.itemCost.toString() },
    'itemPrice': { N: product.itemPrice.toString() }
  }
  const input: PutItemInput = {
    TableName: tableName,
    Item: item
  }
  const command = new PutItemCommand(input);
  client.send(command);
}

export function UpdateProduct(productId: string, inventoryCost: number, inventoryCount: number, inventoryValue: number) {
  const input: UpdateItemInput = {
    TableName: tableName,
    Key: {
      pk: { S: productId },
      sk: { S: productId }
    },
    UpdateExpression: "SET inventoryCost = :cost, inventoryValue = :value, inventoryCount = :count",
    ExpressionAttributeValues: {
      ":cost": { N: inventoryCost.toString() },
      ":value": { N: inventoryValue.toString() },
      ":count": { N: inventoryCount.toString()}
    }

  }
  const command = new UpdateItemCommand(input);
  client.send(command);
}