import { CreateTeamUseCase } from "../../../../../src/trainers/application/usecases/team/CreateTeamUseCase";
import { Team } from "../../../../../src/trainers/domain/model/Team";
import { trainerPort } from "../JestFunctions";

describe("CreateTeam", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should create a team", async () => {
    const team = new Team("trainer-id", "team-id", "team-name", []);
    const createTeamUseCase = new CreateTeamUseCase(trainerPort);

    (trainerPort.findById as jest.Mock).mockResolvedValueOnce({
      teams: [],
    });

    await createTeamUseCase.run(team);

    expect(trainerPort.saveTeam).toHaveBeenCalledWith(team, expect.any(Object));
  });

  it("shouldn't create a team if trainerId doesn't exist", async () => {
    const teamWithoutTrainerId = new Team("", "team-id", "team-name", []);
    const createTeamUseCase = new CreateTeamUseCase(trainerPort);

    (trainerPort.findById as jest.Mock).mockResolvedValueOnce(null);

    const createdTeam = await createTeamUseCase.run(teamWithoutTrainerId);

    expect(trainerPort.saveTeam).not.toHaveBeenCalled();
    expect(createdTeam).toBeNull();
  });
});
