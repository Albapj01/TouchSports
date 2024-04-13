import { ReserveEntity } from "../entities/ReserveEntity";
import { Reserve } from "backend/src/trainers/domain/model/Reserve";
import { ReserveSchema } from "../schemas/ReserveSchema";

export class ReserveMapper {
  static toDomain(reserveEntity: ReserveEntity): Reserve {
    return new Reserve(
      reserveEntity.reserveId,
      reserveEntity.name,
      reserveEntity.surname,
      reserveEntity.email,
      reserveEntity.telephone,
      reserveEntity.meterial,
      reserveEntity.date
    );
  }

  static toEntity(reserve: Reserve): typeof ReserveSchema {
    return {
      rewserveId: reserve.reserveId,
      name: reserve.name,
      surname: reserve.surname,
      email: reserve.email,
      telephone: reserve.telephone,
      material: reserve.meterial,
      date: reserve.date,
    };
  }
}
