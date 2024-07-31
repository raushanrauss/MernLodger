const express = require('express');
const {
    loginControllers,
    registerControllers,
    setAvatarController
} = require('../controllers/userController'); // Adjust the path if needed

const router = express.Router();

router.route('/register').post(registerControllers);

router.route('/login').post(loginControllers);

router.route('/setAvatar/:id').post(setAvatarController);

module.exports = router;
