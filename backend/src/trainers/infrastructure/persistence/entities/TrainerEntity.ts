import { Document } from "mongoose";

export interface TrainerEntity extends Document {
  trainerId: string;
  name: string;
  surname: string;
  email: string;
  telephone: string;
  teams: {
    trainerId: string;
    teamId: string;
    name: string;
    players: {
      playerId: string;
      name: string;
      surname: string;
      email: string;
    }[]
  }[]
  imageUrl: string;
}
