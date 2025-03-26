import axios from 'axios';

const apiUrl = import.meta.env.VITE_REACT_API_URL;
const API_URL = `${apiUrl}/api`;
const api = {
    login: async (username_or_email, password) => {
        try {
            const payload = {
                username_or_email,
                password,
            };
            const response = await axios.post(`${API_URL}/auth/manager/login`, payload, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
            });
            return { success: true, data: response?.data };
        } catch (error) {
            console.log('Login Error:', error?.response?.data?.detail);
            return { success: false, message: error?.response?.data?.detail };
        }
    },


    getUsers: async (accessToken) => {
        try {
            const response = await axios.get(`${API_URL}/manager/users`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${accessToken}`
                    },
                });
            return { success: true, data: response.data };
        } catch (error) {
            console.log('Error fetching users:', error?.response?.data?.detail);
            return { success: false, message: error?.response?.data?.detail, status: error?.response?.status };
        }
    },
    getUserById: async (userId, token, month, year) => {
        try {
            const response = await axios.get(`${API_URL}/manager/timesheets/monthly/${userId}?month=${month}&year=${year}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return { success: true, data: response.data };
        } catch (error) {
            return { success: false, message: error.response?.data?.detail || 'Failed to fetch user', status: error?.response?.status };
        }
    },
    exportExcelUsersData: async (accessToken) => {
        try {
            const response = await axios.get(`${API_URL}/manager/timesheets/weekly/export/all`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${accessToken}`
                    },
                });
            return { success: true, data: response.data };
        } catch (error) {
            console.log('Error fetching users:', error?.response?.data?.detail);
            return { success: false, message: error?.response?.data?.detail, status: error?.response?.status };
        }
    },
    getWeeklyTimesheet: async (week_id, token) => {
        try {
            const response = await axios.get(`${API_URL}/manager/timesheets/weekly/${week_id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return { success: true, data: response.data };
        } catch (error) {
            return { success: false, message: error.response?.data?.detail || 'Failed to fetch timesheet details', status: error?.response?.status };
        }
    },

};



export default api;
