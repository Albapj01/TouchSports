import axios from "axios";
import { Team } from "../interfaces/Team";
import { Centres } from "../interfaces/Centres";
import { Player } from "../interfaces/Player";

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

export default {
  createTrainer,
  getTrainerById,
  createTeam,
  getTeamById,
  getAllTeams,
};