import { GetTrainerByEmailUseCase } from "../../../../../src/trainers/application/usecases/trainer/GetTrainerByEmailUseCase";
import { Trainer } from "../../../../../src/trainers/domain/model/Trainer";
import { trainerPort } from "../JestFunctions";

describe("GetTrainerByEmail", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should get a trainer by email", async () => {
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

    (trainerPort.findByEmail as jest.Mock).mockResolvedValue(trainers[1]);

    const getTrainerByEmailUseCase = new GetTrainerByEmailUseCase(trainerPort);

    const obtainedTrainer = await getTrainerByEmailUseCase.run(
      "jane@example.com"
    );

    expect(trainerPort.findByEmail).toHaveBeenCalledWith("jane@example.com");
    expect(obtainedTrainer).toEqual(trainers[1]);
  });

  it("shouldn't get a trainer with an incorrect email", async () => {
    (trainerPort.findByEmail as jest.Mock).mockResolvedValue(null);

    const getTrainerByEmailUseCase = new GetTrainerByEmailUseCase(trainerPort);

    const obtainedTrainer = await getTrainerByEmailUseCase.run(
      "nonexistent@example.com"
    );

    expect(trainerPort.findByEmail).toHaveBeenCalledWith(
      "nonexistent@example.com"
    );
    expect(obtainedTrainer).toBeNull();
  });
});
