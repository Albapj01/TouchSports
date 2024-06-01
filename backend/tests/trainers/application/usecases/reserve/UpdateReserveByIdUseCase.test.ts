import { UpdateReserveByIdUseCase } from "../../../../../src/trainers/application/usecases/reserve/UpdateReserveByIdUseCase";
import { Reserve } from "../../../../../src/trainers/domain/model/Reserve";
import { Centres } from "../../../../../src/trainers/domain/model/Centres";
import { Team } from "../../../../../src/trainers/domain/model/Team";
import { Trainer } from "../../../../../src/trainers/domain/model/Trainer";
import { trainerPort, notifierPort } from "../JestFunctions";

describe("UpdateReserveByIdUseCase", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should update a reserve by id", async () => {
    const originalReserve = new Reserve(
      "trainer-id",
      "centres-id",
      "reserve-id",
      "original-name",
      "original-surname",
      "original-email",
      "original-telephone",
      "team-id",
      "original-material",
      new Date(),
      new Date()
    );

    const updatedReserve = new Reserve(
      "trainer-id",
      "centres-id",
      "reserve-id",
      "updated-name",
      "updated-surname",
      "updated-email",
      "updated-telephone",
      "team-id",
      "updated-material",
      new Date(),
      new Date()
    );

    const centre = new Centres(
      "trainer-id",
      "centres-id",
      "centre-name",
      "centre-location",
      [originalReserve],
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

    const updateReserveByIdUseCase = new UpdateReserveByIdUseCase(
      trainerPort,
      notifierPort
    );

    await updateReserveByIdUseCase.run(
      "trainer-id",
      "centres-id",
      "reserve-id",
      updatedReserve
    );

    expect(trainerPort.findById).toHaveBeenCalledWith("trainer-id");
    expect(trainerPort.updateReserve).toHaveBeenCalledWith(
      [updatedReserve],
      "trainer-id",
      "centres-id"
    );
    expect(notifierPort.updateReserveNotification).toHaveBeenCalled();
  });

  it("should update a reserve by id but not notify if teamId doesn't exist", async () => {
    const originalReserve = new Reserve(
      "trainer-id",
      "centres-id",
      "reserve-id",
      "original-name",
      "original-surname",
      "original-email",
      "original-telephone",
      "team-id",
      "original-material",
      new Date(),
      new Date()
    );
  
    const updatedReserve = new Reserve(
      "trainer-id",
      "centres-id",
      "reserve-id",
      "updated-name",
      "updated-surname",
      "updated-email",
      "updated-telephone",
      "nonexistent-team-id",
      "updated-material",
      new Date(),
      new Date()
    );
  
    const centre = new Centres(
      "trainer-id",
      "centres-id",
      "centre-name",
      "centre-location",
      [originalReserve],
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
  
    const updateReserveByIdUseCase = new UpdateReserveByIdUseCase(
      trainerPort,
      notifierPort
    );
  
    await updateReserveByIdUseCase.run(
      "trainer-id",
      "centres-id",
      "reserve-id",
      updatedReserve
    );
  
    expect(trainerPort.findById).toHaveBeenCalledWith("trainer-id");
    expect(trainerPort.updateReserve).toHaveBeenCalledWith(
      [updatedReserve],
      "trainer-id",
      "centres-id"
    );
    expect(notifierPort.updateReserveNotification).not.toHaveBeenCalled();
  });
  

  it("shouldn't update a reserve if trainer doesn't exist", async () => {
    const reserve: Reserve = new Reserve(
      "trainer-id",
      "centres-id",
      "reserve-id",
      "updated-name",
      "updated-surname",
      "updated-email",
      "updated-telephone",
      "team-id",
      "updated-material",
      new Date(),
      new Date()
    );

    (trainerPort.findById as jest.Mock).mockResolvedValueOnce(null);

    const updateReserveByIdUseCase = new UpdateReserveByIdUseCase(
      trainerPort,
      notifierPort
    );

    const result = await updateReserveByIdUseCase.run(
      "nonexistent-trainer-id",
      "centres-id",
      "reserve-id",
      reserve
    );

    expect(trainerPort.findById).toHaveBeenCalledWith("nonexistent-trainer-id");
    expect(result).toBeNull();
    expect(trainerPort.updateReserve).not.toHaveBeenCalled();
    expect(notifierPort.updateReserveNotification).not.toHaveBeenCalled();
  });

  it("shouldn't update a reserve if centre doesn't exist", async () => {
    const reserve = new Reserve(
      "trainer-id",
      "centres-id",
      "reserve-id",
      "updated-name",
      "updated-surname",
      "updated-email",
      "updated-telephone",
      "team-id",
      "updated-material",
      new Date(),
      new Date()
    );
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

    const updateReserveByIdUseCase = new UpdateReserveByIdUseCase(
      trainerPort,
      notifierPort
    );

    await expect(
      updateReserveByIdUseCase.run(
        "trainer-id",
        "nonexistent-centre-id",
        "reserve-id",
        reserve
      )
    ).rejects.toThrow("Centre not found");

    expect(trainerPort.findById).toHaveBeenCalledWith("trainer-id");
    expect(trainerPort.updateReserve).not.toHaveBeenCalled();
    expect(notifierPort.updateReserveNotification).not.toHaveBeenCalled();
  });

  it("shouldn't update a reserve if reserveId doesn't exist", async () => {
    const originalReserve = new Reserve(
      "trainer-id",
      "centres-id",
      "existing-reserve-id",
      "original-name",
      "original-surname",
      "original-email",
      "original-telephone",
      "team-id",
      "original-material",
      new Date(),
      new Date()
    );
  
    const updatedReserve = new Reserve(
      "trainer-id",
      "centres-id",
      "nonexistent-reserve-id", 
      "updated-name",
      "updated-surname",
      "updated-email",
      "updated-telephone",
      "team-id",
      "updated-material",
      new Date(),
      new Date()
    );
  
    const centre = new Centres(
      "trainer-id",
      "centres-id",
      "centre-name",
      "centre-location",
      [originalReserve],
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
  
    const updateReserveByIdUseCase = new UpdateReserveByIdUseCase(
      trainerPort,
      notifierPort
    );
  
    await expect(
      updateReserveByIdUseCase.run(
        "trainer-id",
        "centres-id",
        "nonexistent-reserve-id", 
        updatedReserve
      )
    ).rejects.toThrow("Reserve not found");
  
    expect(trainerPort.findById).toHaveBeenCalledWith("trainer-id");
    expect(trainerPort.updateReserve).not.toHaveBeenCalled();
    expect(notifierPort.updateReserveNotification).not.toHaveBeenCalled();
  });
  
});
