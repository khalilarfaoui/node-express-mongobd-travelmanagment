const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')
const companyRoutes = require('./routes/company')
const stationRoutes = require('./routes/station')
const voyageRoutes = require('./routes/voyage')
const cors = require('cors');

dotenv.config()
const MONGODB_URI = process.env.MONGODB_URI
const PORT = process.env.PORT || 5000

//console.log(MONGODB_URI)
const app = express();
app.use(cors());
app.use(express.json());
app.use('/auth',authRoutes)
app.use('/user',userRoutes)
app.use('/company',companyRoutes)
app.use('/station',stationRoutes)
app.use('/voyage',voyageRoutes)


//test app first route
app.get('/',(req,res)=>{
    return res.status(200).send('hello chabeb !')
})
// connection to mongodb and start server 
mongoose.connect(MONGODB_URI).then(()=>{
    console.log('connected to MongoDb');
    app.listen(PORT,()=>{
        console.log(`server listening on ${PORT}`)
    })
}).catch((err) =>{
    console.error('Error connecting to mongodb:',err.message)
})