import { Bucket, EventBus, StackContext } from "@serverless-stack/resources";
import * as lambda from "aws-cdk-lib/aws-lambda";

export function WarehouseStorage({ stack }: StackContext) {
  const warehouseBucket = new Bucket(stack, "warehouse", {
    notifications: {
      resize: {
        function: {
          handler: "functions/processCsv/warehouseHandler.handler",
        },
        events: ["object_created"],
      },
    },
  });

  // Allow the notification functions to access the bucket
  warehouseBucket.attachPermissions([warehouseBucket]);

  // Show the endpoint in the output
  stack.addOutputs({
    BucketName: warehouseBucket.bucketName,
  });

  return warehouseBucket;
}

// export function WarehouseInventoryStorage({ stack }: StackContext) {
//   const warehouseInventoryBucket = new Bucket(stack, "warehouseInventory", {});

//   return warehouseInventoryBucket;
// }

// export function ProductStorage({ stack }: StackContext) {
//   const productBucket = new Bucket(stack, "product", {});

//   return productBucket;
// }

