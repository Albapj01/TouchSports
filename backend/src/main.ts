import express from "express";
import * as path from "path";
import cors from "cors";
import dotenv from "dotenv";
import Router from "express-promise-router";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import { MongoTrainerAdapter } from "./trainers/infrastructure/persistence/repository/MongoTrainerAdapter";
import { CreateTrainerUseCase } from "./trainers/application/usecases/trainer/CreateTrainerUseCase";
import { CreateTrainerController } from "./trainers/infrastructure/controller/trainer/CreateTrainerController";
import { GetTrainerByIdUseCase } from "./trainers/application/usecases/trainer/GetTrainerByIdUseCase";
import { GetTrainerByIdController } from "./trainers/infrastructure/controller/trainer/GetTrainerByIdController";
import { CreateTeamUseCase } from "./trainers/application/usecases/team/CreateTeamUseCase";
import { CreateTeamController } from "./trainers/infrastructure/controller/team/CreateTeamController";
import { UpdateTeamByIdUseCase } from "./trainers/application/usecases/team/UpdateTeamByIdUseCase";
import { UpdateTeamByIdController } from "./trainers/infrastructure/controller/team/UpdateTeamByIdController";
import { DeleteTeamByIdUseCase } from "./trainers/application/usecases/team/DeleteTeamByIdUseCase";
import { DeleteTeamByIdController } from "./trainers/infrastructure/controller/team/DeleteTeamByIdController";
import { GetAllTeamsUseCase } from "./trainers/application/usecases/team/GetAllTeamsUseCase";
import { GetAllTeamsController } from "./trainers/infrastructure/controller/team/GetAllTeamsController";
import { CreatePlayerUseCase } from "./trainers/application/usecases/player/CreatePlayerUseCase";
import { CreatePlayerController } from "./trainers/infrastructure/controller/player/CreatePlayerController";
import { UpdatePlayerByIdUseCase } from "./trainers/application/usecases/player/UpdatePlayerByIdUseCase";
import { UpdatePlayerByIdController } from "./trainers/infrastructure/controller/player/UpdatePlayerByIdController";
import { DeletePlayerByIdUseCase } from "./trainers/application/usecases/player/DeletePlayerByIdUseCase";
import { DeletePlayerByIdController } from "./trainers/infrastructure/controller/player/DeletePlayerByIdController";
import { GetAllPlayersUseCase } from "./trainers/application/usecases/player/GetAllPlayersUseCase";
import { GetAllPlayersController } from "./trainers/infrastructure/controller/player/GetAllPlayersController";
import { GetPlayerByIdUseCase } from "./trainers/application/usecases/player/GetPlayerByIdUseCase";
import { GetPlayerByIdController } from "./trainers/infrastructure/controller/player/GetPlayerByIdController";
import { CreateCentresUseCase } from "./trainers/application/usecases/centres/CreateCentresUseCase";
import { CreateCentresController } from "./trainers/infrastructure/controller/centres/CreateCentresController";
import { UpdateCentresByIdUseCase } from "./trainers/application/usecases/centres/UpdateCentresByIdUseCase";
import { UpdateCentresmByIdController } from "./trainers/infrastructure/controller/centres/UpdateCentresByIdController";
import { GetAllCentresUseCase } from "./trainers/application/usecases/centres/GetAllCentresUseCase";
import { GetAllCentresController } from "./trainers/infrastructure/controller/centres/GetAllCentresController";
import { DeleteCentresByIdUseCase } from "./trainers/application/usecases/centres/DeleteCentresByIdUseCase";
import { DeleteCentresByIdController } from "./trainers/infrastructure/controller/centres/DeleteCentresByIdController";
import { CreateReserveUseCase } from "./trainers/application/usecases/reserve/CreateReserveUseCase";
import { CreateReserveController } from "./trainers/infrastructure/controller/reserve/CreateReserveController";
import { UpdateReserveByIdUseCase } from "./trainers/application/usecases/reserve/UpdateReserveByIdUseCase";
import { UpdateReserveByIdController } from "./trainers/infrastructure/controller/reserve/UpdateReserveByIdController";
import { DeleteReserveByIdUseCase } from "./trainers/application/usecases/reserve/DeleteReserveByIdUseCase";
import { DeleteReserveByIdController } from "./trainers/infrastructure/controller/reserve/DeleteReserveByIdController";
import { GetTeamByIdUseCase } from "./trainers/application/usecases/team/GetTeamByIdUseCase";
import { GetTeamByIdController } from "./trainers/infrastructure/controller/team/GetTeamByIdController";
import { GetCentresByIdUseCase } from "./trainers/application/usecases/centres/GetCentresByIdUseCase";
import { GetCentresByIdController } from "./trainers/infrastructure/controller/centres/GetCentresByIdController";
import { GetReserveByIdUseCase } from "./trainers/application/usecases/reserve/GetReserveByIdUseCase";
import { GetReserveByIdController } from "./trainers/infrastructure/controller/reserve/GetReserveByIdController";
import { GetTrainerReservesUseCase } from "./trainers/application/usecases/reserve/GetTrainerReservesUseCase";
import { GetTrainerReservesController } from "./trainers/infrastructure/controller/reserve/GetTrainerReservesController";
import { NodemailerNotifier } from "./trainers/infrastructure/nodemailer/NotifierAdapter";
import { GetPlayerByEmailUseCase } from "./trainers/application/usecases/player/GetPlayerByEmailUseCase";
import { GetPlayerByEmailController } from "./trainers/infrastructure/controller/player/GetPlayerByEmailController";
import { GetTrainerByEmailUseCase } from "./trainers/application/usecases/trainer/GetTrainerByEmailUseCase";
import { GetTrainerByEmailController } from "./trainers/infrastructure/controller/trainer/GetTrainerByEmailController";
import { GetAllTrainersUseCase } from "./trainers/application/usecases/trainer/GetAllTrainersUseCase";
import { GetAllTrainersController } from "./trainers/infrastructure/controller/trainer/GetAllTrainersController";

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
const notifier = new NodemailerNotifier();

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

