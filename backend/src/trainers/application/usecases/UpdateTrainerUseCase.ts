import { Trainer } from "../../domain/model/Trainer";
import { TrainerPort } from "../../domain/port/TrainerPort";

export class UpdateTrainerUseCase {
    constructor(
        private trainerPort: TrainerPort
    ) {}

    async run(trainerId: string, trainer: Trainer): Promise<void>{

        const oldTrainer = await this.trainerPort.findById(trainerId)
        if (!oldTrainer) {
            return null
        }

        const updateTrainer = new Trainer(
            trainerId,
            trainer.name,
            trainer.surname,
            trainer.email,
            trainer.telephone,
            trainer.teams,
            trainer.imageUrl,
        )

        await this.trainerPort.updateTrainer(oldTrainer, updateTrainer);
    }

}