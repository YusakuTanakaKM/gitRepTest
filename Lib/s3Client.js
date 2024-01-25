
import { s3Client } from "@aws-sdk/client-s3";
// Set the AWS Region.
const REGION = "eu-west-2"; //e.g. "us-east-1"
// Create an Amazon S3 service client object.
const s3Client = new s3ClientClient({ region: REGION });
export { s3Client };
