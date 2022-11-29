const express = require('express');
const controller = require('../controller/boxController');
const jsonParser = express.json({type: '*/*'});
const router = express.Router();
router.use(jsonParser);

router.get('', controller.getAll ,(req, res) => {});
router.get('/:month/:year', controller.getOne ,(req, res) => {});
router.post('', controller.addBox ,(req, res) => {});
router.put('/:id', controller.editBox ,(req, res) => {});
router.delete('/:id', controller.delBox ,(req, res) => {});

module.exports = router;