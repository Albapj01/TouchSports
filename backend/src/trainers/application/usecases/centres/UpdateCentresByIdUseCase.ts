import { Centres } from "../../../domain/model/Centres";
import { Team } from "../../../domain/model/Team";
import { TrainerPort } from "../../../domain/port/TrainerPort";

export class UpdateCentresByIdUseCase {
  constructor(private trainerPort: TrainerPort) {}

  async run(
    trainerId: string,
    centresId: string,
    centres: Centres
  ): Promise<void> {
    const trainer = await this.trainerPort.findById(trainerId);
    if (!trainer) {
      return null;
    }

    const existingCentre = trainer.centres.find(centre => centre.centresId === centresId);
    if (!existingCentre) {
      throw new Error("Centre not found"); 
    }

    const updatedCentres = new Centres(
      trainerId,
      centresId,
      centres.name,
      centres.location,
      centres.reserves,
      centres.imageUrl
    );

    trainer.centres = trainer.centres.filter(
      (centre) => centre.centresId !== centresId
    );

    trainer.centres.push(updatedCentres);
    await this.trainerPort.updateCentres(trainer.centres, trainerId);
  }
}
