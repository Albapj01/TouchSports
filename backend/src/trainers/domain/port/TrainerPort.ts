import { Centres } from "../model/Centres";
import { Player } from "../model/Player";
import { Reserve } from "../model/Reserve";
import { Team } from "../model/Team";
import { Trainer } from "../model/Trainer";

export interface TrainerPort {
  saveTrainer(trainer: Trainer): Promise<void>;
  findById(trainerId: string): Promise<Trainer>;
  findByEmail(email: string): Promise<Trainer>;
  findByPlayerEmail(email: string, team: Team): Promise<Player>;
  deleteTeam(team: Team[], trainerId: string): Promise<void>;
  saveTeam(team: Team, trainer: Trainer): Promise<void>;
  updateTeam(team: Team[], trainerId: string): Promise<void>;
  getAllTeams(trainerId: string): Promise<Team[]>;
  deletePlayer(player: Player[], teamId: string, trainerId: string): Promise<void>;
  savePlayer(player: Player, team:Team, trainer: Trainer): Promise<void>;
  updatePlayer(player: Player[], trainerId: string, teamId: string): Promise<void>;
  getAllPlayers(trainer: Trainer, teamId: string): Promise<Player[]>;
  saveCentres(centres: Centres, trainer: Trainer): Promise<void>;
  updateCentres(centres: Centres[], trainerId: string): Promise<void>;
  getAllCentres(trainerId: string): Promise<Centres[]>;
  deleteCentres(team: Centres[], trainerId: string): Promise<void>;
  saveReserve(reserve: Reserve, centres:Centres, trainer: Trainer): Promise<void>;
  updateReserve(reserve: Reserve[], trainerId: string, centresId: string): Promise<void>;
  deleteReserve(reserve: Reserve[], centresId: string, trainerId: string): Promise<void>;
  getAllTrainers(): Promise<Trainer[]>;
}
