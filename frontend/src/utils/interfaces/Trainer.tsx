import { Centres } from "./Centres";
import { Team } from "./Team";

export interface Trainer {
  trainerId: string;
  name: string;
  surname: string;
  email: string;
  telephone: string;
  teams: Team[];
  imageUrl: string;
  centres: Centres[];
}
