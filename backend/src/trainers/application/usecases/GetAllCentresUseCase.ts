import { Centres } from "../../domain/model/Centres";
import { TrainerPort } from "../../domain/port/TrainerPort";
import { CentresDTO } from "../DTOs/CentresDTO";

export class GetAllCentresUseCase {
  constructor(private trainerPort: TrainerPort) {}

  async run(trainerId: string): Promise<CentresDTO[]> {
    const trainer = await this.trainerPort.findById(trainerId);
    if (!trainer) {
      return null;
    }

    const centres: Centres[] = trainer.centres;

    const centresDTOs: CentresDTO[] = centres.map((centre) => ({
      trainerId: trainerId,
      centresId: centre.centresId,
      name: centre.name,
      location: centre.location,
      reserves: centre.reserves,
      imageUrl: centre.imageUrl,
    }));

    return centresDTOs;
  }
}
