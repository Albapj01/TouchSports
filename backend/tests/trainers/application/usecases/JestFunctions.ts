export const trainerPort = {
    saveTrainer: jest.fn(),
    findById: jest.fn(),
    findByEmail: jest.fn(),
    findByPlayerEmail: jest.fn(),
    deleteTeam: jest.fn(),
    saveTeam: jest.fn(),
    updateTeam: jest.fn(),
    deletePlayer: jest.fn(),
    savePlayer: jest.fn(),
    updatePlayer: jest.fn(),
    getAllPlayers: jest.fn(),
    saveCentres: jest.fn(),
    updateCentres: jest.fn(),
    deleteCentres: jest.fn(),
    saveReserve: jest.fn(),
    updateReserve: jest.fn(),
    deleteReserve: jest.fn(),
    getAllTrainers: jest.fn(),
}

export const notifierPort = {
  createPlayerNotification: jest.fn(),
  updatePlayerNotification: jest.fn(),
  createReserveNotification: jest.fn(),
  updateReserveNotification: jest.fn(),
  deleteReserveNotification: jest.fn(),
}