import { S3Client } from "@aws-sdk/client-s3";
// Set the AWS Region.
const REGION = process.env.AWS_REGION;
// Create an Amazon S3 service client object.
const s3Client = new S3Client({ region: REGION });
const secret = process.env.AWS_SECRET;
const key = process.env.AWS_KEY;
export { s3Client };
