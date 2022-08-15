import {
  WarehouseProduct,
  WarehouseProductEntityType,
} from "@inventory-management/repository/warehouseProduct";
import { builder } from "../builder";

const WarehouseProductType = builder
  .objectRef<WarehouseProductEntityType>("WarehouseProduct")
  .implement({
    fields: (t) => ({
      warehouseId: t.exposeString("warehouseId"),
      productId: t.exposeString("productId"),
      inventoryCost: t.exposeFloat("inventoryCost"),
      inventoryCount: t.exposeInt("inventoryCount"),
      inventoryValue: t.exposeFloat("inventoryValue"),
    }),
  });

builder.queryFields((t) => ({
  warehouseProduct: t.field({
    type: WarehouseProductType,
    args: {
      warehouseId: t.arg.string({ required: true }),
      productId: t.arg.string({ required: true }),
    },
    resolve: (_, args) =>
      WarehouseProduct.GetWarehouseProduct(args.warehouseId, args.productId),
  }),
  productsInWarehouse: t.field({
    type: [WarehouseProductType],
    args: {
      warehouseId: t.arg.string({ required: true }),
    },
    resolve: (_, args) =>
      WarehouseProduct.GetProductsInWarehouse(args.warehouseId),
  }),
  warehousesForProduct: t.field({
    type: [WarehouseProductType],
    args: {
      productId: t.arg.string({ required: true }),
    },
    resolve: (_, args) =>
      WarehouseProduct.GetWarehousesForProduct(args.productId),
  }),
}));
