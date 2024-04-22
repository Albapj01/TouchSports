import { Team } from "backend/src/trainers/domain/model/Team";
import { TrainerEntity } from "../entities/TrainerEntity";
import { Model } from "mongoose";
import { TrainerPort } from "backend/src/trainers/domain/port/TrainerPort";
import { Player } from "backend/src/trainers/domain/model/Player";
import { Reserve } from "backend/src/trainers/domain/model/Reserve";
import { Trainer } from "backend/src/trainers/domain/model/Trainer";
import { TrainerDTO } from "backend/src/trainers/application/DTOs/TrainerDTO";
import { TrainerMapper } from "../mapper/TrainerMapper";

export class MongoTrainerAdapter implements TrainerPort {
  private model: Model<TrainerEntity>;

  constructor() {
    this.model = require("backend/src/trainers/infrastructure/persistence/schemas/TrainerSchema.ts");
  }
  async findById(id: string): Promise<Trainer> {
    const trainer = await this.model.find({ id: id })
    const trainerFound = trainer[0]
    return TrainerMapper.toDomain(trainerFound)  
  }
  getTrainerById(trainerId: string): Promise<TrainerDTO> {
    throw new Error("Method not implemented.");
  }
  getTrainerInfo(trainerId: string): Promise<TrainerDTO> {
    throw new Error("Method not implemented.");
  }
  async saveTrainer(trainer: Trainer): Promise<void> {
    await this.model.create(TrainerMapper.toEntity(trainer))
  }
  deleteTeam(team: Team): Promise<void> {
    throw new Error("Method not implemented.");
  }
  saveTeam(team: Team): Promise<void> {
    throw new Error("Method not implemented.");
  }
  updateTeam(team: Team): Promise<void> {
    throw new Error("Method not implemented.");
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
