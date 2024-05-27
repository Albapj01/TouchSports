import { Reserve } from "../../domain/model/Reserve";
import { TrainerPort } from "../../domain/port/TrainerPort";
import { ReserveDTO } from "../DTOs/ReserveDTO";

export class GetAllReservesUseCase {
  constructor(private trainerPort: TrainerPort) {}

  async run(trainerId: string, centresId: string): Promise<ReserveDTO[]> {
    const trainer = await this.trainerPort.findById(trainerId);
    if (!trainer) {
      return null;
    }

    const centres = trainer.centres.find((centre) => centre.centresId === centresId);
    if (!centres) {
        return null;
    }

    const reserves: Reserve[] = centres.reserves;

    const reserveDTOs: ReserveDTO[] = reserves.map(reserve => ({
      trainerId: trainerId,
      centresId: centresId,
      reserveId: reserve.reserveId,
      name: reserve.name,
      surname: reserve.surname,
      email: reserve.email,
      telephone: reserve.telephone,
      teamId: reserve.teamId,
      material: reserve.material,
      startReserve: reserve.startReserve,
      endReserve: reserve.endReserve,
    }));

    return reserveDTOs;
  }
}
