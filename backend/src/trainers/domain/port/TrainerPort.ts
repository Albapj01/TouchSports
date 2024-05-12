import { Centres } from "../model/Centres";
import { Player } from "../model/Player";
import { Reserve } from "../model/Reserve";
import { Team } from "../model/Team";
import { Trainer } from "../model/Trainer";

export interface TrainerPort {
  saveTrainer(trainer: Trainer): Promise<void>;
  updateTrainer(oldTrainer: Trainer, updateTrainer: Trainer): Promise<void>;
  findById(trainerId: string): Promise<Trainer>;
  findByTeamId(teamId: string, trainerId: string): Promise<Team>;
  findByPlayerId(playerId: string, teamId: string, trainerId: string): Promise<Player>;
  deleteTeam(team: Team[], trainerId: string): Promise<void>;
  saveTeam(team: Team, trainer: Trainer): Promise<void>;
  updateTeam(team: Team[], trainerId: string): Promise<void>;
  getAllTeams(trainerId: string): Promise<Team[]>;
  deletePlayer(player: Player[], teamId: string, trainerId: string): Promise<void>;
  savePlayer(player: Player, team:Team, trainer: Trainer): Promise<void>;
  updatePlayer(player: Player[], trainerId: string, teamId: string): Promise<void>;
  getAllPlayers(trainerId: string, teamId: string): Promise<Player[]>;
  saveCentres(centres: Centres, trainer: Trainer): Promise<void>;
  updateCentres(centres: Centres[], trainerId: string): Promise<void>;
  saveReserve(reserve: Reserve): Promise<void>;
  getAllReserve(): Promise<void>;
}
