import { Product, ProductEntityType } from "@inventory-management/core/product";
import { builder } from "../builder";

const ProductType = builder.objectRef<ProductEntityType>("Product").implement({
  fields: (t) => ({
    id: t.exposeID("id"),
    inventoryCost: t.exposeFloat("inventoryCost"),
    inventoryCount: t.exposeInt("inventoryCount"),
    inventoryValue: t.exposeFloat("inventoryValue"),
    itemCost: t.exposeFloat("itemCost"),
    itemPrice: t.exposeFloat("itemPrice"),
    manufacturer: t.exposeString("manufacturer"),
    name: t.exposeString("name"),
  }),
});

builder.queryFields((t) => ({
  products: t.field({
    type: [ProductType],
    resolve: () => Product.GetProducts(),
  }),
  product: t.field({
    type: ProductType,
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: (_, args) => Product.GetProduct(args.id),
  }),
}));
