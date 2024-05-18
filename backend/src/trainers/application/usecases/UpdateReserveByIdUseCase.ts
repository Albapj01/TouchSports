import { Reserve } from "../../domain/model/Reserve";
import { TrainerPort } from "../../domain/port/TrainerPort";

export class UpdateReserveByIdUseCase {
  constructor(private trainerPort: TrainerPort) {}

  async run(
    trainerId: string,
    centresId: string,
    reserveId: string,
    reserve: Reserve
  ): Promise<void> {
    const trainer = await this.trainerPort.findById(trainerId);
    if (!trainer) {
      return null;
    }

    const centres = await this.trainerPort.findByCentresId(
      centresId,
      trainerId
    );
    if (!centres) {
      return null;
    }

    const updatedReserve = new Reserve(
      trainerId,
      centresId,
      reserveId,
      reserve.name,
      reserve.surname,
      reserve.email,
      reserve.telephone,
      reserve.teamId,
      reserve.material,
      reserve.startReserve,
      reserve.endReserve
    );

    centres.reserves = centres.reserves.filter(
      (reserve) => reserve.reserveId !== reserveId
    );

    centres.reserves.push(updatedReserve);
    await this.trainerPort.updateReserve(centres.reserves, trainerId, centresId);
  }
}
