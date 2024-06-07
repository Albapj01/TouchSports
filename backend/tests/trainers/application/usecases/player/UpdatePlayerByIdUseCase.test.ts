import { UpdatePlayerByIdUseCase } from "../../../../../src/trainers/application/usecases/player/UpdatePlayerByIdUseCase";
import { Player } from "../../../../../src/trainers/domain/model/Player";
import { Team } from "../../../../../src/trainers/domain/model/Team";
import { Trainer } from "../../../../../src/trainers/domain/model/Trainer";
import { trainerPort, notifierPort } from "../JestFunctions";

describe("UpdatePlayerByIdUseCase", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should update a player by id and notify it", async () => {
    const originalPlayer = new Player(
      "trainer-id",
      "team-id",
      "player-id",
      "original-name",
      "original-surname",
      "original-telephone",
      "original-email",
      "original-imageUrl",
      "original-diet",
      "original-technicalTraining",
      "original-physicalTraining",
      "original-improvements"
    );

    const updatedPlayer = new Player(
      "trainer-id",
      "team-id",
      "player-id",
      "updated-name",
      "updated-surname",
      "updated-telephone",
      "updated-email",
      "updated-imageUrl",
      "updated-diet",
      "updated-technicalTraining",
      "updated-physicalTraining",
      "updated-improvements"
    );

    const team = new Team("trainer-id", "team-id", "team-name", [
      originalPlayer,
    ]);
    const trainer = new Trainer(
      "trainer-id",
      "trainer-name",
      "trainer-surname",
      "trainer-email@example.com",
      [team],
      "http://example.com/image.jpg",
      []
    );

    (trainerPort.findById as jest.Mock).mockResolvedValue(trainer);

    const updatePlayerByIdUseCase = new UpdatePlayerByIdUseCase(
      trainerPort,
      notifierPort
    );

    await updatePlayerByIdUseCase.run(
      "trainer-id",
      "team-id",
      "player-id",
      updatedPlayer
    );

    expect(trainerPort.findById).toHaveBeenCalledWith("trainer-id");
    expect(trainerPort.updatePlayer).toHaveBeenCalledWith(
      [updatedPlayer],
      "trainer-id",
      "team-id"
    );
    expect(notifierPort.updatePlayerNotification).toHaveBeenCalledWith(
      updatedPlayer,
      team,
      trainer
    );
  });

  it("shouldn't update a player if trainerId doesn't exist", async () => {
    const player: Player = new Player(
      "trainer-id",
      "team-id",
      "player-id",
      "updated-name",
      "updated-surname",
      "updated-telephone",
      "updated-email",
      "updated-imageUrl",
      "updated-diet",
      "updated-technicalTraining",
      "updated-physicalTraining",
      "updated-improvements"
    );
    const updatePlayerByIdUseCase = new UpdatePlayerByIdUseCase(
      trainerPort,
      notifierPort
    );

    (trainerPort.findById as jest.Mock).mockResolvedValueOnce(null);

    const result = await updatePlayerByIdUseCase.run(
      "nonexistent-trainer-id",
      "team-id",
      "player-id",
      player
    );

    expect(trainerPort.findById).toHaveBeenCalledWith("nonexistent-trainer-id");
    expect(result).toBeNull();
    expect(trainerPort.updatePlayer).not.toHaveBeenCalled();
    expect(notifierPort.updatePlayerNotification).not.toHaveBeenCalled();
  });

  it("shouldn't update a player if teamId doesn't exist", async () => {
    const player = new Player(
      "trainer-id",
      "team-id",
      "player-id",
      "updated-name",
      "updated-surname",
      "updated-telephone",
      "updated-email",
      "updated-imageUrl",
      "updated-diet",
      "updated-technicalTraining",
      "updated-physicalTraining",
      "updated-improvements"
    );

    const trainer = new Trainer(
      "trainer-id",
      "trainer-name",
      "trainer-surname",
      "trainer-email@example.com",
      [],
      "http://example.com/image.jpg",
      []
    );

    (trainerPort.findById as jest.Mock).mockResolvedValue(trainer);

    const updatePlayerByIdUseCase = new UpdatePlayerByIdUseCase(
      trainerPort,
      notifierPort
    );

    await expect(
      updatePlayerByIdUseCase.run(
        "trainer-id",
        "nonexistent-team-id",
        "player-id",
        player
      )
    ).rejects.toThrow("Team not found");

    expect(trainerPort.findById).toHaveBeenCalledWith("trainer-id");
    expect(trainerPort.updatePlayer).not.toHaveBeenCalled();
    expect(notifierPort.updatePlayerNotification).not.toHaveBeenCalled();
  });

  it("shouldn't update a player if playerId doesn't exist", async () => {
    const player = new Player(
      "trainer-id",
      "team-id",
      "player-id",
      "updated-name",
      "updated-surname",
      "updated-telephone",
      "updated-email",
      "updated-imageUrl",
      "updated-diet",
      "updated-technicalTraining",
      "updated-physicalTraining",
      "updated-improvements"
    );

    const team = new Team("trainer-id", "team-id", "team-name", []);
    const trainer = new Trainer(
      "trainer-id",
      "trainer-name",
      "trainer-surname",
      "trainer-email@example.com",
      [team],
      "http://example.com/image.jpg",
      []
    );

    (trainerPort.findById as jest.Mock).mockResolvedValue(trainer);

    const updatePlayerByIdUseCase = new UpdatePlayerByIdUseCase(
      trainerPort,
      notifierPort
    );

    await expect(
      updatePlayerByIdUseCase.run(
        "trainer-id",
        "team-id",
        "nonexistent-player-id",
        player
      )
    ).rejects.toThrow("Player not found");

    expect(trainerPort.findById).toHaveBeenCalledWith("trainer-id");
    expect(trainerPort.updatePlayer).not.toHaveBeenCalled();
    expect(notifierPort.updatePlayerNotification).not.toHaveBeenCalled();
  });
});
