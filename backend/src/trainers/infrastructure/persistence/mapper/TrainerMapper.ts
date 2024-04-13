import { TrainerEntity } from "../entities/TrainerEntity";
import { Trainer } from "backend/src/trainers/domain/model/Trainer";
import { TrainerSchema } from "../schemas/TrainerSchema";

export class TrainerMapper {
  static toDomain(trainerEntity: TrainerEntity): Trainer {
    return new Trainer(
      trainerEntity.trainerId,
      trainerEntity.name,
      trainerEntity.surname,
      trainerEntity.email,
      trainerEntity.telephone,
      trainerEntity.teams,
      trainerEntity.imageUrl
    );
  }

  static toEntity(trainer: Trainer): typeof TrainerSchema {
    return {
      trainerId: trainer.trainerId,
      name: trainer.name,
      surname: trainer.surname,
      email: trainer.email,
      telephone: trainer.telephone,
      teams: trainer.teams,
      imageUrl: trainer.imageUrl,
    };
  }
}
