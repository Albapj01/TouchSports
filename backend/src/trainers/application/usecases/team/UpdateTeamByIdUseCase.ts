import { Team } from "../../../domain/model/Team";
import { TrainerPort } from "../../../domain/port/TrainerPort";

export class UpdateTeamByIdUseCase {
  constructor(private trainerPort: TrainerPort) {}

  async run(trainerId: string, teamId: string, team: Team): Promise<void> {
    const trainer = await this.trainerPort.findById(trainerId);
    if (!trainer) {
      return null;
    }

    const existingTeam = trainer.teams.find(team => team.teamId === teamId);
    if (!existingTeam) {
      throw new Error("Team not found"); 
    }

    const updatedTeam = new Team(trainerId, teamId, team.name, team.players);

    trainer.teams = trainer.teams.filter((team) => team.teamId !== teamId);

    trainer.teams.push(updatedTeam);
    await this.trainerPort.updateTeam(trainer.teams, trainerId);
  }
}
