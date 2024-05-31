import { Request, Response } from "express";
import { GetCentresByIdUseCase } from "../../../application/usecases/centres/GetCentresByIdUseCase";

export class GetCentresByIdController {
  constructor(private getCentresByIdUseCase: GetCentresByIdUseCase) {}

  async handle(req: Request, res: Response) {
    try {
      const centres = await this.getCentresByIdUseCase.run(
        req.params.trainerId,
        req.params.centresId
      );
      res.status(201).send({ message: "Obtained centres", centres });
    } catch (error) {
      return res.status(500).send({ message: "Error" });
    }
  }
}
