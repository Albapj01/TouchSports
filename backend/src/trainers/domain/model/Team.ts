import { Player } from "./Player";

export class Team {
    constructor(
      readonly trainerId: string,
      readonly teamId: string,
      readonly name: string,
      public players: Player[],
    ) {}
  }