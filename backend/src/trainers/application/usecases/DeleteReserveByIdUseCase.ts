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

    const centres = trainer.centres.find((centre) => centre.centresId === centresId);
    if (!centres) {
      return null;
    }

    centres.reserves = centres.reserves.filter(
      (reserve) => reserve.reserveId == reserveId
    );
    
    const reserve = centres.reserves.find((reserve) => reserve.reserveId === reserveId);
    if (!reserve) {
      return null;
    }

    const team = trainer.teams.find((team) => team.teamId === reserve.teamId);
    if (!team) {
      return null;
    }

    const players = await this.trainerPort.getAllPlayers(
      trainer,
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
