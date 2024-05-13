import { TrainerPort } from "../../domain/port/TrainerPort";

export class DeleteReserveByIdUseCase {
  constructor(private trainerPort: TrainerPort) {}

  async run(
    trainerId: string,
    centresId: string,
    reserveId: string
  ): Promise<void> {
    const trainer = await this.trainerPort.findById(trainerId);
    if (!trainer) {
      return null;
    }

    const centres = await this.trainerPort.findByCentresId(centresId, trainerId);
    if (!centres) {
      return null;
    }

    centres.reserves = centres.reserves.filter(
      (reserve) => reserve.reserveId == reserveId
    );
    await this.trainerPort.deleteReserve(centres.reserves, centresId, trainerId);
  }
}
