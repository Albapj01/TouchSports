export class Reserve {
  constructor(
    readonly reserveId: string,
    readonly name: string,
    readonly surname: string,
    readonly email: string,
    readonly telephone: string,
    readonly meterial: string,
    readonly date: Date
  ) {}
}
