const express = require('express');
const cors = require('cors'); // ✅ import cors
const app = express();
require('dotenv').config();

const userRouter = require("./routes/user");
const productRouter = require('./routes/product');
const ConnectToDB = require('./db');

// ✅ Connect Database
ConnectToDB();

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ API Routes
app.use('/api/users', userRouter);
app.use('/api/products', productRouter);

// ✅ Start Server
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
