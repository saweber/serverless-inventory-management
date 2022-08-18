export * as Warehouse from "./warehouse"

import { AttributeValue, PutItemCommand, PutItemInput, QueryCommand, QueryCommandInput } from "@aws-sdk/client-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb"
import { GetClient, GetTableName } from "./dynamo";

const client = GetClient();
const tableName = GetTableName();

export type WarehouseEntityType = {
  id: string;
  name: string;
  phoneNumber: string;
  address: string;
  city: string;
  stateAbbreviation: string;
  zipCode: string;
}

export async function GetWarehouses() : Promise<any> {
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

export async function GetWarehouse(warehouseId: string) : Promise<any> {
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

export function SaveWarehouse(warehouse: WarehouseEntityType) {
  const warehouseKey = "warehouse#" + warehouse.id;
  const time = new Date().toISOString();
  const item : Record<string, AttributeValue> = {
    'pk': {S : warehouseKey},
    'sk': {S: warehouseKey},
    'entityType': {S : 'warehouse'},
    'gsi1pk': { S : 'warehouses'},
    'gsi1sk': { S : time},
    'id': {S : warehouse.id},
    'address': {S : warehouse.address},
    'city': {S : warehouse.city},
    'stateAbbreviation': {S: warehouse.stateAbbreviation},
    'zipCode': {S: warehouse.zipCode},
    'phoneNumber': {S: warehouse.phoneNumber}
  };
  const input: PutItemInput = {
    TableName: tableName,
    Item: item
  }
  const command = new PutItemCommand(input);
  client.send(command);
}
