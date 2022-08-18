import { Bucket, use, StackContext } from "@serverless-stack/resources";
import { Database } from "./Database";

export function WarehouseStorage({ stack }: StackContext) {
  const db = use(Database);
  const warehouseBucket = new Bucket(stack, "warehouse", {
    notifications: {
      load: {
        function: {
          handler: "functions/processCsv/warehouse.handler",
          permissions: [db],
          environment: {
            TABLE_NAME: db.tableName,
          },
        },
        events: ["object_created"],
      },
    },
  });

  warehouseBucket.attachPermissions([warehouseBucket]);

  stack.addOutputs({
    BucketName: warehouseBucket.bucketName,
  });

  return warehouseBucket;
}

export function InventoryStorage({ stack }: StackContext) {
  const db = use(Database);
  const inventoryBucket = new Bucket(stack, "inventory", {
    notifications: {
      load: {
        function: {
          handler: "functions/processCsv/inventory.handler",
          permissions: [db],
          environment: {
            TABLE_NAME: db.tableName,
          },
        },
        events: ["object_created"],
      },
    },
  });

  inventoryBucket.attachPermissions([inventoryBucket]);

  stack.addOutputs({
    BucketName: inventoryBucket.bucketName,
  });

  return inventoryBucket;
}

export function ProductStorage({ stack }: StackContext) {
  const db = use(Database);
  const productBucket = new Bucket(stack, "product", {
    notifications: {
      load: {
        function: {
          handler: "functions/processCsv/product.handler",
          permissions: [db],
          environment: {
            TABLE_NAME: db.tableName,
          },
        },
        events: ["object_created"],
      },
    },
  });

  productBucket.attachPermissions([productBucket]);

  stack.addOutputs({
    BucketName: productBucket.bucketName,
  });
  return productBucket;
}
