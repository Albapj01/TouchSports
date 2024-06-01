import { DeleteTeamByIdUseCase } from "../../../../../src/trainers/application/usecases/team/DeleteTeamByIdUseCase";
import { Team } from "../../../../../src/trainers/domain/model/Team";
import { Trainer } from "../../../../../src/trainers/domain/model/Trainer";
import { trainerPort } from "../JestFunctions";

describe("DeleteTeamById", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should delete a team by id", async () => {
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

    const deleteTeamByIdUseCase = new DeleteTeamByIdUseCase(trainerPort);

    await deleteTeamByIdUseCase.run("trainer-id", "team-id-2");

    expect(trainerPort.findById).toHaveBeenCalledWith("trainer-id");
    expect(trainerPort.deleteTeam).toHaveBeenCalledWith(
      [new Team("trainer-id", "team-id-1", "team-name-1", [])],
      "trainer-id"
    );
  });

  it("shouldn't delete a team if trainerId doesn't exist", async () => {
    const deleteTeamByIdUseCase = new DeleteTeamByIdUseCase(trainerPort);

    (trainerPort.findById as jest.Mock).mockResolvedValueOnce(null);

    await deleteTeamByIdUseCase.run("nonexistent-trainer-id", "team-id");

    expect(trainerPort.findById).toHaveBeenCalledWith("nonexistent-trainer-id");
    expect(trainerPort.deleteTeam).not.toHaveBeenCalled();
  });

  it("shouldn't delete a team if trainerId doesn't exist", async () => {
    const deleteTeamByIdUseCase = new DeleteTeamByIdUseCase(trainerPort);

    (trainerPort.findById as jest.Mock).mockResolvedValueOnce(null);

    await deleteTeamByIdUseCase.run("nonexistent-trainer-id", "team-id");

    expect(trainerPort.findById).toHaveBeenCalledWith("nonexistent-trainer-id");
    expect(trainerPort.deleteTeam).not.toHaveBeenCalled();
  });

  it("shouldn't delete a team if teamId doesn't exist", async () => {
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

    const deleteTeamByIdUseCase = new DeleteTeamByIdUseCase(trainerPort);

    (trainerPort.findById as jest.Mock).mockResolvedValueOnce(trainer);

    await expect(deleteTeamByIdUseCase.run("trainer-id", "nonexistent-team-id")).rejects.toThrow("Team not found");

    expect(trainerPort.findById).toHaveBeenCalledWith("trainer-id");
    expect(trainerPort.deleteTeam).not.toHaveBeenCalled();
  });
});
