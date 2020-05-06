const express = require('express');
const router = express.Router();
const SeatController = require('../controllers/seats.controller');

router.route('/seats').get(SeatController.getAll);

router.route('/seats/:id').get(SeatController.getOne);

router.route('/seats').post(SeatController.getPost);

router.route('/seats/:id').put(SeatController.getPut);

router.route('/seats/:id').delete(SeatController.getDelete);


module.exports = router;