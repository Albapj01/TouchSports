import { Request, Response } from "express";
import { GetTrainerByEmailUseCase } from "../../../application/usecases/trainer/GetTrainerByEmailUseCase";

export class GetTrainerByEmailController {
  constructor(private getTrainerByEmailUseCase: GetTrainerByEmailUseCase) {}

  async handle(req: Request, res: Response) {
    const trainerData = req.params.email;

    try {
      const trainer = await this.getTrainerByEmailUseCase.run(trainerData);
      res.status(201).send({ message: "Obtained", trainer });
    } catch (error) {
      return res.status(500).send({ message: "Error", error });
    }
  }
}
