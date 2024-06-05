import { DeleteCentresByIdUseCase } from "../../../../../src/trainers/application/usecases/centres/DeleteCentresByIdUseCase";
import { Centres } from "../../../../../src/trainers/domain/model/Centres";
import { Trainer } from "../../../../../src/trainers/domain/model/Trainer";
import { trainerPort } from "../JestFunctions";

describe("DeleteCentreById", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should delete a centre by id", async () => {
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

    const deleteCentresByIdUseCase = new DeleteCentresByIdUseCase(trainerPort);

    await deleteCentresByIdUseCase.run("trainer-id", "centre-id-2");

    expect(trainerPort.findById).toHaveBeenCalledWith("trainer-id");
    expect(trainerPort.deleteCentres).toHaveBeenCalledWith(
      [
        new Centres(
          "trainer-id",
          "centre-id-1",
          "centre-name-1",
          "centre-location-1",
          [],
          "centre-imageUrl-1"
        ),
      ],
      "trainer-id"
    );
  });

  it("shouldn't delete a centre if trainerId doesn't exist", async () => {
    const deleteCentresByIdUseCase = new DeleteCentresByIdUseCase(trainerPort);

    (trainerPort.findById as jest.Mock).mockResolvedValueOnce(null);

    await deleteCentresByIdUseCase.run("nonexistent-trainer-id", "centre-id");

    expect(trainerPort.findById).toHaveBeenCalledWith("nonexistent-trainer-id");
    expect(trainerPort.deleteCentres).not.toHaveBeenCalled();
  });

  it("shouldn't delete a centre if centresId doesn't exist", async () => {
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

    const deleteCentresByIdUseCase = new DeleteCentresByIdUseCase(trainerPort);

    (trainerPort.findById as jest.Mock).mockResolvedValueOnce(trainer);

    await expect(
      deleteCentresByIdUseCase.run("trainer-id", "nonexistent-centre-id")
    ).rejects.toThrow("Centre not found");

    expect(trainerPort.findById).toHaveBeenCalledWith("trainer-id");
    expect(trainerPort.deleteCentres).not.toHaveBeenCalled();
  });
});
