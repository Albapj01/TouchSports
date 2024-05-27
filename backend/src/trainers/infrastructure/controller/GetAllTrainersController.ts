import { Request, Response } from "express";
import { GetAllTrainersUseCase } from "../../application/usecases/GetAllTrainersUseCase";

export class GetAllTrainersController {
  constructor(private getAllTrainersUseCase: GetAllTrainersUseCase) {}

  async handle(req: Request, res: Response) {
    try {
      const trainers = await this.getAllTrainersUseCase.run();
      res.status(201).send({ message: "Obtained trainers", trainers });
    } catch (error) {
      return res.status(500).send({ message: "Error" });
    }
  }
}
