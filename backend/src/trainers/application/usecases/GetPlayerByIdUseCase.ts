import { TrainerPort } from "../../domain/port/TrainerPort";
import { PlayerDTO } from "../DTOs/PlayerDTO";

export class GetPlayerByIdUseCase {
  constructor(private trainerPort: TrainerPort) {}

  async run(trainerId: string, teamId: string, playerId: string): Promise<PlayerDTO> {

    const player = await this.trainerPort.findByPlayerId(playerId, teamId, trainerId)

    return {
      teamId: teamId,
      playerId: player.playerId,
      name: player.name,
      surname: player.surname,
      email: player.email,
    };
  }
}
