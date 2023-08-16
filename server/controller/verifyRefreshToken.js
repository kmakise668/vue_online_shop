const jwt = require('jsonwebtoken');

async function verifyRefreshToken(refreshToken) {
    try {
        // Проверяем валидность Refresh Token и декодируем его
        const decoded = jwt.verify(refreshToken, 'your-refresh-secret-key');

        // Дополнительная логика, например, проверка в базе данных наличия Refresh Token и связанного с ним пользователя
        // const refreshTokenExists = await checkIfRefreshTokenExistsInDatabase(decoded.email);
        // if (!refreshTokenExists) {
        //     return null;
        // }

        // Если всё в порядке, возвращаем данные пользователя
        return {
            email: decoded.email,
            role: decoded.role, // Если информация о роли доступна в токене
            // ... другие поля ...
        };
    } catch (error) {
        console.error('Error verifying Refresh Token:', error);
        return null; // В случае ошибки возвращаем null
    }
}

module.exports = verifyRefreshToken;
