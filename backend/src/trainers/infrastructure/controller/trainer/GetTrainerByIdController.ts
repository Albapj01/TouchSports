import { Request, Response } from "express";
import { GetTrainerByIdUseCase } from "../../../application/usecases/trainer/GetTrainerByIdUseCase";

export class GetTrainerByIdController {
  constructor(private getTrainerByIdUseCase: GetTrainerByIdUseCase) {}

  async handle(req: Request, res: Response) {
    const trainerData = req.params.id;

    try {
      const trainer = await this.getTrainerByIdUseCase.run(trainerData);
      res.status(201).send({ message: "Obtained", trainer });
    } catch (error) {
      return res.status(500).send({ message: "Error" });
    }
  }
}
