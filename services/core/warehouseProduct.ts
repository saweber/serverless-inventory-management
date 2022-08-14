export * as WarehouseProduct from "./warehouseProduct"

export type WarehouseProductEntityType = {
  warehouseId: string;
  productId: string;
  inventoryCost: number;
  inventoryCount: number;
  inventoryValue: number;
}

export async function GetWarehouseProduct(warehouseId: string, productId: string) {
  return {
    warehouseId: "1",
    productId: "1",
    inventoryCost: 1,
    inventoryCount: 2,
    inventoryValue: 3,
  }
}

export async function GetProductsInWarehouse(warehouseId: string) {
  return [{
    warehouseId: "1",
    productId: "1",
    inventoryCost: 1,
    inventoryCount: 2,
    inventoryValue: 3,
  }]
}

export async function GetWarehousesForProduct(productId: string) {
  return [{
    warehouseId: "1",
    productId: "1",
    inventoryCost: 1,
    inventoryCount: 2,
    inventoryValue: 3,
  }]
}