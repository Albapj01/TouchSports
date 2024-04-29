import { Team } from "../../domain/model/Team";
import { TrainerPort } from "../../domain/port/TrainerPort";
import { TeamDTO } from "../DTOs/TeamDTO";

export class CreateTeamUseCase {
    constructor(
        private trainerPort: TrainerPort
    ) {}
    //buscar entrenador
    //una vez lo devuelva, en su array de team se añaden

    async run(teamDTO: TeamDTO): Promise<void>{
        const team = new Team(
            teamDTO.trainerId,
            teamDTO.teamId,
            teamDTO.name,
            [],
        )

        await this.trainerPort.saveTeam(team)
    }

}