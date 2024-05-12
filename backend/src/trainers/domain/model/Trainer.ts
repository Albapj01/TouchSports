import { Centres } from "./Centres";
import { Team } from "./Team";

export class Trainer {
  constructor(
    readonly trainerId: string,
    readonly name: string,
    readonly surname: string,
    readonly email: string,
    readonly telephone: string,
    public teams: Team[],
    readonly imageUrl: string,
    public centres: Centres[],
  ) {}
}
