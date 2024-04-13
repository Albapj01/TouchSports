import { Document } from "mongoose";

export interface PlayerEntity extends Document {
  playerId: string;
  name: string;
  surname: string;
  email: string;
}
