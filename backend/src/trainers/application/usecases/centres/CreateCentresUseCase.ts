import { Centres } from "../../../domain/model/Centres";
import { TrainerPort } from "../../../domain/port/TrainerPort";
import { CentresDTO } from "../../DTOs/CentresDTO";

export class CreateCentresUseCase {
  constructor(private trainerPort: TrainerPort) {}

  async run(centresDTO: CentresDTO): Promise<void> {
    const trainer = await this.trainerPort.findById(centresDTO.trainerId);

    if (!trainer) {
      return null;
    }

    const centres = new Centres(
      centresDTO.trainerId,
      centresDTO.centresId,
      centresDTO.name,
      centresDTO.location,
      [],
      centresDTO.imageUrl
    );

    trainer.centres.push(centres);
    await this.trainerPort.saveCentres(centres, trainer);
  }
}
