import { Document } from "mongoose";

export interface ReserveEntity extends Document {
  reserveId: string;
  name: string;
  surname: string;
  email: string;
  telephone: string;
  meterial: string;
  date: Date;
}
