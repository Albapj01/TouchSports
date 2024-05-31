import { TrainerPort } from "../../../domain/port/TrainerPort";

export class DeleteCentresByIdUseCase {
  constructor(private trainerPort: TrainerPort) {}

  async run(trainerId: string, centresId: string): Promise<void> {
    const trainer = await this.trainerPort.findById(trainerId);

    if (!trainer) {
      return null;
    }

    trainer.centres = trainer.centres.filter(
      (centre) => centre.centresId != centresId
    );
    await this.trainerPort.deleteCentres(trainer.centres, trainerId);
  }
}
