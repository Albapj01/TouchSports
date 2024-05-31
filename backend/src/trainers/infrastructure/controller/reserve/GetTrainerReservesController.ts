import { Request, Response } from "express";
import { GetTrainerReservesUseCase } from "../../../application/usecases/reserve/GetTrainerReservesUseCase";

export class GetTrainerReservesController {
  constructor(private getTrainerReservesUseCase: GetTrainerReservesUseCase) {}

  async handle(req: Request, res: Response) {
    const trainerId = req.params.trainerId;

    try {
      const reserves = await this.getTrainerReservesUseCase.run(trainerId);
      res
        .status(201)
        .send({ message: "Obtained all reserves of a trainer", reserves });
    } catch (error) {
      return res.status(500).send({ message: "Error" });
    }
  }
}
