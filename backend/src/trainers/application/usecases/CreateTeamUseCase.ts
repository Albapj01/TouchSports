import { Team } from "../../domain/model/Team";
import { TrainerPort } from "../../domain/port/TrainerPort";
import { TeamDTO } from "../DTOs/TeamDTO";

export class CreateTeamUseCase {
    constructor(
        private trainerPort: TrainerPort
    ) {}

    async run(teamDTO: TeamDTO): Promise<void>{
        const trainer = await this.trainerPort.findById(
          teamDTO.trainerId,
        )

        if(!trainer){
          return null;
        }

        const team = new Team(
            teamDTO.trainerId,
            teamDTO.teamId,
            teamDTO.name,
            [],
        )

        trainer.teams.push(team);
        await this.trainerPort.saveTeam(team, trainer)
    }

}