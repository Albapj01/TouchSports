import { Request, Response } from "express";
import { GetAllReservesUseCase } from "../../application/usecases/GetAllReservesUseCase";

export class GetAllReservesController {
  constructor(private getAllReservesUseCase: GetAllReservesUseCase) {}

  async handle(req: Request, res: Response) {
    try {
      const reserves = await this.getAllReservesUseCase.run(req.params.trainerId, req.params.centresId);
      res.status(201).send({ message: "Obtained reserves", reserves });
    } catch (error) {
      return res.status(500).send({ message: "Error" });
    }
  }
}
