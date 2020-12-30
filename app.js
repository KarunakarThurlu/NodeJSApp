
//Express Server config
const express = require('express');
const app = express();
app.use(express.json());

//MongoDB config
const mongoose = require('mongoose');
const url = "mongodb://localhost:27017/testdb";
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
const con = mongoose.connection
con.on('open', () => { console.log("DB is Connected!") })

//RouterConfigs
const productRouter = require("./routes/product.router");
app.use('/products', productRouter);

const userRouter = require("./routes/user.router");
app.use('/user', userRouter);


const port = 2020;
app.listen(port, () => {
    console.log("NodeJs Application is up! and running on port :" + port);
});


module.exports = app;