import { TrainerPort } from "../../domain/port/TrainerPort";

export class DeleteTeamByIdUseCase {
  constructor(private trainerPort: TrainerPort) {}

  async run(trainerId: string, teamId: string): Promise<void> {
    const trainer = await this.trainerPort.findById(trainerId);

    if (!trainer) {
      return null;
    }

    trainer.teams = trainer.teams.filter((team) => team.teamId != teamId);
    await this.trainerPort.deleteTeam(trainer.teams, trainerId);
  }
}
