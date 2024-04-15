import { Player } from "../model/Player";
import { Reserve } from "../model/Reserve";
import { Team } from "../model/Team";
import { Trainer } from "../model/Trainer";

export interface TrainerPort {
  saveTrainer(trainer: Trainer): Promise<void>;
  deleteTeam(team: Team): Promise<void>;
  saveTeam(team: Team): Promise<void>;
  updateTeam(team: Team): Promise<void>;
  getAllTeams(trainerId: String): Promise<Team[]>;
  deletePlayer(playerId: String): Promise<void>;
  savePlayer(player: Player): Promise<void>;
  updatePlayer(player: Player): Promise<void>;
  getAllPlayers(): Promise<Player[]>;
  getPlayerById(playerId: String): Promise<Player>;
  saveReserve(reserve: Reserve): Promise<void>;
  getAllReserve(): Promise<void>;
}
