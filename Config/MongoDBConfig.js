const mongoose = require('mongoose');

//MongoDB config
const url = "mongodb://localhost:27017/testdb";
mongoose.connect(url, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true });
const con = mongoose.connection
con.on('open', () => { console.log("DB is Connected!") })