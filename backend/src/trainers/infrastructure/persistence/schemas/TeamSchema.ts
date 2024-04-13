const mongoose = require("mongoose");

export const TeamSchema = new mongoose.Schema(
  {
    trainerId: {
      type: String,
    },
    teamId: {
      type: String,
    },
    name: {
      type: String,
    },
    players: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Player",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Team", TeamSchema);
