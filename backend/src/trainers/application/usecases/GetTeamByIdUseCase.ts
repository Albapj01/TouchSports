import { TrainerPort } from "../../domain/port/TrainerPort";
import { TeamDTO } from "../DTOs/TeamDTO";

export class GetTeamByIdUseCase {
  constructor(private trainerPort: TrainerPort) {}

  async run(trainerId: string, teamId: string): Promise<TeamDTO> {
    const team = await this.trainerPort.findByTeamId(teamId, trainerId);
    if (!team) {
      return null;
    }
    
    return {
      trainerId: team.trainerId,
      teamId: team.teamId,
      name: team.name,
      players: team.players,
    };
  }
}
