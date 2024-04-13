import { Team } from "backend/src/trainers/domain/model/Team";
import { TeamEntity } from "../entities/TeamEntity";
import { TeamSchema } from "../schemas/TeamSchema";

export class TeamMapper {
  static toDomain(teamEntity: TeamEntity): Team {
    return new Team(
      teamEntity.trainerId,
      teamEntity.teamId,
      teamEntity.name,
      teamEntity.players
    );
  }

  static toEntity(team: Team): typeof TeamSchema {
    return {
      trainerId: team.trainerId,
      teamId: team.teamId,
      name: team.name,
      players: team.players,
    };
  }
}
