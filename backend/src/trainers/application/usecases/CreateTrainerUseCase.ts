import { Trainer } from "../../domain/model/Trainer";
import { TrainerPort } from "../../domain/port/TrainerPort";
import { TrainerDTO } from "../DTOs/TrainerDTO";

export class CreateTrainerUseCase {
    constructor(
        private trainerPort: TrainerPort
    ) {}

    async run(trainerDTO: TrainerDTO): Promise<void>{
        const trainer = new Trainer(
            trainerDTO.trainerId,
            trainerDTO.name,
            trainerDTO.surname,
            trainerDTO.email,
            trainerDTO.telephone,
            [],
            trainerDTO.imageUrl,
            [],
        )

        await this.trainerPort.saveTrainer(trainer)
    }

}