import express from 'express';
import { getFlights } from '../controllers/flightControllers.js';

const router = express.Router();

router.get("/", getFlights);


export default router