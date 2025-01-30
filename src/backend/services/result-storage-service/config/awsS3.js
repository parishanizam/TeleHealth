const {
    S3Client,
    GetObjectCommand,
    PutObjectCommand,
    HeadObjectCommand,
  } = require("@aws-sdk/client-s3");
  
  const s3Client = new S3Client({ region: process.env.AWS_REGION });
  const RESULTS_BUCKET = process.env.RESULTS_BUCKET;
  
  /**
   * Check if a file exists in S3 (used for checking if a parent folder exists)
   */
  async function fileExists(bucket, key) {
    try {
      await s3Client.send(new HeadObjectCommand({ Bucket: bucket, Key: key }));
      return true;
    } catch (err) {
      return false;
    }
  }
  
  /**
   * Upload JSON data to S3
   */
  async function uploadJson(bucket, key, data) {
    const params = {
      Bucket: bucket,
      Key: key,
      Body: JSON.stringify(data, null, 2),
      ContentType: "application/json",
    };
    await s3Client.send(new PutObjectCommand(params));
  }
  
  /**
   * Get JSON data from S3 and parse it
   */
  async function getJson(bucket, key) {
    try {
      const response = await s3Client.send(new GetObjectCommand({ Bucket: bucket, Key: key }));
      const bodyString = await streamToString(response.Body);
      return JSON.parse(bodyString);
    } catch (err) {
      return null; 
    }
  }
  
  /**
   * Convert a Node ReadableStream into a string
   */
  function streamToString(stream) {
    return new Promise((resolve, reject) => {
      const chunks = [];
      stream.on("data", (chunk) => chunks.push(chunk));
      stream.on("error", reject);
      stream.on("end", () => {
        resolve(Buffer.concat(chunks).toString("utf-8"));
      });
    });
  }
  
  module.exports = {
    s3Client,
    RESULTS_BUCKET,
    uploadJson,
    getJson,
    fileExists,
  };
  