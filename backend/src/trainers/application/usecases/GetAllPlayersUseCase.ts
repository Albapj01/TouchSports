import { Player } from "../../domain/model/Player";
import { TrainerPort } from "../../domain/port/TrainerPort";
import { PlayerDTO } from "../DTOs/PlayerDTO";

export class GetAllPlayersUseCase {
  constructor(private trainerPort: TrainerPort) {}

  async run(trainerId: string, teamId: string): Promise<PlayerDTO[]> {
    const trainer = await this.trainerPort.findById(trainerId);
    if (!trainer) {
      return null;
    }

    const team = trainer.teams.find((team) => team.teamId === teamId);
    if (!team) {
        return null;
    }

    const players: Player[] = team.players;

    const playerDTOs: PlayerDTO[] = players.map(player => ({
      trainerId: trainerId,
      teamId: teamId,
      playerId: player.playerId,
      name: player.name,
      surname: player.surname,
      email: player.email,
      imageUrl: player.imageUrl,
      diet: player.diet,
      technicalTraining: player.technicalTraining,
      physicalTraining: player.physicalTraining,
      improvements: player.improvements,
    }));

    return playerDTOs;
  }
}
