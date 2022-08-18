import {
  InventoryEntityType,
  SaveInventory,
} from "@inventory-management/repository/inventory";
import { GetProduct, UpdateProduct } from "@inventory-management/repository/product";
import AWS from "aws-sdk";
import { parse } from "csv-parse";

const S3 = new AWS.S3({});

export const handler = (event: any, context: any, callback: any) => {
  const record = event.Records[0].s3;
  const Key = record.object.key;
  const Bucket = record.bucket.name;

  const readStream = S3.getObject({ Bucket, Key })
    .createReadStream()
    .on("error", (e) => {
      console.log(e);
    });

  const parser = getParser();

  readStream.pipe(parser);
};

function getParser() {
  let foundHeader = false;
  const parser = parse({
    delimiter: ",",
  });
  parser.on("readable", async function() {
    let record;
    while ((record = parser.read()) !== null) {
      if (!foundHeader) {
        foundHeader = true;
      } else {
        const warehouseId = record[0].replace("warehouse#", ""); 
        const productId = record[1].replace("product#", "");

        //FIXME - hashmap product so we only have to fetch it once per product
        const product = await GetProduct(productId);
        const inventory: InventoryEntityType = {
          warehouseId: warehouseId,
          productId: productId,
          inventoryCount: Number(record[2]),
          inventoryValue: product.itemPrice * Number(record[2]),
          itemCost: product.itemCost,
          itemPrice: product.itemPrice,
          inventoryCost: product.itemCost * Number(record[2]),
        };
        // FIXME - keep track of total inventory counts, so we can update the product table
        SaveInventory(inventory);
      }
    }
  });
  parser.on("error", function(err) {
    console.error(err.message);
  });
  parser.on("end", function () {
    //FIXME - update the product table with cached values
    console.log("end of stream");
  });
  return parser;
}
