import { Reserve } from "./Reserve";

export class Centres {
  constructor(
    readonly trainerId: string,
    readonly centresId: string,
    readonly name: string,
    readonly location: string,
    public reserves: Reserve[],
    readonly imageUrl: string
  ) {}
}
