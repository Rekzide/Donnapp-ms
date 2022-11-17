
const express = require('express');
const controller = require('../controller/userController');
const jsonParser = express.json({type: '*/*'});
const router = express.Router();
router.use(jsonParser);

router.get('', controller.getUsers, (req, res) => {});
router.post('/singup', controller.singUp, (req, res) => {});

module.exports = router;