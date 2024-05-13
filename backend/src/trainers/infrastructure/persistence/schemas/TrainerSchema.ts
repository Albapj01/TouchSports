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
            teamId: {
              type: String,
            },
            playerId: {
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
          },
        ],
      },
    ],
    imageUrl: {
      type: String,
    },
    centres: [
      {
        trainerId: {
          type: String,
        },
        centresId: {
          type: String,
        },
        name: {
          type: String,
        },
        location: {
          type: String,
        },
        reserves: [
          {
            trainerId: {
              type: String,
            },
            centresId: {
              type: String,
            },
            reserveId: {
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
            teamId: {
              type: String,
            },
            material: {
              type: String,
            },
            date: {
              type: Date,
            },
          },
        ],
        imageUrl: {
          type: String,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Trainer", TrainerSchema);
