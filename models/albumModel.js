const mongoose = require("mongoose");
const albumSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: "true",
    },

    description: {
      type: String,
      required: "true",
    },
    year: {
      type: String,

      required: "true",
    },
    file: {
      type: Buffer,
      required: "true",
    },
  },
  { timestamps: true }
);
const albumModel = mongoose.model("Album", albumSchema);

module.exports = albumModel;
