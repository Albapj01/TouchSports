import { Request, Response } from "express";
import { GetAllCentresUseCase } from "../../application/usecases/GetAllCentresUseCase";

export class GetAllCentresController {
  constructor(private getAllCentresUseCase: GetAllCentresUseCase) {}

  async handle(req: Request, res: Response) {
    const trainerId = req.params.trainerId;

    try {
      await this.getAllCentresUseCase.run(trainerId);
    } catch (error) {
      return res.status(500).send({ message: "Error" });
    }

    res.status(201).send({ message: "Obtained centres" });
  }
}
