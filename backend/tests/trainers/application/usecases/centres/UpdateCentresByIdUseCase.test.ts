import { UpdateCentresByIdUseCase } from "../../../../../src/trainers/application/usecases/centres/UpdateCentresByIdUseCase";
import { Centres } from "../../../../../src/trainers/domain/model/Centres";
import { Trainer } from "../../../../../src/trainers/domain/model/Trainer";
import { trainerPort } from "../JestFunctions";

describe("UpdateCentreById", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should update a centre by id", async () => {
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

    const updateCentresByIdUseCase = new UpdateCentresByIdUseCase(trainerPort);
    const updatedCentre = new Centres(
      "trainer-id",
      "centre-id-2",
      "updated-centre-name",
      "centre-location-2",
      [],
      "centre-imageUrl-2"
    );

    await updateCentresByIdUseCase.run("trainer-id", "centre-id-2", updatedCentre);

    const existingCentre = trainer.centres.find(
      (centre) => centre.centresId === "centre-id-2"
    );

    expect(trainerPort.findById).toHaveBeenCalledWith("trainer-id");
    expect(trainerPort.updateCentres).toHaveBeenCalledWith(
      trainer.centres,
      "trainer-id"
    );
    expect(existingCentre).toBeDefined();
    if (existingCentre) {
      expect(existingCentre.name).toEqual("updated-centre-name");
    }
    expect(updatedCentre.trainerId).toEqual(centres[1].trainerId);
    expect(updatedCentre.centresId).toEqual(centres[1].centresId);
    expect(updatedCentre.reserves).toEqual(centres[1].reserves);
    expect(updatedCentre.location).toEqual(centres[1].location);
    expect(updatedCentre.imageUrl).toEqual(centres[1].imageUrl);
    expect(updatedCentre.name).not.toEqual(centres[1].name);
  });

  it("shouldn't update a centre if trainerId doesn't exist", async () => {
    const centreWithoutTrainerId = new Centres("", "centre-id", "centre-name", "centre-location", [], "centre-imageUrl");
    const updateCentresByIdUseCase = new UpdateCentresByIdUseCase(trainerPort);

    (trainerPort.findById as jest.Mock).mockResolvedValueOnce(null);

    const updatedCentre = await updateCentresByIdUseCase.run(
      "nonexistent-trainer-id",
      "centre-id",
      centreWithoutTrainerId
    );

    expect(trainerPort.findById).toHaveBeenCalledWith("nonexistent-trainer-id");
    expect(trainerPort.updateCentres).not.toHaveBeenCalled();
    expect(updatedCentre).toBeNull();
  });

  it("shouldn't update a centre if centresIs doesn't exist", async () => {
    const centres: Centres[] = [
      new Centres("trainer-id", "centre-id", "centre-name", "centre-location", [], "centre-imageUrl"),
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

    const updateCentresByIdUseCase = new UpdateCentresByIdUseCase(trainerPort);

    (trainerPort.findById as jest.Mock).mockResolvedValueOnce(trainer);

    const updatedCentre = new Centres(
      "trainer-id",
      "nonexistent-centre-id",
      "updated-centre-name",
      "centre-location",
      [],
      "centre-imageUrl"
    );

    await expect(
        updateCentresByIdUseCase.run(
        "trainer-id",
        "nonexistent-centre-id",
        updatedCentre
      )
    ).rejects.toThrow("Centre not found");

    expect(trainerPort.findById).toHaveBeenCalledWith("trainer-id");
    expect(trainerPort.updateCentres).not.toHaveBeenCalled();
  });
});
