import { Player } from "../../domain/model/Player";
import { Notifier } from "../../domain/notifier/Notifier";
import { TrainerPort } from "../../domain/port/TrainerPort";

export class UpdatePlayerByIdUseCase {
  constructor(private trainerPort: TrainerPort, private notifier: Notifier) {}

  async run(
    trainerId: string,
    teamId: string,
    playerId: string,
    player: Player
  ): Promise<void> {
    const trainer = await this.trainerPort.findById(trainerId);
    if (!trainer) {
      return null;
    }

    const team = trainer.teams.find((team) => team.teamId === teamId);
    if (!team) {
      return null;
    }

    const updatedPlayer = new Player(
      trainerId,
      teamId,
      playerId,
      player.name,
      player.surname,
      player.telephone,
      player.email,
      player.imageUrl,
      player.diet,
      player.technicalTraining,
      player.physicalTraining,
      player.improvements
    );

    team.players = team.players.filter(
      (player) => player.playerId !== playerId
    );

    team.players.push(updatedPlayer);
    await this.trainerPort.updatePlayer(team.players, trainerId, teamId);
    await this.notifier.updatePlayerNotification(updatedPlayer, team, trainer);
  }
}
