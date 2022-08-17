export * as Product from "./product"

import { QueryCommand, QueryCommandInput } from "@aws-sdk/client-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";
import { GetClient, GetTableName } from "./dynamo";

const client = GetClient();
const tableName = GetTableName();

export type ProductEntityType = {
  id: string;
  inventoryCost: number;
  inventoryCount: number;
  inventoryValue: number;
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