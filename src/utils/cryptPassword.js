const bcrypt = require("bcrypt");

async function hashPassword(password) {
  const saltRounds = 10;
  const hash = await bcrypt.hash(password, saltRounds);
  return hash;
}

async function validateUser(password, hash) {
  const response = await bcrypt.compare(password, hash);
  if (response) {
    return true;
  } else {
    return false;
  }
}

module.exports = { hashPassword, validateUser };
