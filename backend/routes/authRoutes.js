const express_auth = require('express');
const router_auth = express_auth.Router();
const { register: register_controller, login: login_controller } = require('../controller/authController');

router_auth.post('/register', register_controller);
router_auth.post('/login', login_controller);

module.exports = router_auth;