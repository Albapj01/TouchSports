import { GetTrainerByIdUseCase } from "../../../../../src/trainers/application/usecases/trainer/GetTrainerByIdUseCase";
import { Trainer } from "../../../../../src/trainers/domain/model/Trainer";
import { trainerPort } from "../JestFunctions";

describe("GetTrainerById", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should get a trainer by id", async () => {
    const trainers: Trainer[] = [
      new Trainer(
        "trainer-id-1",
        "John",
        "Doe",
        "john@example.com",
        "123456789",
        [],
        "http://example.com/john.jpg",
        []
      ),
      new Trainer(
        "trainer-id-2",
        "Jane",
        "Smith",
        "jane@example.com",
        "987654321",
        [],
        "http://example.com/jane.jpg",
        []
      ),
    ];

    (trainerPort.findById as jest.Mock).mockResolvedValue(trainers[1]);

    const getTrainerByIdUseCase = new GetTrainerByIdUseCase(trainerPort);

    const obtainedTrainer = await getTrainerByIdUseCase.run("trainer-id-2");

    expect(trainerPort.findById).toHaveBeenCalledWith("trainer-id-2");
    expect(obtainedTrainer).toEqual(trainers[1]);
  });

  it("shouldn't get a trainer with an incorrect id", async () => {
    (trainerPort.findById as jest.Mock).mockResolvedValue(null);

    const getTrainerByIdUseCase = new GetTrainerByIdUseCase(trainerPort);

    const obtainedTrainer = await getTrainerByIdUseCase.run("nonexistent-id");

    expect(trainerPort.findById).toHaveBeenCalledWith("nonexistent-id");
    expect(obtainedTrainer).toBeNull();
  });
});
