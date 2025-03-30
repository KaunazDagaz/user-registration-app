import axios from "axios";

const apiUrl = process.env.BASE_URL;

export const api = {
    getUsers: async (page = 1, count = 6) => {
        try {
            const response = await axios.get(`${apiUrl}/users?page=${page}&count=${count}`);
            return response.data.users;
        } catch (error) {
            console.error("Error fetching users:", error);
            throw error;
        }
    },

    getUserById: async (id) => { 
        try {
            const response = await axios.get(`${apiUrl}/users/${id}`);
            return response.data.user;
        } catch (error) {
            console.error("Error fetching user by ID:", error);
            throw error;
        }
    },

    getPositions: async () => {
        try {
            const response = await axios.get(`${apiUrl}/positions`);
            return response.data.positions;
        } catch (error) {
            console.error("Error fetching positions:", error);
            throw error;
        }
    },

    getToken: async () => {
        try {
            const response = await axios.get(`${apiUrl}/token/`);
            return response.data.token;
        } catch (error) {
            console.error("Error fetching token:", error);
            throw error;
        }
    },

    registerUser: async (userData, token) => {
        try {
            const formData = new FormData();
            formData.append('name', userData.name);
            formData.append('email', userData.email);
            formData.append('phone', userData.phone);
            formData.append('position_id', userData.position_id);
            formData.append('photo', userData.photo);
            await axios.post(`${BASE_URL}/users?token=${token}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }   
            });
        } catch (error) {
            console.error("Error registering user:", error);
            throw error;
        }
    }
}