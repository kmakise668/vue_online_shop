import axios from 'axios';
import jwt_decode from 'jwt-decode';

const api = axios.create({
    baseURL: 'http://localhost:5555/api',
    timeout: 10000,
});

// Интерцептор для обновления Access Token
api.interceptors.request.use(async(config) => {
    // Проверяем время действия Access Token
    const accessTokenExp = jwt_decode(localStorage.accessToken).exp;
    const now = Math.floor(Date.now() / 1000);

    // Если Access Token скоро истечет, обновляем его
    if (accessTokenExp - now <= 60) {
        const newAccessToken = await refreshAccessToken();
        config.headers.Authorization = `Bearer ${newAccessToken}`;
    }

    return config;
});

// Функция для обновления Access Token
async function refreshAccessToken() {
    try {
        const response = await api.post('/users/refresh-token');
        const newAccessToken = response.data.accessToken;

        localStorage.accessToken = newAccessToken; // Сохраняем новый Access Token

        return newAccessToken;
    } catch (error) {
        console.error('Error refreshing Access Token:', error);
        throw error;
    }
}

export default api;