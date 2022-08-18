import { ProductEntityType, SaveProduct } from "@inventory-management/repository/product";
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
  parser.on("readable", function () {
    let record;
    while ((record = parser.read()) !== null) {
      if (!foundHeader) {
        foundHeader = true;
      } else {
        const productId = record[0].replace('product#', '');
        const product: ProductEntityType = {
          id: productId,
          itemCost: Number(record[3]),
          itemPrice: Number(record[4]),
          manufacturer: record[2],
          name: record[1],
        };
        SaveProduct(product);
      }
    }
  });
  parser.on("error", function (err) {
    console.error(err.message);
  });
  parser.on("end", function () {
    console.log("end of stream");
  });
  return parser;
}

