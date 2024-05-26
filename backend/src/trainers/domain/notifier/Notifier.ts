import { Player } from "../model/Player";
import { Team } from "../model/Team";
import { Trainer } from "../model/Trainer";

export interface Notifier {
  createPlayerNotification(player: Player, team: Team, trainer: Trainer): Promise<void>;
  updatePlayerNotification(player: Player, team: Team, trainer: Trainer): Promise<void>;
}
