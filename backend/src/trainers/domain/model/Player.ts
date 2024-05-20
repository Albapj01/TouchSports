export class Player {
  constructor(
    readonly trainerId: string,
    readonly teamId: string,
    readonly playerId: string,
    readonly name: string,
    readonly surname: string,
    readonly email: string,
    readonly imageUrl: string,
    readonly diet: string,
    readonly technicalTraining: string,
    readonly physicalTraining: string,
    readonly improvements: string
  ) {}
}
