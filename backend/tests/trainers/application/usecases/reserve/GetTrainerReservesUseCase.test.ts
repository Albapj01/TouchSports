import { GetTrainerReservesUseCase } from "../../../../../src/trainers/application/usecases/reserve/GetTrainerReservesUseCase";
import { Reserve } from "../../../../../src/trainers/domain/model/Reserve";
import { Centres } from "../../../../../src/trainers/domain/model/Centres";
import { Trainer } from "../../../../../src/trainers/domain/model/Trainer";
import { trainerPort } from "../JestFunctions";

describe("GetTrainerReservesUseCase", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should get all reserves of a trainer", async () => {
    const reserve1 = new Reserve(
      "trainer-id",
      "centres-id-1",
      "reserve-id-1",
      "reserve-name-1",
      "reserve-surname-1",
      "reserve-email-1",
      "reserve-telephone-1",
      "team-id-1",
      "reserve-material-1",
      new Date(),
      new Date()
    );

    const reserve2 = new Reserve(
      "trainer-id",
      "centres-id-2",
      "reserve-id-2",
      "reserve-name-2",
      "reserve-surname-2",
      "reserve-email-2",
      "reserve-telephone-2",
      "team-id-2",
      "reserve-material-2",
      new Date(),
      new Date()
    );
    
    const reserves: Reserve[] = [reserve1, reserve2];
    const centres: Centres[] = [
      new Centres(
        "trainer-id",
        "centres-id-1",
        "centre-name-1",
        "centre-location-1",
        [reserve1],
        "centre-imageUrl-1"
      ),
      new Centres(
        "trainer-id",
        "centres-id-2",
        "centre-name-2",
        "centre-location-2",
        [reserve2],
        "centre-imageUrl-2"
      ),
    ];
    const trainer = new Trainer(
      "trainer-id",
      "trainer-name",
      "trainer-surname",
      "trainer-email@example.com",
      [],
      "http://example.com/image.jpg",
      centres
    );

    (trainerPort.findById as jest.Mock).mockResolvedValue(trainer);

    const getTrainerReservesUseCase = new GetTrainerReservesUseCase(
      trainerPort
    );

    const obtainedReserves = await getTrainerReservesUseCase.run("trainer-id");

    expect(trainerPort.findById).toHaveBeenCalledWith("trainer-id");
    expect(obtainedReserves).toEqual(reserves);
  });

  it("should return an empty array if trainer has no reserves", async () => {
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

    const getTrainerReservesUseCase = new GetTrainerReservesUseCase(
      trainerPort
    );

    const obtainedReserves = await getTrainerReservesUseCase.run("trainer-id");

    expect(trainerPort.findById).toHaveBeenCalledWith("trainer-id");
    expect(obtainedReserves).toEqual([]);
  });

  it("shouldn't get reserves if trainer does not exist", async () => {
    (trainerPort.findById as jest.Mock).mockResolvedValueOnce(null);

    const getTrainerReservesUseCase = new GetTrainerReservesUseCase(
      trainerPort
    );

    const obtainedReserves = await getTrainerReservesUseCase.run(
      "nonexistent-trainer-id"
    );

    expect(trainerPort.findById).toHaveBeenCalledWith("nonexistent-trainer-id");
    expect(obtainedReserves).toBeNull();
  });
});
