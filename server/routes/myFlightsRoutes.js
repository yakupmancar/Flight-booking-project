import express from 'express';
import { createFlight, getMyFlights } from '../controllers/myFlightsControllers.js';

const router = express.Router();

router.get("/:userId", getMyFlights);   //Kullanıcının kayıtlı uçuş rezervasyonlarını çektiğimiz get işlemi.
router.post("/", createFlight);     //Kullanıcının uçuş rezervasyonu yapmasını sağlayan post işlemi.


export default router