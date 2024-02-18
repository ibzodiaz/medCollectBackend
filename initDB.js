const mongoose = require('mongoose');

module.exports = () => {
    const url = process.env.MONGODB_URL;

    mongoose.connect(url, {
        dbName: process.env.DB_NAME,
        user: process.env.DB_USER,
        pass: process.env.DB_PASSWORD,
        useNewUrlParser: true
    })
    .then(() => {
        console.log('Mongodb connected....');
    })
    .catch(err => console.log(err.message));

    mongoose.connection.on('connected', ()=>{
        console.log('Mongodb connected to db...');
    });

    mongoose.connection.on('error', (error)=>{
        console.log(error.message);
    });

    mongoose.connection.on('disconnected', ()=>{
        console.log('Mongodb disconnected to db...');
    });

    process.on('SIGINT', ()=>{
        mongoose.connection.close(()=>{
            console.log("Mongodb is disconnected due to the app termination...");
            process.exit(0);
        });
    });

}