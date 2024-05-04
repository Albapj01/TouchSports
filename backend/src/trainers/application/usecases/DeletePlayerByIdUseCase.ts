import { TrainerPort } from "../../domain/port/TrainerPort";

export class DeletePlayerByIdUseCase {
  constructor(private trainerPort: TrainerPort) {}

  async run(
    trainerId: string,
    teamId: string,
    playerId: string
  ): Promise<void> {
    const trainer = await this.trainerPort.findById(trainerId);
    if (!trainer) {
      return null;
    }

    const team = await this.trainerPort.findByTeamId(teamId, trainerId);
    if (!team) {
      return null;
    }

    team.players = team.players.filter(
      (player) => player.playerId == playerId
    );
    await this.trainerPort.deletePlayer(team.players, teamId, trainerId);
  }
}
