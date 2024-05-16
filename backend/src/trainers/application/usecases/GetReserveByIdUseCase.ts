import { TrainerPort } from "../../domain/port/TrainerPort";
import { ReserveDTO } from "../DTOs/ReserveDTO";

export class GetReserveByIdUseCase {
  constructor(private trainerPort: TrainerPort) {}

  async run(trainerId: string, centresId: string, reserveId: string): Promise<ReserveDTO> {

    const reserve = await this.trainerPort.findByReserveId(reserveId, centresId, trainerId)
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
      date: reserve.date,
    };
  }
}
