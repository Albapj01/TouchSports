import { PlayerDTO } from "./PlayerDTO";

export interface TeamDTO {
    trainerId: string,
    teamId: string,
    name: string,
    players: Array<PlayerDTO>,
  }