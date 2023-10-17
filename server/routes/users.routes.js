// const Router = require('express')
// const router = new Router()
// const usersController = require('../controller/users.controller')


// router.post('/users', usersController.createUsers)
// router.get('/users', usersController.getUsers)
// router.get('/users/:id', usersController.getOneUsers)
// router.put('/users', usersController.updateUsers)
// router.delete('/users/:id', usersController.deleteUsers)
// router.post('/users/login', usersController.loginUser);


const express = require('express');
const router = express.Router();
const usersController = require('../controller/users.controller');

router.post('/', usersController.createUsers);
router.get('/', usersController.getUsers);
router.get('/:id', usersController.getOneUsers);
router.put('/user-update', usersController.updateUsers);
router.delete('/:id', usersController.deleteUsers);
router.post('/login', usersController.login);
router.post('/check-password', usersController.checkPassword);
router.put('/update-password', usersController.updatePassword);

module.exports = router