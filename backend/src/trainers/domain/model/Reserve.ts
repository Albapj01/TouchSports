export class Reserve {
  constructor(
    readonly trainerId: string,
    readonly teamId: string,
    readonly centresId: string,
    readonly reserveId: string,
    readonly name: string,
    readonly surname: string,
    readonly email: string,
    readonly telephone: string,
    readonly meterial: string,
    readonly date: Date
  ) {}
}
