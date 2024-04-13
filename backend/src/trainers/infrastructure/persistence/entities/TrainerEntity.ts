import { Document } from "mongoose";
import { TeamEntity } from "./TeamEntity";

export interface TrainerEntity extends Document {
  trainerId: string;
  name: string;
  surname: string;
  email: string;
  telephone: string;
  teams: TeamEntity;
  imageUrl: string;
}
