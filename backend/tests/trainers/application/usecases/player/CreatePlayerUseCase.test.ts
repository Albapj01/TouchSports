import { CreatePlayerUseCase } from "../../../../../src/trainers/application/usecases/player/CreatePlayerUseCase";
import { Player } from "../../../../../src/trainers/domain/model/Player";
import { Team } from "../../../../../src/trainers/domain/model/Team";
import { notifierPort, trainerPort } from "../JestFunctions";

describe("CreatePlayer", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should create a player and should notify the creation of a player", async () => {
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

    const createPlayerUseCase = new CreatePlayerUseCase(
      trainerPort,
      notifierPort
    );

    (trainerPort.findById as jest.Mock).mockResolvedValueOnce({
      teams: [{ teamId: "team-id", players: [] }],
    });

    await createPlayerUseCase.run("trainer-id", "team-id", player);

    expect(trainerPort.savePlayer).toHaveBeenCalledWith(
      expect.objectContaining({ playerId: "player-id" }),
      expect.objectContaining({ teamId: "team-id" }),
      expect.any(Object)
    );
    expect(notifierPort.createPlayerNotification).toHaveBeenCalled();
  });

  it("shouldn't create a player if trainerId doesn't exist", async () => {
    const playerWithoutTrainerId = new Player(
      "",
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

    const createPlayerUseCase = new CreatePlayerUseCase(
      trainerPort,
      notifierPort
    );

    (trainerPort.findById as jest.Mock).mockResolvedValueOnce(null);

    const createdPlayer = await createPlayerUseCase.run(
      "",
      "team-id",
      playerWithoutTrainerId
    );

    expect(trainerPort.savePlayer).not.toHaveBeenCalled();
    expect(createdPlayer).toBeNull();
    expect(notifierPort.createPlayerNotification).not.toHaveBeenCalled();
  });

  it("shouldn't create a player if teamId doesn't exist", async () => {
    const playerWithoutTeamId = new Player(
      "trainer-id",
      "nonexistent-team-id",
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

    const createPlayerUseCase = new CreatePlayerUseCase(
      trainerPort,
      notifierPort
    );

    (trainerPort.findById as jest.Mock).mockResolvedValueOnce({
        teams: [{ teamId: "team-id", players: [] }],
      });

    await expect(
      createPlayerUseCase.run(
        "trainer-id",
        "nonexistent-team-id",
        playerWithoutTeamId
      )
    ).rejects.toThrow("Team not found");

    expect(trainerPort.findById).toHaveBeenCalledWith("trainer-id");
    expect(trainerPort.savePlayer).not.toHaveBeenCalled();
    expect(notifierPort.createPlayerNotification).not.toHaveBeenCalled();
  });
});
