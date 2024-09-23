import express from 'express';
import dotenv from 'dotenv';
import flightRoutes from './routes/flightRoutes.js'
import myFlightsRoutes from './routes/myFlightsRoutes.js'
import cors from 'cors';
import { connectDB } from './config/db.js';
dotenv.config();

const app = express();
app.use(express.json());

app.use(cors());

app.use("/api/flights", flightRoutes);
app.use("/api/myFlights", myFlightsRoutes);

const port = process.env.PORT || 5000

app.listen(port, () => {
    connectDB();
    console.log('Server is running on port 5000');
});


//password: iZmKJj5gqP5EEtU7