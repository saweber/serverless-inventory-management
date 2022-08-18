import { Bucket, StackContext } from "@serverless-stack/resources";

export function WarehouseStorage({ stack }: StackContext) {
  const warehouseBucket = new Bucket(stack, "warehouse", {
    notifications: {
      resize: {
        function: {
          handler: "functions/processCsv/warehouse.handler",
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
  const inventoryBucket = new Bucket(stack, "inventory", {
    notifications: {
      resize: {
        function: {
          handler: "functions/processCsv/inventory.handler",
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
  const productBucket = new Bucket(stack, "product", {
    notifications: {
      resize: {
        function: {
          handler: "functions/processCsv/product.handler",
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
