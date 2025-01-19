const bcrypt = require('bcrypt');
const { s3Client, PARENTS_BUCKET, getJson, uploadJson } = require('../config/awsS3');
const { ListObjectsV2Command } = require('@aws-sdk/client-s3');
const {
  updateParentIndex,
  getParentDataFromIndex
} = require('../models/parentsModel');

exports.parentSignup = async (req, res) => {
  try {
    const { email, username, password, confirmPassword, securityCode } = req.body;

    if (!email || !username || !password || !confirmPassword || !securityCode) {
      return res.status(400).json({ error: 'All fields are required.' });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'Passwords do not match.' });
    }

    const listCommand = new ListObjectsV2Command({ Bucket: PARENTS_BUCKET });
    const listResponse = await s3Client.send(listCommand);

    if (!listResponse.Contents || listResponse.Contents.length === 0) {
      return res.status(404).json({ error: 'No parent records found at all.' });
    }

    const matchingKey = listResponse.Contents.find((obj) =>
      obj.Key.endsWith(`_${securityCode}.json`)
    )?.Key;

    if (!matchingKey) {
      return res.status(404).json({ error: 'No record found for that security code.' });
    }

    let parentData;
    try {
      parentData = await getJson(PARENTS_BUCKET, matchingKey);
    } catch (err) {
      return res.status(404).json({ error: 'Error reading parent file from S3.' });
    }

    if (parentData.username && parentData.passwordHash) {
      return res.status(400).json({ error: 'Parent account already claimed.' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    parentData.username = username;
    parentData.passwordHash = passwordHash;
    parentData.email = email;

    await uploadJson(PARENTS_BUCKET, matchingKey, parentData);

    await updateParentIndex(username, matchingKey);

    return res.json({
      message: 'Parent account created successfully.',
      user: {
        username,
        email,
        role: 'PARENT'
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
};

exports.parentLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required.' });
    }

    const result = await getParentDataFromIndex(username);
    if (!result) {
      return res.status(404).json({ error: 'Parent not found via index.' });
    }

    const { parentData } = result; 

    const match = await bcrypt.compare(password, parentData.passwordHash);
    if (!match) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    return res.json({
      message: 'Login successful!',
      user: {
        username: parentData.username,
        email: parentData.email,
        role: 'PARENT'
      }
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error.' });
  }
};
