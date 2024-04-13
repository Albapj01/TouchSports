const mongoose = require("mongoose");

export const ReserveSchema = new mongoose.Schema(
  {
    reserveId: {
      type: String,
    },
    name: {
      type: String,
    },
    surname: {
      type: String,
    },
    telephone: {
      type: String,
    },
    material: {
      type: String,
    },
    date: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Reserve", ReserveSchema);
