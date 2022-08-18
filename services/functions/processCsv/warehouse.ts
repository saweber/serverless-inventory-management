import {
  WarehouseEntityType,
  SaveWarehouse,
} from "@inventory-management/repository/warehouse";
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
  parser.on("readable", function() {
    let record;
    while ((record = parser.read()) !== null) {
      if (!foundHeader) {
        foundHeader = true;
      } else {
        const warehouseId = record[0].replace("warehouse#", "");
        const warehouse: WarehouseEntityType = {
          id: warehouseId,
          name: record[1],
          phoneNumber: record[6],
          address: record[2],
          city: record[3],
          stateAbbreviation: record[4],
          zipCode: record[5],
        };
        SaveWarehouse(warehouse);
      }
    }
  });
  parser.on("error", function(err) {
    console.error(err.message);
  });
  parser.on("end", function() {
    console.log("end of stream");
  });
  return parser;
}