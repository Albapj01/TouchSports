import { TrainerPort } from "../../domain/port/TrainerPort";
import { CentresDTO } from "../DTOs/CentresDTO";

export class GetCentresByIdUseCase {
  constructor(private trainerPort: TrainerPort) {}

  async run(trainerId: string, centresId: string): Promise<CentresDTO> {
    const trainer = await this.trainerPort.findById(trainerId);
    if (!trainer) {
      return null;
    }
    
    const centres = trainer.centres.find((centre) => centre.centresId === centresId);
    if (!centres) {
      return null;
    }
    
    return {
      trainerId: centres.trainerId,
      centresId: centres.centresId,
      name: centres.name,
      location: centres.location,
      reserves: centres.reserves,
      imageUrl: centres.imageUrl,
    };
  }
}
