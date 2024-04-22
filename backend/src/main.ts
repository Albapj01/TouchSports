/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express from "express";
import * as path from "path";
import cors from "cors";
import dotenv from "dotenv";
import Router from "express-promise-router";
import bodyParser from 'body-parser'
import mongoose from "mongoose";
import { MongoTrainerAdapter } from "./trainers/infrastructure/persistence/repository/MongoTrainerAdapter";
import { CreateTrainerUseCase } from "./trainers/application/usecases/CreateTrainerUseCase";
import { CreateTrainerController } from "./trainers/infrastructure/controller/CreateTrainerController";
import { GetTrainerByIdUseCase } from "./trainers/application/usecases/GetTrainerByIdUseCase";
import { GetTrainerByIdController } from "./trainers/infrastructure/controller/GetTrainerByIdController";

dotenv.config();
const app = express();
const router = Router();

app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }))
app.use(router);

app.use("/assets", express.static(path.join(__dirname, "assets")));

app.get("/api", (req, res) => {
  res.send({ message: "Welcome to backend!" });
});

const port = process.env.PORT || 3333;

router.get("/api/status", async (req, res) => {
  res.status(200).send({ message: "OK" });
});

const trainerAdapter = new MongoTrainerAdapter()

const createTrainerUseCase = new CreateTrainerUseCase(trainerAdapter)
const createTrainerController = new CreateTrainerController(createTrainerUseCase)
router.post('/api/trainer', async (req, res) => {
  return createTrainerController.handle(req, res)
})

const getTrainerByIdUseCase = new GetTrainerByIdUseCase(trainerAdapter)
const getTrainerByIdUseController = new GetTrainerByIdController(getTrainerByIdUseCase)
router.get('/api/trainer/:id', async (req, res) => {
  return getTrainerByIdUseController.handle(req, res)
})

const start = async () => {
  try {
    await mongoose.connect(`${process.env.MONGO_URI}`);
    app.listen(port, () => {
      console.log(`Listening at http://localhost:${port}/api`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start();
