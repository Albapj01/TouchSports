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
      trainerId: string;
      teamId: string;
      playerId: string;
      name: string;
      surname: string;
      email: string;
    }[];
  }[];
  imageUrl: string;
  centres: {
    trainerId: string;
    centresId: string;
    name: string;
    location: string;
    reserves: {
      trainerId: string;
      centresId: string;
      reserveId: string;
      name: string;
      surname: string;
      email: string;
      telephone: string;
      teamId: string;
      material: string;
      startReserve: Date;
      endReserve: Date;
    }[];
    imageUrl: string;
  }[];
}
