import axios from "axios";
import { Team } from "../interfaces/Team";
import { Centres } from "../interfaces/Centres";
import { Player } from "../interfaces/Player";
import { Reserve } from "../interfaces/Reserve";

const myApi = "http://localhost:3333/api";

export const getStatus = async () => {
  const response = await axios.get(`${myApi}/status`);
  return response.data;
};

const createTrainer = async (
  trainerId: string,
  name: string,
  surname: string,
  email: string,
  telephone: string,
  teams: Team[],
  imageUrl: string,
  centres: Centres[]
) => {
  const request = await axios.post(`${myApi}/trainer`, {
    trainerId,
    name,
    surname,
    email,
    telephone,
    teams,
    imageUrl,
    centres,
  });
  return request.data;
};

const getTrainerById = async (id: string) => {
  const response = await axios.get(`${myApi}/trainer/${id}`);
  return response.data;
};

const createTeam = async (
  trainerId: string,
  teamId: string,
  name: string,
  players: Player[]
) => {
  const request = await axios.post(`${myApi}/trainer/${trainerId}/team`, {
    trainerId,
    teamId,
    name,
    players,
  });
};

const getTeamById = async (trainerId: string, teamId: string) => {
  const response = await axios.get(
    `${myApi}/trainer/${trainerId}/team/${teamId}`
  );
  return response.data;
};

const getAllTeams = async (trainerId: string) => {
  const response = await axios.get(`${myApi}/trainer/${trainerId}/teams`);
  return response.data;
};

const createPlayer = async (
  trainerId: string,
  teamId: string,
  playerId: string,
  name: string,
  surname: string,
  email: string
) => {
  const request = await axios.post(
    `${myApi}/trainer/${trainerId}/team/${teamId}/player`,
    {
      trainerId,
      teamId,
      playerId,
      name,
      surname,
      email,
    }
  );
};

const getPlayerById = async (
  trainerId: string,
  teamId: string,
  playerId: string
) => {
  const response = await axios.get(
    `${myApi}/trainer/${trainerId}/team/${teamId}/player/${playerId}`
  );
  return response.data;
};

const getAllPlayers = async (trainerId: string, teamId: string) => {
  const response = await axios.get(
    `${myApi}/trainer/${trainerId}/team/${teamId}/players`
  );
  return response.data;
};

const createCentres = async (
  trainerId: string,
  centresId: string,
  name: string,
  location: string,
  reserves: Reserve[],
  imageUrl: string
) => {
  const request = await axios.post(`${myApi}/trainer/${trainerId}/centres`, {
    trainerId,
    centresId,
    name,
    location,
    reserves,
    imageUrl,
  });
};

const getCentresById = async (trainerId: string, centresId: string) => {
  const response = await axios.get(
    `${myApi}/trainer/${trainerId}/centres/${centresId}`
  );
  return response.data;
};

const getAllCentres = async (trainerId: string) => {
  const response = await axios.get(`${myApi}/trainer/${trainerId}/centres`);
  return response.data;
};

const getAllReserves = async (trainerId: string, centresId: string) => {
  const response = await axios.get(
    `${myApi}/trainer/${trainerId}/centres/${centresId}/reserves`
  );
  return response.data;
};

const createReserve = async (
  trainerId: string,
  centresId: string,
  reserveId: string,
  name: string,
  surname: string,
  email: string,
  telephone: string,
  teamId: string,
  material: string,
  date: Date
) => {
  const request = await axios.post(
    `${myApi}/trainer/${trainerId}/centres/${centresId}/reserve`,
    {
      trainerId,
      centresId,
      reserveId,
      name,
      surname,
      email,
      telephone,
      teamId,
      material,
      date,
    }
  );
};

const getReserveById = async (
  trainerId: string,
  centresId: string,
  reserveId: string
) => {
  const response = await axios.get(
    `${myApi}/trainer/${trainerId}/centres/${centresId}/reserve/${reserveId}`
  );
  return response.data;
};

const getTrainerReserves = async (trainerId: string) => {
  const response = await axios.get(`${myApi}/trainer/${trainerId}/reserves`);
  return response.data;
};

const deleteTeam = async (trainerId: string, teamId: string) => {
  const response = await axios.delete(
    `${myApi}/trainer/${trainerId}/team/${teamId}`
  );
  return response.data;
};

const updateTeam = async (trainerId: string, teamId: string, name: string) => {
  const response = await axios.put(
    `${myApi}/trainer/${trainerId}/team/${teamId}`,
    {
      trainerId,
      teamId,
      name,
    }
  );
  return response.data;
};

const deleteCentre = async (trainerId: string, centresId: string) => {
  const response = await axios.delete(
    `${myApi}/trainer/${trainerId}/centres/${centresId}`
  );
  return response.data;
};

export default {
  createTrainer,
  getTrainerById,
  createTeam,
  getTeamById,
  getAllTeams,
  createPlayer,
  getPlayerById,
  getAllPlayers,
  createCentres,
  getCentresById,
  getAllCentres,
  createReserve,
  getReserveById,
  getAllReserves,
  getTrainerReserves,
  deleteTeam,
  updateTeam,
  deleteCentre,
};
