const mongoose = require("mongoose");

const urlschema = mongoose.Schema(
  {
    shortUrl: {
      type: String,
      required: true,
      unique: true,
    },
    originalUrl: {
      type: String,
      required: true,
    },
    visitHistory: [{ timeStamp: { type: Number } }],
  },
  {
    timeStamps: true,
  }
);

const Url = mongoose.model("url", urlschema);

module.exports = Url;
