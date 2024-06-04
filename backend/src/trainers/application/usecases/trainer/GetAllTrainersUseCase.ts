import { Trainer } from "../../../domain/model/Trainer";
import { TrainerPort } from "../../../domain/port/TrainerPort";
import { TrainerDTO } from "../../DTOs/TrainerDTO";

export class GetAllTrainersUseCase {
  constructor(private trainerPort: TrainerPort) {}

  async run(): Promise<TrainerDTO[]> {
    const trainers: Trainer[] = await this.trainerPort.getAllTrainers();

    const trainersDTOs: TrainerDTO[] = trainers.map((trainer) => ({
      trainerId: trainer.trainerId,
      name: trainer.name,
      surname: trainer.surname,
      email: trainer.email,
      teams: trainer.teams,
      imageUrl: trainer.imageUrl,
      centres: trainer.centres,
    }));

    return trainersDTOs;
  }
}
