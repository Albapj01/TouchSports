import express from "express";
import * as path from "path";
import cors from "cors";
import dotenv from "dotenv";
import Router from "express-promise-router";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import { MongoTrainerAdapter } from "./trainers/infrastructure/persistence/repository/MongoTrainerAdapter";
import { CreateTrainerUseCase } from "./trainers/application/usecases/CreateTrainerUseCase";
import { CreateTrainerController } from "./trainers/infrastructure/controller/CreateTrainerController";
import { GetTrainerByIdUseCase } from "./trainers/application/usecases/GetTrainerByIdUseCase";
import { GetTrainerByIdController } from "./trainers/infrastructure/controller/GetTrainerByIdController";
import { CreateTeamUseCase } from "./trainers/application/usecases/CreateTeamUseCase";
import { CreateTeamController } from "./trainers/infrastructure/controller/CreateTeamController";
import { UpdateTeamByIdUseCase } from "./trainers/application/usecases/UpdateTeamByIdUseCase";
import { UpdateTeamByIdController } from "./trainers/infrastructure/controller/UpdateTeamByIdController";
import { UpdateTrainerUseCase } from "./trainers/application/usecases/UpdateTrainerUseCase";
import { UpdateTrainerController } from "./trainers/infrastructure/controller/UpdateTrainerController";
import { DeleteTeamByIdUseCase } from "./trainers/application/usecases/DeleteTeamByIdUseCase";
import { DeleteTeamByIdController } from "./trainers/infrastructure/controller/DeleteTeamByIdController";
import { GetAllTeamsUseCase } from "./trainers/application/usecases/GetAllTeamsUseCase";
import { GetAllTeamsController } from "./trainers/infrastructure/controller/GetAllTeamsController";
import { CreatePalyerUseCase } from "./trainers/application/usecases/CreatePlayerUseCase";
import { CreatePlayerController } from "./trainers/infrastructure/controller/CreatePlayerController";
import { UpdatePlayerByIdUseCase } from "./trainers/application/usecases/UpdatePlayerByIdUseCase";
import { UpdatePlayerByIdController } from "./trainers/infrastructure/controller/UpdatePlayerByIdController";
import { DeletePlayerByIdUseCase } from "./trainers/application/usecases/DeletePlayerByIdUseCase";
import { DeletePlayerByIdController } from "./trainers/infrastructure/controller/DeletePlayerByIdController";
import { GetAllPlayersUseCase } from "./trainers/application/usecases/GetAllPlayersUseCase";
import { GetAllPlayersController } from "./trainers/infrastructure/controller/GetAllPlayersController";
import { GetPlayerByIdUseCase } from "./trainers/application/usecases/GetPlayerByIdUseCase";
import { GetPlayerByIdController } from "./trainers/infrastructure/controller/GetPlayerByIdController";
import { CreateCentresUseCase } from "./trainers/application/usecases/CreateCentresUseCase";
import { CreateCentresController } from "./trainers/infrastructure/controller/CreateCentresController";

dotenv.config();
const app = express();
const router = Router();

app.use(cors());
app.use(bodyParser.json({ limit: "10mb" }));
app.use(router);

app.use("/assets", express.static(path.join(__dirname, "assets")));

app.get("/api", (req, res) => {
  res.send({ message: "Welcome to backend!" });
});

const port = process.env.PORT || 3333;

router.get("/api/status", async (req, res) => {
  res.status(200).send({ message: "OK" });
});

const trainerAdapter = new MongoTrainerAdapter();

const createTrainerUseCase = new CreateTrainerUseCase(trainerAdapter);
const createTrainerController = new CreateTrainerController(
  createTrainerUseCase
);
router.post("/api/trainer", async (req, res) => {
  return createTrainerController.handle(req, res);
});

const getTrainerByIdUseCase = new GetTrainerByIdUseCase(trainerAdapter);
const getTrainerByIdUseController = new GetTrainerByIdController(
  getTrainerByIdUseCase
);
router.get("/api/trainer/:id", async (req, res) => {
  return getTrainerByIdUseController.handle(req, res);
});

const updateTrainerUseCase = new UpdateTrainerUseCase(trainerAdapter);
const updateTrainerController = new UpdateTrainerController(
  updateTrainerUseCase
);
router.put("/api/trainer/:trainerId", async (req, res) => {
  return updateTrainerController.handle(req, res);
});

const createTeamUseCase = new CreateTeamUseCase(trainerAdapter);
const createTeamController = new CreateTeamController(createTeamUseCase);
router.post("/api/trainer/:id/team", async (req, res) => {
  return createTeamController.handle(req, res);
});

const updateTeamByIdUseCase = new UpdateTeamByIdUseCase(trainerAdapter);
const updateTeamByIdController = new UpdateTeamByIdController(
  updateTeamByIdUseCase
);
router.put("/api/trainer/:trainerId/team/:teamId", async (req, res) => {
  return updateTeamByIdController.handle(req, res);
});

const deleteTeamByIdUseCase = new DeleteTeamByIdUseCase(trainerAdapter);
const deleteTeamByIdController = new DeleteTeamByIdController(
  deleteTeamByIdUseCase
);
router.delete("/api/trainer/:trainerId/team/:teamId", async (req, res) => {
  return deleteTeamByIdController.handle(req, res);
});

const getAllTeamsUseCase = new GetAllTeamsUseCase(trainerAdapter);
const getAllTeamsController = new GetAllTeamsController(getAllTeamsUseCase);
router.get("/api/trainer/:trainerId/teams", async (req, res) => {
  return getAllTeamsController.handle(req, res);
});

const createPlayerUseCase = new CreatePalyerUseCase(trainerAdapter);
const createPlayerController = new CreatePlayerController(createPlayerUseCase);
router.post("/api/trainer/:trainerId/team/:teamId/player", async (req, res) => {
  return createPlayerController.handle(req, res);
});

const updatePlayerByIdUseCase = new UpdatePlayerByIdUseCase(trainerAdapter);
const updatePlayerByIdController = new UpdatePlayerByIdController(updatePlayerByIdUseCase);
router.put("/api/trainer/:trainerId/team/:teamId/player/:playerId", async (req, res) => {
  return updatePlayerByIdController.handle(req, res);
});

const deletePlayerByIdUseCase = new DeletePlayerByIdUseCase(trainerAdapter);
const deletePlayerByIdController = new DeletePlayerByIdController(deletePlayerByIdUseCase);
router.delete("/api/trainer/:trainerId/team/:teamId/player/:playerId", async (req, res) => {
  return deletePlayerByIdController.handle(req, res);
});

const getAllPlayersUseCase = new GetAllPlayersUseCase(trainerAdapter);
const getAllPlayersController = new GetAllPlayersController(getAllPlayersUseCase);
router.get("/api/trainer/:trainerId/team/:teamId/players", async (req, res) => {
  return getAllPlayersController.handle(req, res);
});

const getPlayerByIdUseCase = new GetPlayerByIdUseCase(trainerAdapter);
const getPlayerByIdController = new GetPlayerByIdController(getPlayerByIdUseCase);
router.get("/api/trainer/:trainerId/team/:teamId/player/:playerId", async (req, res) => {
  return getPlayerByIdController.handle(req, res);
});

const createCentresUseCase = new CreateCentresUseCase(trainerAdapter);
const createCentresController = new CreateCentresController(createCentresUseCase);
router.post("/api/trainer/:id/centres", async (req, res) => {
  return createCentresController.handle(req, res);
});

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
