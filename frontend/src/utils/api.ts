import axios from 'axios'

const myApi = 'http://localhost:3333/api'

export const getStatus = async () => {
  const response = await axios.get(`http://localhost:3333/api/status`)
  return response.data
}
