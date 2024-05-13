import { Team } from "backend/src/trainers/domain/model/Team";
import { TrainerEntity } from "../entities/TrainerEntity";
import { Model } from "mongoose";
import { TrainerPort } from "backend/src/trainers/domain/port/TrainerPort";
import { Player } from "backend/src/trainers/domain/model/Player";
import { Reserve } from "backend/src/trainers/domain/model/Reserve";
import { Trainer } from "backend/src/trainers/domain/model/Trainer";
import { TrainerDTO } from "backend/src/trainers/application/DTOs/TrainerDTO";
import { TrainerMapper } from "../mapper/TrainerMapper";
import { TeamDTO } from "backend/src/trainers/application/DTOs/TeamDTO";
import { Centres } from "backend/src/trainers/domain/model/Centres";

export class MongoTrainerAdapter implements TrainerPort {
  private model: Model<TrainerEntity>;

  constructor() {
    this.model = require("backend/src/trainers/infrastructure/persistence/schemas/TrainerSchema.ts");
  }
  async updateTrainer(
    oldTrainer: Trainer,
    updateTrainer: Trainer
  ): Promise<void> {
    await this.model.updateOne(
      { trainerId: updateTrainer.trainerId },
      { $set: TrainerMapper.toEntity(updateTrainer) }
    );
  }
  async findByTeamId(teamId: string, trainerId: string): Promise<Team> {
    const trainer = await this.model.findOne({ trainerId });
    if (trainer) {
      const team = trainer.teams.find((team) => team.teamId === teamId);
      return team;
    }
    return null;
  }
  async findByPlayerId(
    playerId: string,
    teamId: string,
    trainerId: string
  ): Promise<Player> {
    const trainer = await this.model.findOne({ trainerId });
    if (trainer) {
      const team = trainer.teams.find((team) => team.teamId === teamId);
      if (team) {
        const player = team.players.find(
          (player) => player.playerId === playerId
        );
        return player;
      }
    }
    return null;
  }
  async findByCentresId(centresId: string, trainerId: string): Promise<Centres> {
    const trainer = await this.model.findOne({ trainerId });
    if (trainer) {
      const centres = trainer.centres.find((centre) => centre.centresId === centresId);
      return centres;
    }
    return null;
  }
  async findById(trainerId: string): Promise<Trainer> {
    const trainer = await this.model.findOne({ trainerId: trainerId });
    return TrainerMapper.toDomain(trainer);
  }
  async saveTrainer(trainer: Trainer): Promise<void> {
    await this.model.create(TrainerMapper.toEntity(trainer));
  }
  async deleteTeam(team: Team[], trainerId: string): Promise<void> {
    await this.model.findOneAndUpdate(
      { trainerId: trainerId },
      { $set: { teams: team } }
    );
  }
  async saveTeam(team: Team, trainer: Trainer): Promise<void> {
    await this.model.findOneAndUpdate(
      { trainerId: team.trainerId },
      { $set: { teams: trainer.teams } }
    );
  }
  async updateTeam(team: Team[], trainerId: string): Promise<void> {
    await this.model.findOneAndUpdate(
      { trainerId: trainerId },
      { $set: { teams: team } }
    );
  }
  async getAllTeams(trainerId: string): Promise<Team[]> {
    const trainer = await this.model.findOne({ trainerId: trainerId });
    const domainTrainer = TrainerMapper.toDomain(trainer);
    return domainTrainer.teams;
  }
  async deletePlayer(
    players: Player[],
    teamId: string,
    trainerId: string
  ): Promise<void> {
    await this.model.findOneAndUpdate(
      { trainerId: trainerId, "teams.teamId": teamId },
      {
        $pull: {
          "teams.$.players": {
            playerId: { $in: players.map((player) => player.playerId) },
          },
        },
      }
    );
  }
  async savePlayer(
    player: Player,
    team: Team,
    trainer: Trainer
  ): Promise<void> {
    await this.model.findOneAndUpdate(
      { trainerId: team.trainerId, "teams.teamId": team.teamId },
      { $push: { "teams.$.players": player } }
    );
  }
  async updatePlayer(
    players: Player[],
    trainerId: string,
    teamId: string
  ): Promise<void> {
    await this.model.findOneAndUpdate(
      { trainerId: trainerId, "teams.teamId": teamId },
      { $set: { "teams.$.players": players } }
    );
  }
  async getAllPlayers(trainerId: string, teamId: string): Promise<Player[]> {
    const trainer = await this.model.findOne({ trainerId: trainerId });
    const domainTrainer = TrainerMapper.toDomain(trainer);
    const team = domainTrainer.teams.find((team) => team.teamId === teamId);
    return team.players;
  }
  async saveCentres(centres: Centres, trainer: Trainer): Promise<void> {
    await this.model.findOneAndUpdate(
      { trainerId: centres.trainerId },
      { $set: { centres: trainer.centres } }
    );
  }
  async updateCentres(centres: Centres[], trainerId: string): Promise<void> {
    await this.model.findOneAndUpdate(
      { trainerId: trainerId },
      { $set: { centres: centres } }
    );
  }
  async getAllCentres(trainerId: string): Promise<Centres[]> {
    const trainer = await this.model.findOne({ trainerId: trainerId });
    const domainTrainer = TrainerMapper.toDomain(trainer);
    return domainTrainer.centres;
  }
  async deleteCentres(centres: Centres[], trainerId: string): Promise<void> {
    await this.model.findOneAndUpdate(
      { trainerId: trainerId },
      { $set: { centres: centres } }
    );
  }
  async saveReserve(reserve: Reserve,
    centre: Centres,
    trainer: Trainer
  ): Promise<void> {
    await this.model.findOneAndUpdate(
      { trainerId: centre.trainerId, "centres.centresId": centre.centresId },
      { $push: { "centres.$.reserves": reserve } }
    );
  }
  async updateReserve(
    reserves: Reserve[],
    trainerId: string,
    centresId: string
  ): Promise<void> {
    await this.model.findOneAndUpdate(
      { trainerId: trainerId, "centres.centresId": centresId },
      { $set: { "centres.$.reserves": reserves } }
    );
  }
  async getAllReserves(trainerId: string, centresId: string): Promise<Reserve[]> {
    const trainer = await this.model.findOne({ trainerId: trainerId });
    const domainTrainer = TrainerMapper.toDomain(trainer);
    const centres = domainTrainer.centres.find((centre) => centre.centresId === centresId);
    return centres.reserves;
  }
  async deleteReserve(
    reserves: Reserve[],
    centresId: string,
    trainerId: string
  ): Promise<void> {
    await this.model.findOneAndUpdate(
      { trainerId: trainerId, "centres.centresId": centresId },
      {
        $pull: {
          "centres.$.reserves": {
            reserveId: { $in: reserves.map((reserve) => reserve.reserveId) },
          },
        },
      }
    );
  }
}
