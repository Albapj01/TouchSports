import { GetAllTeamsUseCase } from "../../../../../src/trainers/application/usecases/team/GetAllTeamsUseCase";
import { Team } from "../../../../../src/trainers/domain/model/Team";
import { Trainer } from "../../../../../src/trainers/domain/model/Trainer";
import { trainerPort } from "../JestFunctions";

describe("GetAllTeams", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should get all teams", async () => {
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

    const getAllTeamsUseCase = new GetAllTeamsUseCase(trainerPort);

    const obtainedTeams = await getAllTeamsUseCase.run("trainer-id");

    expect(trainerPort.findById).toHaveBeenCalledWith("trainer-id");
    expect(obtainedTeams).toEqual(teams);
  });

  it("shouldn't get all teams if trainerId doesn't exist", async () => {
    const getAllTeamsUseCase = new GetAllTeamsUseCase(trainerPort);

    (trainerPort.findById as jest.Mock).mockResolvedValueOnce(null);

    const obtaniedTeams = await getAllTeamsUseCase.run("");

    expect(trainerPort.findById).toHaveBeenCalled();
    expect(obtaniedTeams).toBeNull();
  });
});
