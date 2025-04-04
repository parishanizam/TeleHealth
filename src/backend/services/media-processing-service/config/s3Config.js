/**
 * Author: Promish Kandel, Mitchell Weingust, Jasmine Sun-Hu, Parisha Nizam
 * Date: January 19, 2025
 * Purpose: Provides utility functions for uploading files and JSON data to S3,
 * generating presigned URLs for video access, and determining content types 
 * based on file extensions.
 */

const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const path = require("path");
const fs = require("fs");

const s3Client = new S3Client({ region: process.env.AWS_REGION });

async function uploadToS3(bucketName, key, body, contentType) {
  const params = {
    Bucket: bucketName,
    Key: key,
    Body: body,
    ContentType: contentType,
  };
  await s3Client.send(new PutObjectCommand(params));
}

async function uploadFileToS3(bucketName, filePath, key) {
  const fileStream = fs.createReadStream(filePath);
  const contentType = getContentTypeByExtension(filePath);

  const params = {
    Bucket: bucketName,
    Key: key,
    Body: fileStream,
    ContentType: contentType,
  };
  await s3Client.send(new PutObjectCommand(params));
}

/**
 * Generate a presigned URL that allows downloading or streaming
 * the specified S3 object (i.e., your .mp4 file).
 * Default expiration is 1 hour (3600 seconds).
 */
async function getVideoPresignedUrl(bucketName, key, expiresIn = 3600) {
  const command = new GetObjectCommand({ Bucket: bucketName, Key: key });
  return getSignedUrl(s3Client, command, { expiresIn });
}

function getContentTypeByExtension(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  switch (ext) {
    case ".mp4":
      return "video/mp4";
    case ".json":
      return "application/json";
    default:
      return "application/octet-stream";
  }
}

module.exports = {
  s3Client,
  uploadToS3,
  uploadFileToS3,
  getVideoPresignedUrl,
};