import { DeleteReserveByIdUseCase } from "../../../../../src/trainers/application/usecases/reserve/DeleteReserveByIdUseCase";
import { Reserve } from "../../../../../src/trainers/domain/model/Reserve";
import { Centres } from "../../../../../src/trainers/domain/model/Centres";
import { Team } from "../../../../../src/trainers/domain/model/Team";
import { Trainer } from "../../../../../src/trainers/domain/model/Trainer";
import { trainerPort, notifierPort } from "../JestFunctions";

describe("DeleteReserveByIdUseCase", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should delete a reserve by id and should notify the delete of a reserve", async () => {
    const reserveToDelete = new Reserve(
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
      new Date()
    );

    const centre = new Centres(
      "trainer-id",
      "centres-id",
      "centre-name",
      "centre-location",
      [reserveToDelete],
      "centre-imageUrl"
    );

    const team = new Team("trainer-id", "team-id", "team-name", []);
    const trainer = new Trainer(
      "trainer-id",
      "trainer-name",
      "trainer-surname",
      "trainer-email@example.com",
      "123456789",
      [team],
      "http://example.com/image.jpg",
      [centre]
    );

    (trainerPort.findById as jest.Mock).mockResolvedValueOnce(trainer);

    const deleteReserveByIdUseCase = new DeleteReserveByIdUseCase(
      trainerPort,
      notifierPort
    );

    await deleteReserveByIdUseCase.run(
      "trainer-id",
      "centres-id",
      "reserve-id"
    );

    expect(trainerPort.findById).toHaveBeenCalledWith("trainer-id");
    expect(trainerPort.deleteReserve).toHaveBeenCalledWith(
      centre.reserves,
      "centres-id",
      "trainer-id"
    );
    expect(notifierPort.deleteReserveNotification).toHaveBeenCalled();
  });
  
  it("should delete a reserve by id and shouldn't notify if teamId doesn't exist", async () => {
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
      new Date()
    );
  
    const centre = new Centres(
      "trainer-id",
      "centres-id",
      "centre-name",
      "centre-location",
      [reserve],
      "centre-imageUrl"
    );
  
    const trainer = new Trainer(
      "trainer-id",
      "trainer-name",
      "trainer-surname",
      "trainer-email@example.com",
      "123456789",
      [],
      "http://example.com/image.jpg",
      [centre]
    );
  
    (trainerPort.findById as jest.Mock).mockResolvedValueOnce(trainer);
  
    const deleteReserveByIdUseCase = new DeleteReserveByIdUseCase(
      trainerPort,
      notifierPort
    );
  
    await expect(
      deleteReserveByIdUseCase.run("trainer-id", "centres-id", "reserve-id")
    ).resolves.toBeNull();
  
    expect(trainerPort.findById).toHaveBeenCalledWith("trainer-id");
    expect(notifierPort.deleteReserveNotification).not.toHaveBeenCalled();
  });
  

  it("shouldn't delete a reserve if trainer doesn't exist", async () => {
    (trainerPort.findById as jest.Mock).mockResolvedValueOnce(null);

    const deleteReserveByIdUseCase = new DeleteReserveByIdUseCase(
      trainerPort,
      notifierPort
    );

    const result = await deleteReserveByIdUseCase.run(
      "nonexistent-trainer-id",
      "centres-id",
      "reserve-id"
    );

    expect(trainerPort.findById).toHaveBeenCalledWith("nonexistent-trainer-id");
    expect(trainerPort.deleteReserve).not.toHaveBeenCalled();
    expect(notifierPort.deleteReserveNotification).not.toHaveBeenCalled();
    expect(result).toBeNull();
  });

  it("shouldn't delete a reserve if centre doesn't exist", async () => {
    const trainer = new Trainer(
      "trainer-id",
      "trainer-name",
      "trainer-surname",
      "trainer-email@example.com",
      "123456789",
      [],
      "http://example.com/image.jpg",
      []
    );

    (trainerPort.findById as jest.Mock).mockResolvedValueOnce(trainer);

    const deleteReserveByIdUseCase = new DeleteReserveByIdUseCase(
      trainerPort,
      notifierPort
    );

    await expect(
      deleteReserveByIdUseCase.run(
        "trainer-id",
        "nonexistent-centre-id",
        "reserve-id"
      )
    ).rejects.toThrow("Centre not found");

    expect(trainerPort.findById).toHaveBeenCalledWith("trainer-id");
    expect(trainerPort.deleteReserve).not.toHaveBeenCalled();
    expect(notifierPort.deleteReserveNotification).not.toHaveBeenCalled();
  });

  it("shouldn't delete a reserve if reserve doesn't exist", async () => {
    const centre = new Centres(
      "trainer-id",
      "centres-id",
      "centre-name",
      "centre-location",
      [],
      "centre-imageUrl"
    );

    const trainer = new Trainer(
      "trainer-id",
      "trainer-name",
      "trainer-surname",
      "trainer-email@example.com",
      "123456789",
      [],
      "http://example.com/image.jpg",
      [centre]
    );

    (trainerPort.findById as jest.Mock).mockResolvedValueOnce(trainer);

    const deleteReserveByIdUseCase = new DeleteReserveByIdUseCase(
      trainerPort,
      notifierPort
    );

    await expect(
      deleteReserveByIdUseCase.run(
        "trainer-id",
        "centres-id",
        "nonexistent-reserve-id"
      )
    ).rejects.toThrow("Reserve not found");

    expect(trainerPort.findById).toHaveBeenCalledWith("trainer-id");
    expect(trainerPort.deleteReserve).not.toHaveBeenCalled();
    expect(notifierPort.deleteReserveNotification).not.toHaveBeenCalled();
  });

  it("shouldn't notify if team doesn't exist", async () => {
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
      new Date()
    );

    const centre = new Centres(
      "trainer-id",
      "centres-id",
      "centre-name",
      "centre-location",
      [reserve],
      "centre-imageUrl"
    );

    const trainer = new Trainer(
      "trainer-id",
      "trainer-name",
      "trainer-surname",
      "trainer-email@example.com",
      "123456789",
      [],
      "http://example.com/image.jpg",
      [centre]
    );

    (trainerPort.findById as jest.Mock).mockResolvedValueOnce(trainer);

    const deleteReserveByIdUseCase = new DeleteReserveByIdUseCase(
      trainerPort,
      notifierPort
    );

    await expect(
      deleteReserveByIdUseCase.run("trainer-id", "centres-id", "reserve-id")
    ).resolves.toBeNull();

    expect(trainerPort.findById).toHaveBeenCalledWith("trainer-id");
    expect(trainerPort.deleteReserve).not.toHaveBeenCalled();
    expect(notifierPort.deleteReserveNotification).not.toHaveBeenCalled();
  });
});
