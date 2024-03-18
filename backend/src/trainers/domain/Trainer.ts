import { Teams } from "./Teams";

export class Trainer {
    constructor(
      readonly trainerId: string,
      readonly name: string,
      readonly surname: string,
      readonly email: string,
      readonly telephone: string,
      readonly teams: Teams,
      readonly imageUrl: string,
    ) {}
  }