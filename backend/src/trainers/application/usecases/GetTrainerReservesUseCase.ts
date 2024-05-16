import { TrainerPort } from "../../domain/port/TrainerPort";
import { ReserveDTO } from "../DTOs/ReserveDTO";

export class GetTrainerReservesUseCase {
  constructor(private trainerPort: TrainerPort) {}

  async run(trainerId: string): Promise<ReserveDTO[]> {
    const trainer = await this.trainerPort.findById(trainerId);
    if (!trainer) {
      return null;
    }

    const reserves = [];

    trainer.centres.forEach((centre) => {
      centre.reserves.forEach((reserve) => {
        if (reserve.trainerId === trainerId) {
          reserves.push(reserve);
        }
      });
    });

    return reserves;
  }
}
