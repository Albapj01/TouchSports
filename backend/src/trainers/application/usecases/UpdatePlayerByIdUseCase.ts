import { Player } from "../../domain/model/Player";
import { TrainerPort } from "../../domain/port/TrainerPort";

export class UpdatePlayerByIdUseCase {
  constructor(private trainerPort: TrainerPort) {}

  async run(trainerId: string, teamId: string, playerId: string, player: Player): Promise<void> {
    const trainer = await this.trainerPort.findById(trainerId);
    if (!trainer) {
      return null;
    }

    const team = await this.trainerPort.findByTeamId(teamId, trainerId)
    if (!team) {
        return null;
    }

    const updatedPlayer = new Player(teamId, playerId, player.name, player.surname, player.email);

    team.players = team.players.filter((player) => player.playerId !== playerId);

    team.players.push(updatedPlayer);
    await this.trainerPort.updatePlayer(team.players, trainerId, teamId);
  }
}
