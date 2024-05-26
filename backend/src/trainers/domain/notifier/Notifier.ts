import { Centres } from "../model/Centres";
import { Player } from "../model/Player";
import { Reserve } from "../model/Reserve";
import { Team } from "../model/Team";
import { Trainer } from "../model/Trainer";

export interface Notifier {
  createPlayerNotification(player: Player, team: Team, trainer: Trainer): Promise<void>;
  updatePlayerNotification(player: Player, team: Team, trainer: Trainer): Promise<void>;
  createReserveNotification(players: Player[], team: Team, centre: Centres, reserve: Reserve): Promise<void>;
}
