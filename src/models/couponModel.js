// In-memory array acting as our database
const couponsDB = [];
let currentId = 1;

class CouponModel {
    static getAll() {
    return couponsDB;
    }

    static findByCode(code) {
        if (!code) return null;
    return couponsDB.find(c => c.code.toUpperCase() === code.toUpperCase());
    }

    static create(data) {
        const newCoupon = {
            id: currentId++,
            code: data.code.toUpperCase(),
            discountType: data.discountType, // 'FLAT' or 'PERCENTAGE'
            discountValue: Number(data.discountValue),
            minCartValue: Number(data.minCartValue) || 0,
            isActive: true,
        maxDiscount: data.maxDiscount ? Number(data.maxDiscount) : null,
            expiryDate: data.expiryDate ? new Date(data.expiryDate) : null
        };
        
        couponsDB.push(newCoupon);
        return newCoupon;
    }

    static updateStatus(code, isActive) {
        const coupon = this.findByCode(code);
        if (coupon) {
        coupon.isActive = isActive;
            return coupon;
        }
        return null;
    }
}

module.exports = CouponModel;