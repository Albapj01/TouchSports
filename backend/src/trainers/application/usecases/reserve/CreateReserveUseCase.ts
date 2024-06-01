import { Reserve } from "../../../domain/model/Reserve";
import { NotifierPort } from "../../../domain/notifier/NotifierPort";
import { TrainerPort } from "../../../domain/port/TrainerPort";
import { ReserveDTO } from "../../DTOs/ReserveDTO";

export class CreateReserveUseCase {
  constructor(private trainerPort: TrainerPort, private notifier: NotifierPort) {}

  async run(
    trainerId: string,
    centresId: string,
    reserveDTO: ReserveDTO
  ): Promise<void> {
    const trainer = await this.trainerPort.findById(trainerId);
    if (!trainer) {
      return null;
    }

    const centres = trainer.centres.find(
      (centre) => centre.centresId === centresId
    );
    if (!centres) {
      throw new Error("Centre not found"); 
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

    const team = trainer.teams.find((team) => team.teamId === reserve.teamId);
    if (!team) {
      return null; 
    }

    const players = await this.trainerPort.getAllPlayers(
      trainer,
      reserve.teamId
    );
    await this.notifier.createReserveNotification(
      players,
      team,
      centres,
      reserve
    );
  }
}
