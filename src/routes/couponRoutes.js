const express = require('express');
const router = express.Router();
const CouponController = require('../controllers/couponController');

router.post('/', CouponController.create);
router.get('/', CouponController.list);
router.post('/apply', CouponController.apply);
router.patch('/:code/disable', CouponController.disable);

module.exports = router;