const getTrainerByEmailUseCase = new GetTrainerByEmailUseCase(trainerAdapter);
const getTrainerByEmailUseController = new GetTrainerByEmailController(
  getTrainerByEmailUseCase
);
router.get("/api/trainer/:email", async (req, res) => {
  return getTrainerByEmailUseController.handle(req, res);
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

const getTeamByIdUseCase = new GetTeamByIdUseCase(trainerAdapter);
const getTeamByIdController = new GetTeamByIdController(getTeamByIdUseCase);
router.get("/api/trainer/:trainerId/team/:teamId", async (req, res) => {
  return getTeamByIdController.handle(req, res);
});

const createPlayerUseCase = new CreatePlayerUseCase(trainerAdapter, notifier);
const createPlayerController = new CreatePlayerController(createPlayerUseCase);
router.post("/api/trainer/:trainerId/team/:teamId/player", async (req, res) => {
  return createPlayerController.handle(req, res);
});

const updatePlayerByIdUseCase = new UpdatePlayerByIdUseCase(
  trainerAdapter,
  notifier
);
const updatePlayerByIdController = new UpdatePlayerByIdController(
  updatePlayerByIdUseCase
);
router.put(
  "/api/trainer/:trainerId/team/:teamId/player/:playerId",
  async (req, res) => {
    return updatePlayerByIdController.handle(req, res);
  }
);

const deletePlayerByIdUseCase = new DeletePlayerByIdUseCase(trainerAdapter);
const deletePlayerByIdController = new DeletePlayerByIdController(
  deletePlayerByIdUseCase
);
router.delete(
  "/api/trainer/:trainerId/team/:teamId/player/:playerId",
  async (req, res) => {
    return deletePlayerByIdController.handle(req, res);
  }
);

const getAllPlayersUseCase = new GetAllPlayersUseCase(trainerAdapter);
const getAllPlayersController = new GetAllPlayersController(
  getAllPlayersUseCase
);
router.get("/api/trainer/:trainerId/team/:teamId/players", async (req, res) => {
  return getAllPlayersController.handle(req, res);
});

const getPlayerByIdUseCase = new GetPlayerByIdUseCase(trainerAdapter);
const getPlayerByIdController = new GetPlayerByIdController(
  getPlayerByIdUseCase
);
router.get(
  "/api/trainer/:trainerId/team/:teamId/player/:playerId",
  async (req, res) => {
    return getPlayerByIdController.handle(req, res);
  }
);

const getPlayerByEmailUseCase = new GetPlayerByEmailUseCase(trainerAdapter);
const getPlayerByEmailController = new GetPlayerByEmailController(
  getPlayerByEmailUseCase
);
router.get(
  "/api/trainer/:trainerEmail/team/player/:playerEmail",
  async (req, res) => {
    return getPlayerByEmailController.handle(req, res);
  }
);

const createCentresUseCase = new CreateCentresUseCase(trainerAdapter);
const createCentresController = new CreateCentresController(
  createCentresUseCase
);
router.post("/api/trainer/:id/centres", async (req, res) => {
  return createCentresController.handle(req, res);
});

const updateCentresByIdUseCase = new UpdateCentresByIdUseCase(trainerAdapter);
const updateCentresByIdController = new UpdateCentresmByIdController(
  updateCentresByIdUseCase
);
router.put("/api/trainer/:trainerId/centres/:centresId", async (req, res) => {
  return updateCentresByIdController.handle(req, res);
});

const getAllCentresUseCase = new GetAllCentresUseCase(trainerAdapter);
const getAllCentresController = new GetAllCentresController(
  getAllCentresUseCase
);
router.get("/api/trainer/:trainerId/centres", async (req, res) => {
  return getAllCentresController.handle(req, res);
});

const getCentresByIdUseCase = new GetCentresByIdUseCase(trainerAdapter);
const getCentresByIdController = new GetCentresByIdController(
  getCentresByIdUseCase
);
router.get("/api/trainer/:trainerId/centres/:centresId", async (req, res) => {
  return getCentresByIdController.handle(req, res);
});

const deleteCentresByIdUseCase = new DeleteCentresByIdUseCase(trainerAdapter);
const deleteCentresByIdController = new DeleteCentresByIdController(
  deleteCentresByIdUseCase
);
router.delete(
  "/api/trainer/:trainerId/centres/:centresId",
  async (req, res) => {
    return deleteCentresByIdController.handle(req, res);
  }
);

const createReserveUseCase = new CreateReserveUseCase(trainerAdapter, notifier);
const createReserveController = new CreateReserveController(
  createReserveUseCase
);
router.post(
  "/api/trainer/:trainerId/centres/:centresId/reserve",
  async (req, res) => {
    return createReserveController.handle(req, res);
  }
);

const updateReserveByIdUseCase = new UpdateReserveByIdUseCase(
  trainerAdapter,
  notifier
);
const updateReserveByIdController = new UpdateReserveByIdController(
  updateReserveByIdUseCase
);
router.put(
  "/api/trainer/:trainerId/centres/:centresId/reserve/:reserveId",
  async (req, res) => {
    return updateReserveByIdController.handle(req, res);
  }
);

const getReserveByIdUseCase = new GetReserveByIdUseCase(trainerAdapter);
const getReserveByIdController = new GetReserveByIdController(
  getReserveByIdUseCase
);
router.get(
  "/api/trainer/:trainerId/centres/:centresId/reserve/:reserveId",
  async (req, res) => {
    return getReserveByIdController.handle(req, res);
  }
);

const deleteReserveByIdUseCase = new DeleteReserveByIdUseCase(
  trainerAdapter,
  notifier
);
const deleteReserveByIdController = new DeleteReserveByIdController(
  deleteReserveByIdUseCase
);
router.delete(
  "/api/trainer/:trainerId/centres/:centresId/reserve/:reserveId",
  async (req, res) => {
    return deleteReserveByIdController.handle(req, res);
  }
);

const getTrainerReservesUseCase = new GetTrainerReservesUseCase(trainerAdapter);
const getTrainerReservesController = new GetTrainerReservesController(
  getTrainerReservesUseCase
);
router.get("/api/trainer/:trainerId/reserves", async (req, res) => {
  return getTrainerReservesController.handle(req, res);
});

const getAllTrainersUseCase = new GetAllTrainersUseCase(trainerAdapter);
const getAllTrainersController = new GetAllTrainersController(
  getAllTrainersUseCase
);
router.get("/api/trainers", async (req, res) => {
  return getAllTrainersController.handle(req, res);
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
