import { GetAllTrainersUseCase } from "../../../../../src/trainers/application/usecases/trainer/GetAllTrainersUseCase";
import { Trainer } from "../../../../../src/trainers/domain/model/Trainer";
import { trainerPort } from "../JestFunctions";

describe("GetAllTrainers", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should get all trainers", async () => {
    const trainers: Trainer[] = [
      new Trainer(
        "trainer-id-1",
        "John",
        "Doe",
        "john@example.com",
        [],
        "http://example.com/john.jpg",
        []
      ),
      new Trainer(
        "trainer-id-2",
        "Jane",
        "Smith",
        "jane@example.com",
        [],
        "http://example.com/jane.jpg",
        []
      ),
    ];

    (trainerPort.getAllTrainers as jest.Mock).mockResolvedValue(trainers);

    const getAllTrainerUseCase = new GetAllTrainersUseCase(trainerPort);

    const obtainedTrainers = await getAllTrainerUseCase.run();

    expect(trainerPort.getAllTrainers).toHaveBeenCalledWith();
    expect(obtainedTrainers).toEqual(trainers);
  });
});
