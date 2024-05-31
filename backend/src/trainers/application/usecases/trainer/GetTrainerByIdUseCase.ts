import { TrainerPort } from "../../../domain/port/TrainerPort";
import { TrainerDTO } from "../../DTOs/TrainerDTO";

export class GetTrainerByIdUseCase {
  constructor(private trainerPort: TrainerPort) {}

  async run(trainerId: string): Promise<TrainerDTO> {
    const trainer = await this.trainerPort.findById(trainerId);
    if (!trainer) {
      return null;
    }

    return {
      trainerId: trainer.trainerId,
      name: trainer.name,
      surname: trainer.surname,
      email: trainer.email,
      telephone: trainer.telephone,
      teams: trainer.teams,
      imageUrl: trainer.imageUrl,
      centres: trainer.centres,
    };
  }
}
