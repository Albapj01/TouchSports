const mongoose = require("mongoose");

export const TrainerSchema = new mongoose.Schema(
  {
    trainerId: {
      type: String,
    },
    name: {
      type: String,
    },
    surname: {
      type: String,
    },
    email: {
      type: String,
    },
    telephone: {
      type: String,
    },
    teams: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Teams",
      },
    ],
    imageUrl: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Trainer", TrainerSchema);
