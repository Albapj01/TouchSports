import { GetPlayerByEmailUseCase } from "../../../../../src/trainers/application/usecases/player/GetPlayerByEmailUseCase";
import { Player } from "../../../../../src/trainers/domain/model/Player";
import { Team } from "../../../../../src/trainers/domain/model/Team";
import { Trainer } from "../../../../../src/trainers/domain/model/Trainer";
import { trainerPort } from "../JestFunctions";

describe("GetPlayerByEmailUseCase", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should get a player by email", async () => {
    const player = new Player(
      "trainer-id",
      "team-id",
      "player-id",
      "player-name",
      "player-surname",
      "player-telephone",
      "player-email@example.com",
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

    (trainerPort.getAllTrainers as jest.Mock).mockResolvedValue([trainer]);

    const getPlayerByEmailUseCase = new GetPlayerByEmailUseCase(trainerPort);

    const obtainedPlayer = await getPlayerByEmailUseCase.run(
      "trainer-email@example.com",
      "player-email@example.com"
    );

    expect(trainerPort.getAllTrainers).toHaveBeenCalled();
    expect(obtainedPlayer).toEqual({
      trainerId: "trainer-id",
      teamId: "team-id",
      playerId: "player-id",
      name: "player-name",
      surname: "player-surname",
      telephone: "player-telephone",
      email: "player-email@example.com",
      imageUrl: "player-imageUrl",
      diet: "player-diet",
      technicalTraining: "player-technicalTraining",
      physicalTraining: "player-physicalTraining",
      improvements: "player-improvements",
    });
  });

  it("shouldn't get a player if trainer email doesn't exist", async () => {
    const getPlayerByEmailUseCase = new GetPlayerByEmailUseCase(trainerPort);

    (trainerPort.getAllTrainers as jest.Mock).mockResolvedValueOnce([]);

    const obtainedPlayer = await getPlayerByEmailUseCase.run(
      "nonexistent-trainer-email@example.com",
      "player-email@example.com"
    );

    expect(trainerPort.getAllTrainers).toHaveBeenCalled();
    expect(obtainedPlayer).toBeNull();
  });

  it("shouldn't get a player if player email doesn't exist", async () => {
    const player = new Player(
      "trainer-id",
      "team-id",
      "player-id",
      "player-name",
      "player-surname",
      "player-telephone",
      "player-email@example.com",
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

    (trainerPort.getAllTrainers as jest.Mock).mockResolvedValueOnce([trainer]);

    const getPlayerByEmailUseCase = new GetPlayerByEmailUseCase(trainerPort);

    const obtainedPlayer = await getPlayerByEmailUseCase.run(
      "trainer-email@example.com",
      "nonexistent-player-email@example.com"
    );

    expect(trainerPort.getAllTrainers).toHaveBeenCalled();
    expect(obtainedPlayer).toBeUndefined();
  });

  it("shouldn't get a player if no trainers found", async () => {
    const getPlayerByEmailUseCase = new GetPlayerByEmailUseCase(trainerPort);

    (trainerPort.getAllTrainers as jest.Mock).mockResolvedValueOnce(null);

    const obtainedPlayer = await getPlayerByEmailUseCase.run(
      "trainer-email@example.com",
      "player-email@example.com"
    );

    expect(trainerPort.getAllTrainers).toHaveBeenCalled();
    expect(obtainedPlayer).toBeNull();
  });
});
