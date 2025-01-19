// config/awsS3.js
const AWS = require('aws-sdk');

// Make sure these environment variables are set in your .env
// AWS_ACCESS_KEY_ID=xxxxx
// AWS_SECRET_ACCESS_KEY=xxxxx
// AWS_REGION=us-east-1 (or your region)

const s3 = new AWS.S3({
  region: process.env.AWS_REGION,
  // credentials come from environment variables by default if set
});

// We'll read these bucket names from environment variables
const CLINICIANS_BUCKET = process.env.CLINICIANS_BUCKET;
const PARENTS_BUCKET = process.env.PARENTS_BUCKET;

// Helper to upload JSON data to S3
async function uploadJson(bucketName, key, data) {
  const params = {
    Bucket: bucketName,
    Key: key,
    Body: JSON.stringify(data),
    ContentType: 'application/json',
  };
  await s3.putObject(params).promise();
}

// Helper to fetch JSON data from S3
async function getJson(bucketName, key) {
  const params = { Bucket: bucketName, Key: key };
  const obj = await s3.getObject(params).promise();
  return JSON.parse(obj.Body.toString('utf-8'));
}

module.exports = {
  s3,
  CLINICIANS_BUCKET,
  PARENTS_BUCKET,
  uploadJson,
  getJson,
};
