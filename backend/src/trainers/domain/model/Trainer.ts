import { Team } from "./Team";

export class Trainer {
  constructor(
    readonly trainerId: string,
    readonly name: string,
    readonly surname: string,
    readonly email: string,
    readonly telephone: string,
    readonly teams: Team[],
    readonly imageUrl: string
  ) {}
}
