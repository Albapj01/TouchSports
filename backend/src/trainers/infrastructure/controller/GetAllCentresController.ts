import { Request, Response } from "express";
import { GetAllCentresUseCase } from "../../application/usecases/GetAllCentresUseCase";

export class GetAllCentresController {
  constructor(private getAllCentresUseCase: GetAllCentresUseCase) {}

  async handle(req: Request, res: Response) {
    const trainerId = req.params.trainerId;

    try {
      const centres = await this.getAllCentresUseCase.run(trainerId);
      res.status(201).send({ message: "Obtained centres", centres });
    } catch (error) {
      return res.status(500).send({ message: "Error" });
    }
  }
}
