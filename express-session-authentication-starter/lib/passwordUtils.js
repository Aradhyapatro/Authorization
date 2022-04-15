const crypto = require("crypto");

function validPassword(password, hash, salt) {
  const conHash = crypto
    .pbkdf2Sync(password, salt, 10000, 60, "sha512")
    .toString("hex");
  return hash === conHash;
}

function genPassword(password) {
  let salt = crypto.randomBytes(30).toString("hex");
  let genHash = crypto
    .pbkdf2Sync(password, salt, 10000, 60, "sha512")
    .toString("hex");

  return { salt: salt, hash: genHash };
}

module.exports.validPassword = validPassword;
module.exports.genPassword = genPassword;
