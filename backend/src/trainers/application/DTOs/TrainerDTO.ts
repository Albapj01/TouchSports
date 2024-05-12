import { CentresDTO } from "./CentresDTO";
import { TeamDTO } from "./TeamDTO";

export interface TrainerDTO {
    trainerId: string,
    name: string,
    surname: string,
    email: string,
    telephone?: string,
    teams: Array<TeamDTO>,
    imageUrl?: string,
    centres: Array<CentresDTO>,
}
