export * as Product from "./product"

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

export async function GetProducts() {
  return [{
    id: "1",
    inventoryCost: 1,
    inventoryCount: 2,
    inventoryValue: 3,
    itemCost: 5,
    itemPrice: 6,
    manufacturer: "asdf",
    name: "asdf"
  }]
}

export async function GetProduct(productId: string) {
  return {
    id: "1",
    inventoryCost: 1,
    inventoryCount: 2,
    inventoryValue: 3,
    itemCost: 5,
    itemPrice: 6,
    manufacturer: "asdf",
    name: "asdf"
  }
}