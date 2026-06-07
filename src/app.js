const express = require('express')
const couponRoutes = require('./routes/couponRoutes');

const app = express();
const PORT = 3000
app.use(express.json());

app.use('/coupons', couponRoutes)

app.use((req, res) =>{
    res.status(404).json({ error: "Routenot found" });
});

app.listen(PORT, () => {
console.log(`Server is running on http://localhost:${PORT}`);
console.log(`Create: POST /coupons`);
console.log(`List: GET /coupons`);
    console.log(`Apply: POST /coupons/apply`);
    console.log(`Disable: PATCH /coupons/:code/disable`);
});