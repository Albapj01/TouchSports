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
      trainerEntity.imageUrl,
      trainerEntity.centres,
    );
  }

  static toEntity(trainer: Trainer): typeof TrainerSchema {
    return {
      trainerId: trainer.trainerId,
      name: trainer.name,
      surname: trainer.surname,
      email: trainer.email,
      telephone: trainer.telephone,
      teams: trainer.teams.map((team) => ({
        trainerId: team.trainerId,
        teamId: team.teamId,
        name: team.name,
        players: team.players.map((player) => ({
          trainerId: trainer.trainerId,
          teamId: player.teamId,
          playerId: player.playerId,
          name: player.name,
          surname: player.surname,
          email: player.email,
        })),
      })),
      imageUrl: trainer.imageUrl,
      centres: trainer.centres.map((centre) => ({
        trainerId: centre.trainerId,
        centresId: centre.centresId,
        name: centre.name,
        location: centre.location,
        reserves: centre.reserves.map((reserve) => ({
          trainerId: reserve.trainerId,
          centresId: reserve.centresId,
          reserveId: reserve.reserveId,
          name: reserve.name,
          surname: reserve.surname,
          email: reserve.email,
          telephone: reserve.telephone,
          teamId: reserve.teamId,
          material: reserve.material,
          date: reserve.date,
        })),
      })),
    };
  }
}
