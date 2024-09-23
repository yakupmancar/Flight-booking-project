import express from 'express';
import { createFlight, getMyFlights } from '../controllers/myFlightsControllers.js';

const router = express.Router();

router.get("/:userId", getMyFlights);
router.post("/", createFlight);


export default router