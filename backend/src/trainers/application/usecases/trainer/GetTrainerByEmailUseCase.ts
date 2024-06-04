import { TrainerPort } from "../../../domain/port/TrainerPort";
import { TrainerDTO } from "../../DTOs/TrainerDTO";

export class GetTrainerByEmailUseCase {
  constructor(private trainerPort: TrainerPort) {}

  async run(email: string): Promise<TrainerDTO> {
    const trainer = await this.trainerPort.findByEmail(email);
    if (!trainer) {
      return null;
    }

    return {
      trainerId: trainer.trainerId,
      name: trainer.name,
      surname: trainer.surname,
      email: trainer.email,
      teams: trainer.teams,
      imageUrl: trainer.imageUrl,
      centres: trainer.centres,
    };
  }
}
