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

    const team = await this.trainerPort.findByTeamId(teamId, trainerId)
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
    }));

    return playerDTOs;
  }
}
