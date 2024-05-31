import { Trainer } from "../../../domain/model/Trainer";
import { TrainerPort } from "../../../domain/port/TrainerPort";
import { PlayerDTO } from "../../DTOs/PlayerDTO";

export class GetPlayerByEmailUseCase {
  constructor(private trainerPort: TrainerPort) {}

  async run(trainerEmail: string, playerEmail: string): Promise<PlayerDTO> {
    const trainers = await this.trainerPort.getAllTrainers();
    if (!trainers) {
      return null;
    }

    let matchingTrainer: Trainer | null = null;
    for (const trainer of trainers) {
      if (trainer.email === trainerEmail) {
        matchingTrainer = trainer;
        break;
      }
    }

    let obtainedPlayer;
    if (matchingTrainer) {
      const teams = matchingTrainer.teams;
      for (const team of teams) {
        for (const player of team.players) {
          if (player.email == playerEmail) {
            obtainedPlayer = player;
          }
        }
      }
    } else {
      console.log("Trainer not found");
    }

    return obtainedPlayer;
  }
}
