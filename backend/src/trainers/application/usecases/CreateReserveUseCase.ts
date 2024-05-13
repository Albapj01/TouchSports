import { Reserve } from "../../domain/model/Reserve";
import { TrainerPort } from "../../domain/port/TrainerPort";
import { ReserveDTO } from "../DTOs/ReserveDTO";

export class CreateReserveUseCase {
  constructor(private trainerPort: TrainerPort) {}

  async run(
    trainerId: string,
    centresId: string,
    reserveDTO: ReserveDTO,
  ): Promise<void> {
    const trainer = await this.trainerPort.findById(trainerId);
    if (!trainer) {
      return null;
    }

    const centres = await this.trainerPort.findByCentresId(centresId, trainerId)
    if (!centres) {
      return null;
    }

    const reserve = new Reserve(
      trainerId,
      centresId,
      reserveDTO.reserveId,
      reserveDTO.name,
      reserveDTO.surname,
      reserveDTO.email,
      reserveDTO.telephone,
      reserveDTO.teamId,
      reserveDTO.material,
      reserveDTO.date
    );
    console.log(reserve);


    centres.reserves.push(reserve);
    await this.trainerPort.saveReserve(reserve, centres, trainer);
  }
}
