/**
 * Author: Promish Kandel, Mitchell Weingust, Jasmine Sun-Hu, Parisha Nizam
 * Date: January 19, 2025
 * Purpose: Handles parent signup, login, logout, and account management.
 * It verifies security codes, links parent accounts to clinician records,
 * updates JSON files in S3, and manages parent-related data.
 */

const bcrypt = require("bcrypt");
const {
  s3Client,
  PARENTS_BUCKET,
  CLINICIANS_BUCKET,
  getJson,
  uploadJson,
} = require("../config/awsS3");
const { ListObjectsV2Command } = require("@aws-sdk/client-s3");
const {
  updateParentIndex,
  getParentDataFromIndex,
} = require("../models/parentsModel");
const {
  getClinicianByUsername,
  saveClinicianData,
} = require("../models/cliniciansModel");

exports.parentSignup = async (req, res) => {
  try {
    const { email, username, password, confirmPassword, securityCode } =
      req.body;

    if (!email || !username || !password || !confirmPassword || !securityCode) {
      return res.status(400).json({ error: "All fields are required." });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match." });
    }

    // Check if username is already taken
    const existingParent = await getParentDataFromIndex(username);
    if (existingParent) {
      return res.status(400).json({ error: "Username already taken." });
    }

    // List parent records in S3
    const listCommand = new ListObjectsV2Command({ Bucket: PARENTS_BUCKET });
    const listResponse = await s3Client.send(listCommand);

    if (!listResponse.Contents || listResponse.Contents.length === 0) {
      return res.status(404).json({ error: "No parent records found." });
    }

    // Find the Parent JSON using the securityCode
    const matchingKey = listResponse.Contents.find((obj) =>
      obj.Key.endsWith(`_${securityCode}.json`),
    )?.Key;

    if (!matchingKey) {
      return res
        .status(404)
        .json({ error: "No record found for that security code." });
    }

    // Retrieve Parent JSON
    let parentData;
    try {
      parentData = await getJson(PARENTS_BUCKET, matchingKey);
    } catch (err) {
      return res
        .status(404)
        .json({ error: "Error reading parent file from S3." });
    }

    if (parentData.username && parentData.passwordHash) {
      return res.status(400).json({ error: "Parent account already claimed." });
    }

    // Hash password and update Parent JSON
    const passwordHash = await bcrypt.hash(password, 10);
    parentData.username = username;
    parentData.passwordHash = passwordHash;
    parentData.email = email;

    await uploadJson(PARENTS_BUCKET, matchingKey, parentData);

    await updateParentIndex(username, matchingKey);

    // Update Clinician’s Clients List
    if (parentData.clinicianUsername) {
      const clinicianUsername = parentData.clinicianUsername;
      const clinicianData = await getClinicianByUsername(clinicianUsername);

      if (clinicianData) {
        const clientIndex = clinicianData.clients.findIndex(
          (client) => client.securityCode === securityCode,
        );

        if (clientIndex !== -1) {
          clinicianData.clients[clientIndex].parentUsername = username;
          clinicianData.clients[clientIndex].email = email;
          await saveClinicianData(clinicianData);
        }
      }
    }

    return res.json({
      message: "Parent account created successfully.",
      user: {
        username,
        email,
        role: "PARENT",
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};

exports.parentLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res
        .status(400)
        .json({ error: "Username and password are required." });
    }

    const result = await getParentDataFromIndex(username);
    if (!result) {
      return res.status(404).json({ error: "Parent not found via index." });
    }

    const { parentData } = result;

    const match = await bcrypt.compare(password, parentData.passwordHash);
    if (!match) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    return res.json({
      message: "Login successful!",
      user: {
        username: parentData.username,
        email: parentData.email,
        role: "PARENT",
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error." });
  }
};

exports.parentLogout = async (req, res) => {
  try {
    return res.json({ message: "Logout successful" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
};

exports.getParentAccountDetails = async (req, res) => {
  try {
    const { username } = req.params;
    if (!username) {
      return res.status(400).json({ error: "Username is required." });
    }

    const result = await getParentDataFromIndex(username);
    if (!result) {
      return res.status(404).json({ error: "Parent not found" });
    }

    const { parentData } = result;
    return res.json({ data: parentData });
  } catch (err) {
    console.error("Error fetching parent details:", err);
    return res.status(500).json({ error: "Server error" });
  }
};

exports.confirmParentAccount = async (req, res) => {
  try {
    const { username, newFirstName, newLastName } = req.body;
    if (!username) {
      return res.status(400).json({ error: "Username is required." });
    }

    // Retrieve current parent data from S3 by index
    const result = await getParentDataFromIndex(username);
    if (!result) {
      return res.status(404).json({ error: "Parent not found" });
    }

    const { parentData, fileName } = result;

    if (newFirstName && newFirstName.trim() !== "") {
      parentData.firstName = newFirstName.trim();
    }
    if (newLastName && newLastName.trim() !== "") {
      parentData.lastName = newLastName.trim();
    }
    await uploadJson(PARENTS_BUCKET, fileName, parentData);

    return res.json({
      message: "Account confirmation successful",
      data: parentData,
    });
  } catch (error) {
    console.error("Error in confirmParentAccount:", error);
    return res.status(500).json({ error: "Server error" });
  }
};