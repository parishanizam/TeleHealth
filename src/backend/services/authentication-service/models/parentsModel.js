const { 
    PARENTS_BUCKET, 
    uploadJson, 
    getJson 
  } = require('../config/awsS3');
  const bcrypt = require('bcrypt');
  
  async function createParent(username, email, passwordHash, extraData = {}) {
    const key = `${username}.json`;
    const data = {
      username,
      email,
      passwordHash,
      role: 'PARENT',
      ...extraData
    };
  
    await uploadJson(PARENTS_BUCKET, key, data);
    return data;
  }
  
  async function getParentByUsername(username) {
    const key = `${username}.json`;
    try {
      return await getJson(PARENTS_BUCKET, key);
    } catch (err) {
      return null;
    }
  }
  
  async function saveParentData(parentData) {
    const key = `${parentData.username}.json`;
    await uploadJson(PARENTS_BUCKET, key, parentData);
  }
  
  module.exports = {
    createParent,
    getParentByUsername,
    saveParentData
  };
  