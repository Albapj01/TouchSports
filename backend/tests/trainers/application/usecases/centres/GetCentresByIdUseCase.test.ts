import { GetCentresByIdUseCase } from "../../../../../src/trainers/application/usecases/centres/GetCentresByIdUseCase";
import { Centres } from "../../../../../src/trainers/domain/model/Centres";
import { Trainer } from "../../../../../src/trainers/domain/model/Trainer";
import { trainerPort } from "../JestFunctions";

describe("GetCentreById", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should get a centre by id", async () => {
    const centres: Centres[] = [
      new Centres(
        "trainer-id",
        "centre-id-1",
        "centre-name-1",
        "centre-location-1",
        [],
        "centre-imageUrl-1"
      ),
      new Centres(
        "trainer-id",
        "centre-id-2",
        "centre-name-2",
        "centre-location-2",
        [],
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

    const getCentresByIdUseCase = new GetCentresByIdUseCase(trainerPort);

    const obtainedCentre = await getCentresByIdUseCase.run(
      "trainer-id",
      "centre-id-2"
    );

    expect(trainerPort.findById).toHaveBeenCalledWith("trainer-id");
    expect(obtainedCentre).toEqual(centres[1]);
  });

  it("shouldn't get a centre with an incorrect trainerId", async () => {
    (trainerPort.findById as jest.Mock).mockResolvedValue(null);

    const getCentresByIdUseCase = new GetCentresByIdUseCase(trainerPort);

    const obtainedCentre = await getCentresByIdUseCase.run(
      "nonexistent-id",
      "centre-id-2"
    );

    expect(trainerPort.findById).toHaveBeenCalledWith("nonexistent-id");
    expect(obtainedCentre).toBeNull();
  });

  it("shouldn't get a centre with an incorrect centresId", async () => {
    const centres: Centres[] = [
      new Centres(
        "trainer-id",
        "centre-id-1",
        "centre-name-1",
        "centre-location-1",
        [],
        "centre-imageUrl-1"
      ),
      new Centres(
        "trainer-id",
        "centre-id-2",
        "centre-name-2",
        "centre-location-2",
        [],
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

    const getCentresByIdUseCase = new GetCentresByIdUseCase(trainerPort);

    const obtainedCentre = await getCentresByIdUseCase.run(
      "trainer-id",
      "nonexistent-id"
    );

    expect(trainerPort.findById).toHaveBeenCalledWith("trainer-id");
    expect(obtainedCentre).toBeNull();
  });
});
