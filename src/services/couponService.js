const CouponModel = require('../models/couponModel');

class CouponService {
    static createCoupon(data) {
        if (!data.code || !data.discountType || !data.discountValue) {
        throw new Error("Missing required fields: code, discountType, discountValue");
        }
        if (data.discountType !== 'FLAT' && data.discountType !== 'PERCENTAGE') {
            throw new Error("discountType must be 'FLAT' or 'PERCENTAGE'");
        }
        const existing = CouponModel.findByCode(data.code);
        if (existing) {
        throw new Error(`Coupon with code ${data.code} already exists`);
        }

        return CouponModel.create(data);
    }

    static getAllCoupons() {
        return CouponModel.getAll();
    }

    static applyCoupon(code, cartValue) {
        const parsedCartValue = Number(cartValue);
        if (isNaN(parsedCartValue) || parsedCartValue <= 0) {
        throw new Error("Invalid cartvalue");
        }

        const coupon = CouponModel.findByCode(code);
        if (!coupon) {
            throw new Error("Coupon not found");
        }

        if (!coupon.isActive) {
            throw new Error("This coupon is no longer active");
        }

        if (coupon.expiryDate && new Date() > coupon.expiryDate) {
        throw new Error("This coupon has expired");
        }

        if (parsedCartValue < coupon.minCartValue) {
            throw new Error(`Cart value must be at least ₹${coupon.minCartValue} to apply this coupon`);
        }

        let discount = 0;

        if (coupon.discountType === 'FLAT') {
        discount = coupon.discountValue;
        } else if (coupon.discountType === 'PERCENTAGE') {
            discount = (parsedCartValue * coupon.discountValue) / 100;
            if (coupon.maxDiscount && discount > coupon.maxDiscount) {
            discount = coupon.maxDiscount;
            }
        }

        let finalAmount = parsedCartValue - discount;
        if (finalAmount < 0) {
            finalAmount = 0;
            discount = parsedCartValue; // Cap the discount to the actual cart value
        }

        return {
            cartValue: parsedCartValue,
            discount: discount,
            finalAmount: finalAmount,
            message: "Coupon applied successfully"
        };
    }

    static disableCoupon(code) {
        const updatedCoupon = CouponModel.updateStatus(code, false);
        if (!updatedCoupon) {
            throw new Error("Coupon not found");
        }
        return updatedCoupon;
    }
}

module.exports = CouponService;