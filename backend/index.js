import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import path from "path"
import { fileURLToPath } from "url"
import authRoute from './Routes/auth.js'
import userRoute from './Routes/user.js'
import doctorRoute from './Routes/doctor.js'
import reviewRoute from './Routes/review.js'
import bookingRoute from './Routes/booking.js'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app=express()

const port=process.env.PORT 

app.use(cors());
app.use(express.json())
app.use(cookieParser())

app.get('/api', (req, res) => {
    res.send('API is working')
})


app.use('/api/v1/doctors', doctorRoute)
app.use('/api/v1/reviews', reviewRoute)
app.use('/api/v1/users', userRoute)
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/bookings', bookingRoute);

app.use(express.static(path.join(__dirname, "dist")))

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"))
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


app.listen(port,()=>{
    connectDB();
    console.log(`Server is running on port ${port}`)
})

