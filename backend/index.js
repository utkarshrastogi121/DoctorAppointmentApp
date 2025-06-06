import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import authRoute from './Routes/auth.js'
import userRoute from './Routes/user.js'
import doctorRoute from './Routes/doctor.js'
import reviewRoute from './Routes/review.js'
import bookingRoute from './Routes/booking.js'

dotenv.config()

const app=express()

const port=process.env.PORT 

const corsOptions={
    origin:"https://doctorappointment2-1fef.onrender.com",
    credentials: true
}

app.use(cors(corsOptions));

app.get('/', (req, res) => {
    res.send('API is working')
})

mongoose.set('strictQuery',false)
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Database connected");
    } catch (err) {
        console.log('Database connection failed:', err.message);
    }
}

app.use(express.json())
app.use(cookieParser())
app.use('/api/v1/doctors', doctorRoute)
app.use('/api/v1/reviews', reviewRoute)
app.use('/api/v1/users', userRoute)
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/bookings', bookingRoute);


app.listen(port,()=>{
    connectDB();
    console.log(`Server is running on port ${port}`)
})

