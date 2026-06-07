const CouponService = require('../services/couponService');

class CouponController {
    static create(req, res) {
        try {
            const newCoupon = CouponService.createCoupon(req.body);
        res.status(201).json(newCoupon);
        } catch (error) {
res.status(400).json({ error: error.message });
        }
    }

    static list(req,res) {
        try {
        const coupons = CouponService.getAllCoupons();
        res.status(200).json(coupons);
        } catch (error) {
        res.status(500).json({ error: "Server Error" });
        }
    }

    static apply(req,res) {
        try {
            const { code, cartValue } = req.body;
            if (!code || cartValue === undefined) {
            return res.status(400).json({ error: "Please provide 'code' and 'cartValue'" });
            }

            const result = CouponService.applyCoupon(code, cartValue);
            res.status(200).json(result);
        } catch (error) {
        res.status(400).json({ error: error.message });
        }
    }

    static disable(req, res) {
        try {
        const { code } = req.params;
        CouponService.disableCoupon(code);
        res.status(200).json({ message: "Coupon disabled successfully" });
        } catch (error) {
        res.status(404).json({ error: error.message });
        }
    }
}

module.exports = CouponController;