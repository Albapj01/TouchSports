import { TrainerPort } from "../../domain/port/TrainerPort";
import { CentresDTO } from "../DTOs/CentresDTO";

export class GetCentresByIdUseCase {
  constructor(private trainerPort: TrainerPort) {}

  async run(trainerId: string, centresId: string): Promise<CentresDTO> {
    const centres = await this.trainerPort.findByCentresId(centresId, trainerId);
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
