import { TrainerPort } from "../../domain/port/TrainerPort";
import { TeamDTO } from "../DTOs/TeamDTO";

export class GetTeamByIdUseCase {
  constructor(private trainerPort: TrainerPort) {}

  async run(trainerId: string, teamId: string): Promise<TeamDTO> {
    const trainer = await this.trainerPort.findById(trainerId);
    if (!trainer) {
      return null;
    }
    
    const team = trainer.teams.find((team) => team.teamId === teamId);
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
