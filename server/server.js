const express = require('express');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors( {origin: 'http://localhost:5173'} ));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(authRoutes);
app.use(productRoutes);

mongoose.connect(process.env.MONGODB_URI)
.then(() => {
    console.log("Mongodb Connection Successfull!");

    app.listen(port, () => {
        console.log(`Server running at port: ${port}`);
    });
})
.catch((error) => {
    console.error(error);
});