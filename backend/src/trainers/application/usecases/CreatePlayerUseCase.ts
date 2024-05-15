import { Player } from "../../domain/model/Player";
import { TrainerPort } from "../../domain/port/TrainerPort";
import { PlayerDTO } from "../DTOs/PlayerDTO";

export class CreatePalyerUseCase {
  constructor(private trainerPort: TrainerPort) {}

  async run(
    trainerId: string,
    teamId: string,
    playerDTO: PlayerDTO
  ): Promise<void> {
    const trainer = await this.trainerPort.findById(trainerId);
    if (!trainer) {
      return null;
    }

    const team = await this.trainerPort.findByTeamId(teamId, trainerId)
    if (!team) {
      return null;
    }

    const player = new Player(
      trainerId,
      teamId,
      playerDTO.playerId,
      playerDTO.name,
      playerDTO.surname,
      playerDTO.email
    );


    team.players.push(player);
    await this.trainerPort.savePlayer(player, team, trainer);
  }
}
