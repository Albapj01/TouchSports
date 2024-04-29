import { Team } from "../../domain/model/Team";
import { TrainerPort } from "../../domain/port/TrainerPort";
import { TeamDTO } from "../DTOs/TeamDTO";

export class CreateTeamUseCase {
    constructor(
        private trainerPort: TrainerPort
    ) {}

    async run(teamId: string, teamDTO: TeamDTO): Promise<void>{
        const oldTeam = await this.trainerPort.findByTeamId(teamId)

        const team = new Team(
            teamDTO.trainerId,
            teamDTO.teamId,
            teamDTO.name,
            [],
        )

        await this.trainerPort.saveTeam(team)
    }

}