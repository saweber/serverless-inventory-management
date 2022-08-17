import {
  Inventory,
  InventoryEntityType,
} from "@inventory-management/repository/inventory";
import { builder } from "../builder";

const InventoryType = builder
  .objectRef<InventoryEntityType>("WarehouseProduct")
  .implement({
    fields: (t) => ({
      warehouseId: t.exposeString("warehouseId"),
      productId: t.exposeString("productId"),
      inventoryCost: t.exposeFloat("inventoryCost"),
      inventoryCount: t.exposeInt("inventoryCount"),
      inventoryValue: t.exposeFloat("inventoryValue"),
      itemCost: t.exposeFloat("itemCost"),
      itemPrice: t.exposeFloat("itemPrice"),
    }),
  });

builder.queryFields((t) => ({
  inventory: t.field({
    type: InventoryType,
    args: {
      warehouseId: t.arg.string({ required: true }),
      productId: t.arg.string({ required: true }),
    },
    resolve: (_, args) =>
      Inventory.GetInventoryForProductAndWarehouse(
        args.productId,
        args.warehouseId
      ),
  }),
  inventoryInWarehouse: t.field({
    type: [InventoryType],
    args: {
      warehouseId: t.arg.string({ required: true }),
    },
    resolve: (_, args) => Inventory.GetInventoryForWarehouse(args.warehouseId),
  }),
  inventoryForProduct: t.field({
    type: [InventoryType],
    args: {
      productId: t.arg.string({ required: true }),
    },
    resolve: (_, args) => Inventory.GetInventoryForProduct(args.productId),
  }),
}));
