import {
  Warehouse,
  WarehouseEntityType,
} from "@inventory-management/repository/warehouse";
import { builder } from "../builder";

const WarehouseType = builder
  .objectRef<WarehouseEntityType>("Warehouse")
  .implement({
    fields: (t) => ({
      id: t.exposeString("id"),
      phoneNumber: t.exposeString("phoneNumber"),
      address: t.exposeString("address"),
      city: t.exposeString("city"),
      stateAbbreviation: t.exposeString("stateAbbreviation"),
      zipCode: t.exposeString("zipCode"),
      name: t.exposeString("name")
    }),
  });

builder.queryFields((t) => ({
  warehouses: t.field({
    type: [WarehouseType],
    resolve: () => Warehouse.GetWarehouses(),
  }),
  warehouse: t.field({
    type: WarehouseType,
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: (_, args) => Warehouse.GetWarehouse(args.id),
  }),
}));
