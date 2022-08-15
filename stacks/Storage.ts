import { Bucket, EventBus, StackContext } from "@serverless-stack/resources";

// eventbridge / s3 notification to trigger lambda
export function WarehouseStorage({ stack }: StackContext) {
  const warehouseBucket = new Bucket(stack, "warehouse", {});

  return warehouseBucket;
}

export function WarehouseInventoryStorage({ stack }: StackContext) {
  const warehouseInventoryBucket = new Bucket(stack, "warehouseInventory", {});

  return warehouseInventoryBucket;
}

export function ProductStorage({ stack }: StackContext) {
  const productBucket = new Bucket(stack, "product", {});

  return productBucket;
}

export function asdf({ stack }: StackContext) {
  // const eventBridge = new EventBus();
}
