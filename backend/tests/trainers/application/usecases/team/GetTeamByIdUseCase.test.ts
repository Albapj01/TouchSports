import { GetTeamByIdUseCase } from "../../../../../src/trainers/application/usecases/team/GetTeamByIdUseCase";
import { Team } from "../../../../../src/trainers/domain/model/Team";
import { Trainer } from "../../../../../src/trainers/domain/model/Trainer";
import { trainerPort } from "../JestFunctions";

describe("GetTeamById", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should get a team by id", async () => {
    const teams: Team[] = [
      new Team("trainer-id", "team-id-1", "team-name-1", []),
      new Team("trainer-id", "team-id-2", "team-name-2", []),
    ];

    const trainer = new Trainer(
      "trainer-id",
      "trainer-name",
      "trainer-surname",
      "trainer-email@example.com",
      teams,
      "http://example.com/image.jpg",
      []
    );

    (trainerPort.findById as jest.Mock).mockResolvedValue(trainer);

    const getTeamByIdUseCase = new GetTeamByIdUseCase(trainerPort);

    const obtainedTeam = await getTeamByIdUseCase.run(
      "trainer-id",
      "team-id-2"
    );

    expect(trainerPort.findById).toHaveBeenCalledWith("trainer-id");
    expect(obtainedTeam).toEqual(teams[1]);
  });

  it("shouldn't get a team with an incorrect trainerId", async () => {
    (trainerPort.findById as jest.Mock).mockResolvedValue(null);

    const getTeamByIdUseCase = new GetTeamByIdUseCase(trainerPort);

    const obtainedTeam = await getTeamByIdUseCase.run(
      "nonexistent-id",
      "team-id-2"
    );

    expect(trainerPort.findById).toHaveBeenCalledWith("nonexistent-id");
    expect(obtainedTeam).toBeNull();
  });

  it("shouldn't get a team with an incorrect treamId", async () => {
    const teams: Team[] = [
      new Team("trainer-id", "team-id-1", "team-name-1", []),
      new Team("trainer-id", "team-id-2", "team-name-2", []),
    ];

    const trainer = new Trainer(
      "trainer-id",
      "trainer-name",
      "trainer-surname",
      "trainer-email@example.com",
      teams,
      "http://example.com/image.jpg",
      []
    );

    (trainerPort.findById as jest.Mock).mockResolvedValue(trainer);

    const getTeamByIdUseCase = new GetTeamByIdUseCase(trainerPort);

    const obtainedTeam = await getTeamByIdUseCase.run(
      "trainer-id",
      "nonexistent-id"
    );

    expect(trainerPort.findById).toHaveBeenCalledWith("trainer-id");
    expect(obtainedTeam).toBeNull();
  });
});
