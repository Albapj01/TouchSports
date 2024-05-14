import { Player } from "./Player";

export interface Team {
    trainerId: string,
    teamId: string,
    name: string,
    players: Player[],
}