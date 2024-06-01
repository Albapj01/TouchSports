import { Player } from "../../../domain/model/Player";
import { NotifierPort } from "../../../domain/notifier/NotifierPort";
import { TrainerPort } from "../../../domain/port/TrainerPort";
import { PlayerDTO } from "../../DTOs/PlayerDTO";

export class CreatePlayerUseCase {
  constructor(private trainerPort: TrainerPort, private notifier: NotifierPort) {}

  async run(
    trainerId: string,
    teamId: string,
    playerDTO: PlayerDTO
  ): Promise<void> {
    const trainer = await this.trainerPort.findById(trainerId);
    if (!trainer) {
      return null;
    }

    const team = trainer.teams.find((team) => team.teamId === teamId);
    if (!team) {
      throw new Error("Team not found"); 
    }

    const player = new Player(
      trainerId,
      teamId,
      playerDTO.playerId,
      playerDTO.name,
      playerDTO.surname,
      playerDTO.telephone,
      playerDTO.email,
      playerDTO.imageUrl,
      playerDTO.diet,
      playerDTO.technicalTraining,
      playerDTO.physicalTraining,
      playerDTO.improvements
    );

    team.players.push(player);
    await this.trainerPort.savePlayer(player, team, trainer);
    await this.notifier.createPlayerNotification(player, team, trainer);
  }
}
