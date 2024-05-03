import { Player } from "../model/Player";
import { Reserve } from "../model/Reserve";
import { Team } from "../model/Team";
import { Trainer } from "../model/Trainer";

export interface TrainerPort {
  saveTrainer(trainer: Trainer): Promise<void>;
  updateTrainer(oldTrainer: Trainer, updateTrainer: Trainer): Promise<void>;
  findById(trainerId: string): Promise<Trainer>;
  findByTeamId(teamIdd: string, trainerId: string): Promise<Team>;
  deleteTeam(team: Team[], trainerId: string): Promise<void>;
  saveTeam(team: Team, trainer: Trainer): Promise<void>;
  updateTeam(team: Team[], trainerId: string): Promise<void>;
  getAllTeams(trainerId: String): Promise<Team[]>;
  deletePlayer(playerId: String): Promise<void>;
  savePlayer(player: Player, team:Team, trainer:Trainer): Promise<void>;
  updatePlayer(player: Player): Promise<void>;
  getAllPlayers(): Promise<Player[]>;
  getPlayerById(playerId: String): Promise<Player>;
  saveReserve(reserve: Reserve): Promise<void>;
  getAllReserve(): Promise<void>;
}
