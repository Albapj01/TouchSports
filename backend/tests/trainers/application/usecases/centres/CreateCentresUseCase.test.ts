import { CreateCentresUseCase } from "../../../../../src/trainers/application/usecases/centres/CreateCentresUseCase";
import { Centres } from "../../../../../src/trainers/domain/model/Centres";
import { trainerPort } from "../JestFunctions";

describe("CreateCentre", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should create a centre", async () => {
    const centre = new Centres("trainer-id", "centre-id", "centre-name", "centre-location", [], "centre-imageUrl");
    const createCentresUseCase = new CreateCentresUseCase(trainerPort);

    (trainerPort.findById as jest.Mock).mockResolvedValueOnce({
      centres: [],
    });

    await createCentresUseCase.run(centre);

    expect(trainerPort.saveCentres).toHaveBeenCalledWith(centre, expect.any(Object));
  });

  it("shouldn't create a centre if trainerId doesn't exist", async () => {
    const centreWithoutTrainerId = new Centres("", "centre-id", "centre-name", "centre-location", [], "centre-imageUrl");
    const createCentresUseCase = new CreateCentresUseCase(trainerPort);

    (trainerPort.findById as jest.Mock).mockResolvedValueOnce(null);

    const createdCentre = await createCentresUseCase.run(centreWithoutTrainerId);

    expect(trainerPort.saveCentres).not.toHaveBeenCalled();
    expect(createdCentre).toBeNull();
  });
});
