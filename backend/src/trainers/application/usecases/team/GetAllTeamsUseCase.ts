import { Team } from "../../../domain/model/Team";
import { TrainerPort } from "../../../domain/port/TrainerPort";
import { TeamDTO } from "../../DTOs/TeamDTO";

export class GetAllTeamsUseCase {
  constructor(private trainerPort: TrainerPort) {}

  async run(trainerId: string): Promise<TeamDTO[]> {
    const trainer = await this.trainerPort.findById(trainerId);
    if (!trainer) {
      return null;
    }

    const teams: Team[] = trainer.teams;

    const teamDTOs: TeamDTO[] = teams.map((team) => ({
      trainerId: trainerId,
      teamId: team.teamId,
      name: team.name,
      players: team.players,
    }));

    return teamDTOs;
  }
}
