const express = require('express');
const router = express.Router();
const TestimonialsController = require('../controllers/testimonials.controller');

router.route('/testimonials').get(TestimonialsController.getAll);

router.route('/testimonials/random').get(TestimonialsController.getRandom);

router.route('/testimonials/:id').get(TestimonialsController.getOne);

router.route('/testimonials').post(TestimonialsController.getPost);

router.route('/testimonials/:id').put(TestimonialsController.getPut);

router.route('/testimonials/:id').delete(TestimonialsController.getDelete);


module.exports = router;