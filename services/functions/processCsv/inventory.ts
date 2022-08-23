import {
  InventoryEntityType,
  SaveInventory
} from "@inventory-management/repository/inventory";
import {
  GetProduct,
  UpdateProduct
} from "@inventory-management/repository/product";
import AWS from "aws-sdk";
import { parse } from "csv-parse";

const S3 = new AWS.S3({});

export const handler = (event: any, context: any, callback: any) => {
  const record = event.Records[0].s3;
  const Key = record.object.key;
  const Bucket = record.bucket.name;

  const readStream = S3.getObject({ Bucket, Key })
    .createReadStream()
    .on("error", e => {
      console.log(e);
    });

  const parser = getParser();

  readStream.pipe(parser);
};

function getParser() {
  let foundHeader = false;
  let productCounts: any = {};
  const parser = parse({
    delimiter: ","
  });
  parser.on("readable", async function() {
    let record;
    while ((record = parser.read()) !== null) {
      if (!foundHeader) {
        foundHeader = true;
      } else {
        const warehouseId = record[0].replace("warehouse#", "");
        const productId = record[1].replace("product#", "");
        const count = Number(record[2]);

        //FIXME - hashmap product so we only have to fetch it once per product
        const product = await GetProduct(productId);

        const inventory: InventoryEntityType = {
          warehouseId: warehouseId,
          productId: productId,
          inventoryCount: count,
          inventoryValue: product.itemPrice * count,
          itemCost: product.itemCost,
          itemPrice: product.itemPrice,
          inventoryCost: product.itemCost * count
        };
        if (productCounts[productId]) {
          productCounts[productId].inventoryCount += inventory.inventoryCount;
        } else {
          productCounts[productId] = {
            inventoryCount: inventory.inventoryCount,
            itemCost: product.itemCost,
            itemValue: product.itemPrice
          };
        }
        SaveInventory(inventory);
      }
    }
  });
  parser.on("error", function(err) {
    console.error(err.message);
  });
  parser.on("end", function() {
    for (let productId of Object.keys(productCounts)) {
      const cost =
        productCounts[productId].itemCost *
        productCounts[productId].inventoryCount;
      const value =
        productCounts[productId].itemValue *
        productCounts[productId].inventoryCount;
      UpdateProduct(
        productId,
        cost,
        productCounts[productId].inventoryCount,
        value
      );
    }
    console.log("end of stream");
  });
  return parser;
}
