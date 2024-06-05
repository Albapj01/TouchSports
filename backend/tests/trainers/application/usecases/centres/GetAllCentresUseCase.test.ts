import { GetAllCentresUseCase } from "../../../../../src/trainers/application/usecases/centres/GetAllCentresUseCase";
import { Centres } from "../../../../../src/trainers/domain/model/Centres";
import { Trainer } from "../../../../../src/trainers/domain/model/Trainer";
import { trainerPort } from "../JestFunctions";

describe("GetAllCentres", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should get all centres", async () => {
    const centres: Centres[] = [
      new Centres("trainer-id", "centre-id-1", "centre-name-1", "centre-location-1", [], "centre-imageUrl-1"),
      new Centres("trainer-id", "centre-id-2", "centre-name-2", "centre-location-2", [], "centre-imageUrl-2"),
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

    const getAllCentresUseCase = new GetAllCentresUseCase(trainerPort);

    const obtainedCentres = await getAllCentresUseCase.run("trainer-id");

    expect(trainerPort.findById).toHaveBeenCalledWith("trainer-id");
    expect(obtainedCentres).toEqual(centres);
  });

  it("shouldn't get all centres if trainerId doesn't exist", async () => {
    const getAllCentresUseCase = new GetAllCentresUseCase(trainerPort);

    (trainerPort.findById as jest.Mock).mockResolvedValueOnce(null);

    const obtaniedCentres = await getAllCentresUseCase.run("");

    expect(trainerPort.findById).toHaveBeenCalled();
    expect(obtaniedCentres).toBeNull();
  });
});
