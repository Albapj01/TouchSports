import { Request, Response } from "express";
import { GetTrainerByIdUseCase } from "../../application/usecases/GetTrainerByIdUseCase";

export class GetTrainerByIdController {
    constructor(private getTrainerByIdUseCase: GetTrainerByIdUseCase){}

    async handle(req: Request, res: Response) {
        const trainerData = req.params.id

        try {
            await this.getTrainerByIdUseCase.run(trainerData)
        } catch (error) {
            return res.status(500).send({message: 'Error'})
        }

        res.status(201).send({message: 'Obtained'})
    }
}