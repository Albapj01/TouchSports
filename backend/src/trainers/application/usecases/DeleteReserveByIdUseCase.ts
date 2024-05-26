import { Notifier } from "../../domain/notifier/Notifier";
import { TrainerPort } from "../../domain/port/TrainerPort";

export class DeleteReserveByIdUseCase {
  constructor(private trainerPort: TrainerPort, private notifier: Notifier) {}

  async run(
    trainerId: string,
    centresId: string,
    reserveId: string
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

    centres.reserves = centres.reserves.filter(
      (reserve) => reserve.reserveId == reserveId
    );
    
    const reserve = await this.trainerPort.findByReserveId(
      reserveId,
      centresId,
      trainerId
    );
    if (!reserve) {
      return null;
    }

    const team = await this.trainerPort.findByTeamId(reserve.teamId, trainerId);
    if (!team) {
      return null;
    }

    const players = await this.trainerPort.getAllPlayers(
      trainerId,
      reserve.teamId
    );
    await this.notifier.deleteReserveNotification(
      players,
      team,
      centres,
      reserve
    );
    await this.trainerPort.deleteReserve(
      centres.reserves,
      centresId,
      trainerId
    );
  }
}
