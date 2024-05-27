import { TrainerPort } from "../../domain/port/TrainerPort";
import { PlayerDTO } from "../DTOs/PlayerDTO";

export class GetPlayerByEmailUseCase {
  constructor(private trainerPort: TrainerPort) {}

  async run(trainerId: string, teamId: string, email: string): Promise<PlayerDTO> {

    const team = await this.trainerPort.findByTeamId(teamId, trainerId);
    if (!team) {
      return null;
    }

    const player = team.players.find((player) => player.email === email);
    if (!player) {
      return null;
    }

    console.log(player);
    return {
      trainerId: player.trainerId,
      teamId: player.teamId,
      playerId: player.playerId,
      name: player.name,
      surname: player.surname,
      email: player.email,
      imageUrl: player.imageUrl,
      diet: player.diet,
      technicalTraining: player.technicalTraining,
      physicalTraining: player.physicalTraining,
      improvements: player.improvements,
    };
  }
}
