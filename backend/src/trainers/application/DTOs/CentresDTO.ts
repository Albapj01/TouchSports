import { ReserveDTO } from "./ReserveDTO";

export interface CentresDTO {
  trainerId: string;
  centresId: string;
  name: string;
  location: string;
  reserves: Array<ReserveDTO>;
  imageUrl: string;
}
