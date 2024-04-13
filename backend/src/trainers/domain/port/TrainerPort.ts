import { Player } from "../model/Player"
import { Reserve } from "../model/Reserve"
import { Team } from "../model/Team"

export interface TrainerPort {
    deleteTeam(team: Team): Promise<void>
    saveTeam(team: Team): Promise<void>
    updateTeam(team: Team): Promise<void>
    getAllTeams(): Promise<Team[]>
    deletePlayer(playerId: String): Promise<void>
    savePlayer(player: Player): Promise<void>
    updatePlayer(player: Player): Promise<void>
    getAllPlayers(): Promise<Player[]>
    getPlayerById(playerId: String): Promise<Player>
    saveReserve(reserve: Reserve): Promise<void>
    getAllReserve(): Promise<void>
}