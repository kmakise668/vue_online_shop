// middleware/authMiddleware.js

const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
  const accessToken = req.cookies.accessToken; // Получаем Access Token из куки
  console.log(req.cookies.accessToken)
  if (!accessToken) {
    // Если Access Token отсутствует, перенаправляем пользователя на страницу авторизации
    return res.redirect('/login');
  }

  try {
    const decodedToken = jwt.verify(accessToken, 'your-secret-key'); // Проверяем и декодируем токен

    // Если токен валиден, добавляем декодированные данные в объект запроса
    req.user = decodedToken;

    // Пропускаем запрос дальше
    next();
  } catch (error) {
    // Если токен недействителен, перенаправляем пользователя на страницу авторизации
    return res.redirect('/login');
  }
}

module.exports = authMiddleware;
