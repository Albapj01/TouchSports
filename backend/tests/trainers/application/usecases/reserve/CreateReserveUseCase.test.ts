import { CreateReserveUseCase } from "../../../../../src/trainers/application/usecases/reserve/CreateReserveUseCase";
import { Centres } from "../../../../../src/trainers/domain/model/Centres";
import { Reserve } from "../../../../../src/trainers/domain/model/Reserve";
import { Team } from "../../../../../src/trainers/domain/model/Team";
import { Trainer } from "../../../../../src/trainers/domain/model/Trainer";
import { trainerPort, notifierPort } from "../JestFunctions";

describe("CreateReserveUseCase", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should create a reserve and should notify the creation of a reserve", async () => {
    const reserve = new Reserve(
      "trainer-id",
      "centres-id",
      "reserve-id",
      "reserve-name",
      "reserve-surname",
      "reserve-email",
      "reserve-telephone",
      "team-id",
      "reserve-material",
      new Date(),
      new Date(),
    );

    const createReserveUseCase = new CreateReserveUseCase(
      trainerPort,
      notifierPort
    );

    const team = new Team("trainer-id", "team-id", "team-name", []);
    const centre = new Centres("trainer-id", "centre-id", "centre-name", "centre-location", [], "centre-imageUrl")
    const trainer = new Trainer(
      "trainer-id",
      "trainer-name",
      "trainer-surname",
      "trainer-email@example.com",
      [team],
      "http://example.com/image.jpg",
      [centre]
    );

    (trainerPort.findById as jest.Mock).mockResolvedValueOnce(trainer);

    await createReserveUseCase.run("trainer-id", "centre-id", reserve);

    expect(trainerPort.saveReserve).toHaveBeenCalledWith(
      expect.objectContaining({ reserveId: "reserve-id" }),
      expect.objectContaining({ centresId: "centre-id" }),
      expect.any(Object)
    );
    expect(notifierPort.createReserveNotification).toHaveBeenCalled();
  });

  it("should create a reserve but not notify if teamId does not exist", async () => {
    const reserve = new Reserve(
      "trainer-id",
      "centres-id",
      "reserve-id",
      "reserve-name",
      "reserve-surname",
      "reserve-email",
      "reserve-telephone",
      "nonexistent-team-id", 
      "reserve-material",
      new Date(),
      new Date(),
    );

    const createReserveUseCase = new CreateReserveUseCase(
      trainerPort,
      notifierPort
    );

    const team = new Team("trainer-id", "team-id", "team-name", []);
    const centre = new Centres("trainer-id", "centre-id", "centre-name", "centre-location", [], "centre-imageUrl")
    const trainer = new Trainer(
      "trainer-id",
      "trainer-name",
      "trainer-surname",
      "trainer-email@example.com",
      [team], 
      "http://example.com/image.jpg",
      [centre]
    );

    (trainerPort.findById as jest.Mock).mockResolvedValueOnce(trainer);

    await createReserveUseCase.run("trainer-id", "centre-id", reserve);

    expect(trainerPort.saveReserve).toHaveBeenCalledWith(
      expect.objectContaining({ reserveId: "reserve-id" }),
      expect.objectContaining({ centresId: "centre-id" }),
      expect.any(Object)
    );
    expect(notifierPort.createReserveNotification).not.toHaveBeenCalled();
  });

  it("shouldn't create a reserve if trainerId doesn't exist", async () => {
    const reserveWithoutTrainerId = new Reserve(
        "",
        "centres-id",
        "reserve-id",
        "reserve-name",
        "reserve-surname",
        "reserve-email",
        "reserve-telephone",
        "team-id",
        "reserve-material",
        new Date(),
        new Date(),
      );

    const createReserveUseCase = new CreateReserveUseCase(
      trainerPort,
      notifierPort
    );

    (trainerPort.findById as jest.Mock).mockResolvedValueOnce(null);

    const createdReserve = await createReserveUseCase.run(
      "",
      "centres-id",
      reserveWithoutTrainerId
    );

    expect(trainerPort.saveReserve).not.toHaveBeenCalled();
    expect(createdReserve).toBeNull();
    expect(notifierPort.createReserveNotification).not.toHaveBeenCalled();
  });

  it("shouldn't create a reserve if centresId doesn't exist", async () => {
    const reserveWithoutCentresId = new Reserve(
        "trainer-id",
        "centres-id",
        "reserve-id",
        "reserve-name",
        "reserve-surname",
        "reserve-email",
        "reserve-telephone",
        "team-id",
        "reserve-material",
        new Date(),
        new Date(),
      );

    const createReserveUseCase = new CreateReserveUseCase(
      trainerPort,
      notifierPort
    );

    const centre = new Centres("trainer-id", "centre-id", "centre-name", "centre-location", [], "centre-imageUrl")
    const trainer = new Trainer(
      "trainer-id",
      "trainer-name",
      "trainer-surname",
      "trainer-email@example.com",
      [],
      "http://example.com/image.jpg",
      [centre]
    );

    (trainerPort.findById as jest.Mock).mockResolvedValueOnce(trainer);

    await expect(
      createReserveUseCase.run("trainer-id", "nonexistent-centres-id", reserveWithoutCentresId)
    ).rejects.toThrow("Centre not found");

    expect(trainerPort.findById).toHaveBeenCalledWith("trainer-id");
    expect(trainerPort.saveReserve).not.toHaveBeenCalled();
    expect(notifierPort.createReserveNotification).not.toHaveBeenCalled();
  });
});
