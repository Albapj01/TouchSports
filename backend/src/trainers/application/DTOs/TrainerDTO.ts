import { TeamDTO } from "./TeamDTO";

export interface TrainerDTO {
    trainerId: string,
    name: string,
    surname: string,
    email: string,
    telephone?: string,
    teams: TeamDTO,
    imageUrl?: string
    //reservas
}
