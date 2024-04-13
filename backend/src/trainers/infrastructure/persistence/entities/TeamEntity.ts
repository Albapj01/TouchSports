import { Document } from "mongoose";
import { PlayerEntity } from "./PlayerEntity";

export interface TeamEntity extends Document {
  trainerId: string;
  teamId: string;
  name: string;
  players: PlayerEntity;
}
