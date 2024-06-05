import { CreateTrainerUseCase } from "../../../../../src/trainers/application/usecases/trainer/CreateTrainerUseCase";
import { Trainer } from "../../../../../src/trainers/domain/model/Trainer";
import { trainerPort } from "../JestFunctions";

describe("CreateTrainer", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  const trainer = new Trainer(
    "trainer-id",
    "trainer-name",
    "trainer-surname",
    "trainer-email@example.com",
    [],
    "http://example.com/image.jpg",
    []
  );

  it("should create a trainer", async () => {
    const createTrainerUseCase = new CreateTrainerUseCase(trainerPort);

    await createTrainerUseCase.run(trainer);

    expect(trainerPort.saveTrainer).toHaveBeenCalledWith(trainer);
  });
});
