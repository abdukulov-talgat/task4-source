const crypto = require('crypto');
const {User} = require("./models");


const getHash = (input) => {
  const hash = crypto.createHash('sha3-256');
  return hash.update(input, 'utf8').digest('hex');
}


const isValidEmail = (email) => {
  return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,8})+$/.test(email)
}

const b64EncodeUnicode = (str) => {
  return btoa(encodeURIComponent(str));
}

const unicodeDecodeB64 = (str) => {
  return decodeURIComponent(atob(str));
}

const isCorrectToken = async (token) => {
  const email = unicodeDecodeB64(token);
  const user = await User.findOne({
    where: {
      email: email
    }
  });
  return Boolean(user && !user.isBanned);
}

module.exports = {getHash, isValidEmail, b64EncodeUnicode, unicodeDecodeB64, isCorrectToken}
