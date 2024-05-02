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
  findByTeamId(id: string): Promise<Team> {
    throw new Error("Method not implemented.");
  }
  async findById(trainerId: string): Promise<Trainer> {
    const trainer = await this.model.findOne({ trainerId: trainerId });
    return TrainerMapper.toDomain(trainer);
  }
  async getTrainerById(teamId: string): Promise<TeamDTO> {
    throw new Error("Method not implemented.");
  }
  getTrainerInfo(trainerId: string): Promise<TrainerDTO> {
    throw new Error("Method not implemented.");
  }
  async saveTrainer(trainer: Trainer): Promise<void> {
    await this.model.create(TrainerMapper.toEntity(trainer));
  }
  async deleteTeam(team: Team[], trainerId: string): Promise<void> {
    await this.model.findOneAndUpdate(
      { trainerId: trainerId },
      { $set: { teams: team } },
    )
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
  async getAllTeams(trainerId: String): Promise<Team[]> {
    throw new Error("Method not implemented.");
  }
  deletePlayer(playerId: String): Promise<void> {
    throw new Error("Method not implemented.");
  }
  savePlayer(player: Player): Promise<void> {
    throw new Error("Method not implemented.");
  }
  updatePlayer(player: Player): Promise<void> {
    throw new Error("Method not implemented.");
  }
  getAllPlayers(): Promise<Player[]> {
    throw new Error("Method not implemented.");
  }
  getPlayerById(playerId: String): Promise<Player> {
    throw new Error("Method not implemented.");
  }
  saveReserve(reserve: Reserve): Promise<void> {
    throw new Error("Method not implemented.");
  }
  getAllReserve(): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
