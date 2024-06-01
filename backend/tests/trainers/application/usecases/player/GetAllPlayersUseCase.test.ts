import { GetAllPlayersUseCase } from "../../../../../src/trainers/application/usecases/player/GetAllPlayersUseCase";
import { Player } from "../../../../../src/trainers/domain/model/Player";
import { Team } from "../../../../../src/trainers/domain/model/Team";
import { Trainer } from "../../../../../src/trainers/domain/model/Trainer";
import { trainerPort } from "../JestFunctions";

describe("GetAllPlayersUseCase", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should get all players for a team", async () => {
    const players = [
      new Player(
        "trainer-id",
        "team-id",
        "player-id-1",
        "player-name-1",
        "player-surname-1",
        "player-telephone-1",
        "player-email-1",
        "player-imageUrl-1",
        "player-diet-1",
        "player-technicalTraining-1",
        "player-physicalTraining-1",
        "player-improvements-1"
      ),
      new Player(
        "trainer-id",
        "team-id",
        "player-id-2",
        "player-name-2",
        "player-surname-2",
        "player-telephone-2",
        "player-email-2",
        "player-imageUrl-2",
        "player-diet-2",
        "player-technicalTraining-2",
        "player-physicalTraining-2",
        "player-improvements-2"
      ),
    ];

    const team = new Team("trainer-id", "team-id", "team-name", players);
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

    const getAllPlayersUseCase = new GetAllPlayersUseCase(trainerPort);

    const obtainedPlayers = await getAllPlayersUseCase.run(
      "trainer-id",
      "team-id"
    );

    expect(trainerPort.findById).toHaveBeenCalledWith("trainer-id");
    expect(obtainedPlayers).toEqual(
      players.map((player) => ({
        trainerId: "trainer-id",
        teamId: "team-id",
        playerId: player.playerId,
        name: player.name,
        surname: player.surname,
        telephone: player.telephone,
        email: player.email,
        imageUrl: player.imageUrl,
        diet: player.diet,
        technicalTraining: player.technicalTraining,
        physicalTraining: player.physicalTraining,
        improvements: player.improvements,
      }))
    );
  });

  it("shouldn't get all players if trainerId doesn't exist", async () => {
    const getAllPlayersUseCase = new GetAllPlayersUseCase(trainerPort);

    (trainerPort.findById as jest.Mock).mockResolvedValueOnce(null);

    const obtainedPlayers = await getAllPlayersUseCase.run(
      "nonexistent-trainer-id",
      "team-id"
    );

    expect(trainerPort.findById).toHaveBeenCalledWith("nonexistent-trainer-id");
    expect(obtainedPlayers).toBeNull();
  });

  it("shouldn't get all players if teamId doesn't exist", async () => {
    const team = new Team("trainer-id", "team-id", "team-name", [
      new Player(
        "trainer-id",
        "team-id",
        "player-id-2",
        "player-name-2",
        "player-surname-2",
        "player-telephone-2",
        "player-email-2",
        "player-imageUrl-2",
        "player-diet-2",
        "player-technicalTraining-2",
        "player-physicalTraining-2",
        "player-improvements-2"
      ),
    ]);
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

    const getAllPlayersUseCase = new GetAllPlayersUseCase(trainerPort);

    (trainerPort.findById as jest.Mock).mockResolvedValueOnce(trainer);

    const obtainedPlayer = await getAllPlayersUseCase.run("trainer-id", "nonexistent-team-id");

    expect(trainerPort.findById).toHaveBeenCalledWith("trainer-id");
    expect(obtainedPlayer).toBeNull();
  });
});
