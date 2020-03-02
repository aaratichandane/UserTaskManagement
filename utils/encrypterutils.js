'use strict'

const crypto = require('crypto');
const algorithm = config.ENCRYPTION_ALGORITHM;
const key = config.ENCRYPTION_KEY;
const encryptorUtils = {};

encryptorUtils.encrypt = (plainText)=>{
    const cipher = crypto.createCipher(algorithm, key);  
    return cipher.update(plainText, 'utf8', 'hex') + cipher.final('hex');
}

encryptorUtils.decrypt = (encryptedText)=>{
    const decipher = crypto.createDecipher(algorithm, key);
    return decipher.update(encryptedText, 'hex', 'utf8') + decipher.final('utf8');
}

module.exports = encryptorUtils;