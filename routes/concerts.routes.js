const express = require('express');
const router = express.Router();
const ConcertController = require('../controllers/concerts.controller')


router.route('/concerts').get(ConcertController.getAll);

router.route('/concerts/:id').get(ConcertController.getOne);

router.route('/concerts').post(ConcertController.getPost);

router.route('/concerts/:id').put(ConcertController.getPut);

router.route('/concerts/:id').delete(ConcertController.getDelete);

router.route('/concerts/performer/:performer').get(ConcertController.getPerformer);

router.route('/concerts/genre/:genre').get(ConcertController.getGenre);

router.route('/concerts/price/:price_min/:price_max').get(ConcertController.getMinMaxPrice);

router.route('/concerts/day/:day').get(ConcertController.getDay);

module.exports = router;