const mongoose = require("mongoose");

const mongooseConnect = async (url) => {
  return mongoose.connect(url);
};

module.exports = mongooseConnect;
