import { Request, Response } from "express";
import { GetReserveByIdUseCase } from "../../application/usecases/GetReserveByIdUseCase";

export class GetReserveByIdController {
  constructor(private getReserveByIdUseCase: GetReserveByIdUseCase) {}

  async handle(req: Request, res: Response) {
    try {
      const reserve = await this.getReserveByIdUseCase.run(req.params.trainerId, req.params.centresId, req.params.reserveId);
      res.status(201).send({ message: "Obtained reserve", reserve });
    } catch (error) {
      return res.status(500).send({ message: "Error" });
    }
  }
}
