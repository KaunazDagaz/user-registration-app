import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

export async function getUsers(page) {
  const response = await axios.get(`${API_URL}/users`, {
    params: {
      page,
      count: 6
    }
  })
  return response.data
}

export async function getPositions() {
  const response = await axios.get(`${API_URL}/positions`)
  return response.data.positions
}
  
export async function createUser(user) {
  try {
    const tokenResponse = await axios.get(`${API_URL}/token`)
    const { token } = tokenResponse.data

    const formData = new FormData()
    formData.append('name', user.name)
    formData.append('email', user.email)
    formData.append('phone', user.phone)
    formData.append('position_id', user.position_id)
    formData.append('photo', user.photo)
    
    await axios.post(`${API_URL}/users`, formData, {
      headers: {
        'Token': token,
      }
    })
  } catch (error) {
    if (error.response) {
      const { status, data } = error.response;   
      if (status === 401) {
        throw new Error(data.message);
      } else if (status === 409) {
        throw new Error(data.message);
      } else if (data.message) {
        throw new Error(data.message);
      }
    }
    throw error;
  }
}