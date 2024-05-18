export class Reserve {
  constructor(
    readonly trainerId: string,
    readonly centresId: string,
    readonly reserveId: string,
    readonly name: string,
    readonly surname: string,
    readonly email: string,
    readonly telephone: string,
    readonly teamId: string,
    readonly material: string,
    readonly startReserve: Date,
    readonly endReserve: Date
  ) {}
}
