export * as Warehouse from "./warehouse"

export type WarehouseEntityType = {
  id: string;
  phoneNumber: string;
  address: string;
  city: string;
  stateAbbreviation: string;
  zipCode: string;
}
export async function GetWarehouses() {
  return [{
    id: "001",
    phoneNumber: "111-111-1111",
    address: "123 lane",
    city: "city city",
    stateAbbreviation: "Tx",
    zipCode: "12345"
  }]
}

export async function GetWarehouse(warehouseId: string) {
  return {
    id: "001",
    phoneNumber: "111-111-1111",
    address: "123 lane",
    city: "city city",
    stateAbbreviation: "Tx",
    zipCode: "12345"
  }
}
