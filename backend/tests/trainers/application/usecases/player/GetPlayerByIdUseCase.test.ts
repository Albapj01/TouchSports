import { GetPlayerByIdUseCase } from "../../../../../src/trainers/application/usecases/player/GetPlayerByIdUseCase";
import { Player } from "../../../../../src/trainers/domain/model/Player";
import { Team } from "../../../../../src/trainers/domain/model/Team";
import { Trainer } from "../../../../../src/trainers/domain/model/Trainer";
import { trainerPort } from "../JestFunctions";

describe("GetPlayerByIdUseCase", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should get a player by id", async () => {
    const player = new Player(
      "trainer-id",
      "team-id",
      "player-id",
      "player-name",
      "player-surname",
      "player-telephone",
      "player-email",
      "player-imageUrl",
      "player-diet",
      "player-technicalTraining",
      "player-physicalTraining",
      "player-improvements"
    );

    const team = new Team("trainer-id", "team-id", "team-name", [player]);
    const trainer = new Trainer(
      "trainer-id",
      "trainer-name",
      "trainer-surname",
      "trainer-email@example.com",
      "123456789",
      [team],
      "http://example.com/image.jpg",
      []
    );

    (trainerPort.findById as jest.Mock).mockResolvedValue(trainer);

    const getPlayerByIdUseCase = new GetPlayerByIdUseCase(trainerPort);

    const obtainedPlayer = await getPlayerByIdUseCase.run(
      "trainer-id",
      "team-id",
      "player-id"
    );

    expect(trainerPort.findById).toHaveBeenCalledWith("trainer-id");
    expect(obtainedPlayer).toEqual({
      trainerId: "trainer-id",
      teamId: "team-id",
      playerId: "player-id",
      name: "player-name",
      surname: "player-surname",
      telephone: "player-telephone",
      email: "player-email",
      imageUrl: "player-imageUrl",
      diet: "player-diet",
      technicalTraining: "player-technicalTraining",
      physicalTraining: "player-physicalTraining",
      improvements: "player-improvements",
    });
  });

  it("shouldn't get a player if trainerId doesn't exist", async () => {
    const getPlayerByIdUseCase = new GetPlayerByIdUseCase(trainerPort);

    (trainerPort.findById as jest.Mock).mockResolvedValueOnce(null);

    const obtainedPlayer = await getPlayerByIdUseCase.run(
      "nonexistent-trainer-id",
      "team-id",
      "player-id"
    );

    expect(trainerPort.findById).toHaveBeenCalledWith("nonexistent-trainer-id");
    expect(obtainedPlayer).toBeNull();
  });

  it("shouldn't get a player if teamId doesn't exist", async () => {
    const player = new Player(
      "trainer-id",
      "team-id",
      "player-id",
      "player-name",
      "player-surname",
      "player-telephone",
      "player-email",
      "player-imageUrl",
      "player-diet",
      "player-technicalTraining",
      "player-physicalTraining",
      "player-improvements"
    );

    const team = new Team("trainer-id", "team-id", "team-name", [player]);
    const trainer = new Trainer(
      "trainer-id",
      "trainer-name",
      "trainer-surname",
      "trainer-email@example.com",
      "123456789",
      [team],
      "http://example.com/image.jpg",
      []
    );

    const getPlayerByIdUseCase = new GetPlayerByIdUseCase(trainerPort);

    (trainerPort.findById as jest.Mock).mockResolvedValueOnce(trainer);

    const obtainedPlayer = await getPlayerByIdUseCase.run(
      "trainer-id",
      "nonexistent-team-id",
      "player-id"
    );

    expect(trainerPort.findById).toHaveBeenCalledWith("trainer-id");
    expect(obtainedPlayer).toBeNull();
  });

  it("shouldn't get a player if playerId doesn't exist", async () => {
    const team = new Team("trainer-id", "team-id", "team-name", []);
    const trainer = new Trainer(
      "trainer-id",
      "trainer-name",
      "trainer-surname",
      "trainer-email@example.com",
      "123456789",
      [team],
      "http://example.com/image.jpg",
      []
    );

    const getPlayerByIdUseCase = new GetPlayerByIdUseCase(trainerPort);

    (trainerPort.findById as jest.Mock).mockResolvedValueOnce(trainer);

    const obtainedPlayer = await getPlayerByIdUseCase.run(
      "trainer-id",
      "team-id",
      "nonexistent-player-id"
    );

    expect(trainerPort.findById).toHaveBeenCalledWith("trainer-id");
    expect(obtainedPlayer).toBeNull();
  });
});
