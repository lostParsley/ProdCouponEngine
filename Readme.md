
A very simple backend service built with Node.js and Express to create, list, apply, and disable discount coupons because of the time constraints.I am very sorry for that.

Command to run the app through the COUPON-ENGINE directory : node src/app.js

##  Features Implemented 
1.Coupons can be easily created and listed
2. Coupon can be applied to cart value
3. Coupon can be disabled or deleted
4. Proper errors are returned for invalid cases



## Bonus Features Included:
1.Expiry Dates
2.Maximum Discount limits
3.strict data validation!

## Here are the  API endpoints for every operation  built in the engine.

1. Create a Coupon
    Method: POST
    Link: http://localhost:3000/coupons

2. List All Coupons
    Method: GET
    Link: http://localhost:3000/coupons
3. Apply a Coupon
    Method: POST
    Link: http://localhost:3000/coupons/apply
4. Disable a Coupon
    Method: PATCH
    Link: http://localhost:3000/coupons/SAVE100/disable
