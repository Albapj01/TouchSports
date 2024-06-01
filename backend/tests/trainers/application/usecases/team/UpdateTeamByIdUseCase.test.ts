import { UpdateTeamByIdUseCase } from "../../../../../src/trainers/application/usecases/team/UpdateTeamByIdUseCase";
import { Team } from "../../../../../src/trainers/domain/model/Team";
import { Trainer } from "../../../../../src/trainers/domain/model/Trainer";
import { trainerPort } from "../JestFunctions";

describe("UpdateTeamById", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should update a team by id", async () => {
    const teams: Team[] = [
      new Team("trainer-id", "team-id-1", "team-name-1", []),
      new Team("trainer-id", "team-id-2", "team-name-2", []),
    ];

    const trainer = new Trainer(
      "trainer-id",
      "trainer-name",
      "trainer-surname",
      "trainer-email@example.com",
      "123456789",
      teams,
      "http://example.com/image.jpg",
      []
    );

    (trainerPort.findById as jest.Mock).mockResolvedValue(trainer);

    const updateTeamByIdUseCase = new UpdateTeamByIdUseCase(trainerPort);
    const updatedTeam = new Team(
      "trainer-id",
      "team-id-2",
      "updated-team-name",
      []
    );

    await updateTeamByIdUseCase.run("trainer-id", "team-id-2", updatedTeam);

    const existingTeam = trainer.teams.find(
      (team) => team.teamId === "team-id-2"
    );

    expect(trainerPort.findById).toHaveBeenCalledWith("trainer-id");
    expect(trainerPort.updateTeam).toHaveBeenCalledWith(
      trainer.teams,
      "trainer-id"
    );
    expect(existingTeam).toBeDefined();
    if (existingTeam) {
      expect(existingTeam.name).toEqual("updated-team-name");
    }
    expect(updatedTeam.trainerId).toEqual(teams[1].trainerId);
    expect(updatedTeam.teamId).toEqual(teams[1].teamId);
    expect(updatedTeam.players).toEqual(teams[1].players);
    expect(updatedTeam.name).not.toEqual(teams[1].name);
  });

  it("shouldn't update a team if trainerId doesn't exist", async () => {
    const teamWithoutTrainerId = new Team("", "team-id", "team-name", []);
    const updateTeamByIdUseCase = new UpdateTeamByIdUseCase(trainerPort);

    (trainerPort.findById as jest.Mock).mockResolvedValueOnce(null);

    const updatedTeam = await updateTeamByIdUseCase.run(
      "nonexistent-trainer-id",
      "team-id",
      teamWithoutTrainerId
    );

    expect(trainerPort.findById).toHaveBeenCalledWith("nonexistent-trainer-id");
    expect(trainerPort.updateTeam).not.toHaveBeenCalled();
    expect(updatedTeam).toBeNull();
  });
});
