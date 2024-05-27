import { TrainerPort } from "../../domain/port/TrainerPort";
import { ReserveDTO } from "../DTOs/ReserveDTO";

export class GetReserveByIdUseCase {
  constructor(private trainerPort: TrainerPort) {}

  async run(trainerId: string, centresId: string, reserveId: string): Promise<ReserveDTO> {
    const trainer = await this.trainerPort.findById(trainerId);
    if (!trainer) {
      return null;
    }

    const centres = trainer.centres.find((centre) => centre.centresId === centresId);
    if (!centres) {
      return null;
    }

    const reserve = centres.reserves.find((reserve) => reserve.reserveId === reserveId);
    if (!reserve) {
      return null;
    }
    
    return {
      trainerId: reserve.trainerId,
      centresId: reserve.centresId,
      reserveId: reserve.reserveId,
      name: reserve.name,
      surname: reserve.surname,
      email: reserve.email,
      telephone: reserve.telephone,
      teamId: reserve.teamId,
      material: reserve.material,
      startReserve: reserve.startReserve,
      endReserve: reserve.endReserve,
    };
  }
}
