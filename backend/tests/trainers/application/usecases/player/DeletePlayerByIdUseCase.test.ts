import { DeletePlayerByIdUseCase } from "../../../../../src/trainers/application/usecases/player/DeletePlayerByIdUseCase";
import { Player } from "../../../../../src/trainers/domain/model/Player";
import { Team } from "../../../../../src/trainers/domain/model/Team";
import { Trainer } from "../../../../../src/trainers/domain/model/Trainer";
import { trainerPort } from "../JestFunctions";

describe("DeletePlayerByIdUseCase", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should delete a player by id", async () => {
    const playerToDelete = new Player(
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

    const team = new Team("trainer-id", "team-id", "team-name", [playerToDelete]);
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

    const deletePlayerByIdUseCase = new DeletePlayerByIdUseCase(trainerPort);

    await deletePlayerByIdUseCase.run("trainer-id", "team-id", "player-id");

    expect(trainerPort.findById).toHaveBeenCalledWith("trainer-id");
    expect(trainerPort.deletePlayer).toHaveBeenCalledWith(team.players, "team-id", "trainer-id");
  });

  it("shouldn't delete a player if trainerId doesn't exist", async () => {
    const deletePlayerByIdUseCase = new DeletePlayerByIdUseCase(trainerPort);

    (trainerPort.findById as jest.Mock).mockResolvedValueOnce(null);

    const result = await deletePlayerByIdUseCase.run(
      "nonexistent-trainer-id",
      "team-id",
      "player-id"
    );

    expect(trainerPort.findById).toHaveBeenCalledWith("nonexistent-trainer-id");
    expect(trainerPort.deletePlayer).not.toHaveBeenCalled();
    expect(result).toBeNull();
  });

  it("shouldn't delete a player if teamId doesn't exist", async () => {
    const playerToDelete = new Player(
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

    const team = new Team("trainer-id", "team-id", "team-name", [playerToDelete]);
    const trainer = new Trainer(
      "trainer-id",
      "trainer-name",
      "trainer-surname",
      "trainer-email@example.com",
      [team],
      "http://example.com/image.jpg",
      []
    );

    const deletePlayerByIdUseCase = new DeletePlayerByIdUseCase(trainerPort);

    (trainerPort.findById as jest.Mock).mockResolvedValueOnce(trainer);

    await expect(
      deletePlayerByIdUseCase.run("trainer-id", "nonexistent-team-id", "player-id")
    ).rejects.toThrow("Team not found");

    expect(trainerPort.findById).toHaveBeenCalledWith("trainer-id");
    expect(trainerPort.deletePlayer).not.toHaveBeenCalled();
  });

  it("shouldn't delete a player if playerId doesn't exist", async () => {
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

    const deletePlayerByIdUseCase = new DeletePlayerByIdUseCase(trainerPort);

    (trainerPort.findById as jest.Mock).mockResolvedValueOnce(trainer);

    await expect(
      deletePlayerByIdUseCase.run("trainer-id", "team-id", "nonexistent-player-id")
    ).rejects.toThrow("Player not found");

    expect(trainerPort.findById).toHaveBeenCalledWith("trainer-id");
    expect(trainerPort.deletePlayer).not.toHaveBeenCalled();
  });
});
