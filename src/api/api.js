const API_URL = import.meta.env.VITE_API_URL

export async function getUsers(page) {
  const response = await fetch(`${API_URL}/users?page=${page}&count=6`)
  return await response.json()
}

export async function getPositions() {
    const response = await fetch(`${API_URL}/positions`)
    const data = await response.json()
    return data.positions
}
  
export async function createUser(user) {
    const tokenResponse = await fetch(`${API_URL}/token`)
    const { token } = await tokenResponse.json()
    await fetch(`${API_URL}/users?token=${token}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
}