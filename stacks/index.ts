import { App } from "@serverless-stack/resources";
import { Api } from "./Api";
import { Database } from "./Database";
import { InventoryStorage, ProductStorage, WarehouseStorage } from "./Storage";

export default function main(app: App) {
  app.setDefaultFunctionProps({
    runtime: "nodejs16.x",
    srcPath: "services",
  });
  app
    .stack(WarehouseStorage)
    .stack(ProductStorage)
    .stack(InventoryStorage)
    .stack(Database)
    .stack(Api);
}
