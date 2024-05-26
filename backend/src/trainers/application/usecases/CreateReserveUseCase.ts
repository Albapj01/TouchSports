import { Reserve } from "../../domain/model/Reserve";
import { Notifier } from "../../domain/notifier/Notifier";
import { TrainerPort } from "../../domain/port/TrainerPort";
import { ReserveDTO } from "../DTOs/ReserveDTO";
import { GetAllPlayersUseCase } from "./GetAllPlayersUseCase";

export class CreateReserveUseCase {
  constructor(private trainerPort: TrainerPort, private notifier: Notifier) {}

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
      reserveDTO.startReserve,
      reserveDTO.endReserve
    );

    centres.reserves.push(reserve);
    await this.trainerPort.saveReserve(reserve, centres, trainer);

    const team = await this.trainerPort.findByTeamId(reserve.teamId, trainerId);
    if (!team) {
      return null;
    }
    const players = await this.trainerPort.getAllPlayers(trainerId, reserve.teamId)
    await this.notifier.createReserveNotification(players, team, centres, reserve);

  }
}
