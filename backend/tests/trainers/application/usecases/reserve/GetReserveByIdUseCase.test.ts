import { GetReserveByIdUseCase } from "../../../../../src/trainers/application/usecases/reserve/GetReserveByIdUseCase";
import { Reserve } from "../../../../../src/trainers/domain/model/Reserve";
import { Centres } from "../../../../../src/trainers/domain/model/Centres";
import { Trainer } from "../../../../../src/trainers/domain/model/Trainer";
import { trainerPort } from "../JestFunctions";

describe("GetReserveByIdUseCase", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should get a reserve by id", async () => {
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

    (trainerPort.findById as jest.Mock).mockResolvedValue(trainer);

    const getReserveByIdUseCase = new GetReserveByIdUseCase(trainerPort);

    const obtainedReserve = await getReserveByIdUseCase.run(
      "trainer-id",
      "centres-id",
      "reserve-id"
    );

    expect(trainerPort.findById).toHaveBeenCalledWith("trainer-id");
    expect(obtainedReserve).toEqual({
      trainerId: "trainer-id",
      centresId: "centres-id",
      reserveId: "reserve-id",
      name: "reserve-name",
      surname: "reserve-surname",
      email: "reserve-email",
      telephone: "reserve-telephone",
      teamId: "team-id",
      material: "reserve-material",
      startReserve: reserve.startReserve,
      endReserve: reserve.endReserve,
    });
  });

  it("shouldn't get a reserve if trainerId doesn't exist", async () => {
    const getReserveByIdUseCase = new GetReserveByIdUseCase(trainerPort);

    (trainerPort.findById as jest.Mock).mockResolvedValueOnce(null);

    const obtainedReserve = await getReserveByIdUseCase.run(
      "nonexistent-trainer-id",
      "centres-id",
      "reserve-id"
    );

    expect(trainerPort.findById).toHaveBeenCalledWith("nonexistent-trainer-id");
    expect(obtainedReserve).toBeNull();
  });

  it("shouldn't get a reserve if centresId doesn't exist", async () => {
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

    const getReserveByIdUseCase = new GetReserveByIdUseCase(trainerPort);

    (trainerPort.findById as jest.Mock).mockResolvedValueOnce(trainer);

    const obtainedReserve = await getReserveByIdUseCase.run(
      "trainer-id",
      "nonexistent-centres-id",
      "reserve-id"
    );

    expect(trainerPort.findById).toHaveBeenCalledWith("trainer-id");
    expect(obtainedReserve).toBeNull();
  });

  it("shouldn't get a reserve if reserveId doesn't exist", async () => {
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

    const getReserveByIdUseCase = new GetReserveByIdUseCase(trainerPort);

    (trainerPort.findById as jest.Mock).mockResolvedValueOnce(trainer);

    const obtainedReserve = await getReserveByIdUseCase.run(
      "trainer-id",
      "centres-id",
      "nonexistent-reserve-id"
    );

    expect(trainerPort.findById).toHaveBeenCalledWith("trainer-id");
    expect(obtainedReserve).toBeNull();
  });
});
