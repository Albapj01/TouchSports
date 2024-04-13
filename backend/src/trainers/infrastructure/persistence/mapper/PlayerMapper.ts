import { Player } from "backend/src/trainers/domain/model/Player";
import { PlayerEntity } from "../entities/PlayerEntity";
import { PlayerSchema } from "../schemas/PlayerSchema";

export class PlayerMapper {
  static toDomain(playerEntity: PlayerEntity): Player {
    return new Player(
      playerEntity.playerId,
      playerEntity.name,
      playerEntity.surname,
      playerEntity.email
    );
  }

  static toEntity(player: Player): typeof PlayerSchema {
    return {
      playerId: player.playerId,
      name: player.name,
      surname: player.surname,
      email: player.email,
    };
  }
}
