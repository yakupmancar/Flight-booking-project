import mongoose from "mongoose";

const myFlightSchema = new mongoose.Schema({
    userId: {type: String, required: true},
    departureTime: { type: Date, required: true },
    arrivalTime: { type: Date, required: true },
    flightDuration: { type: Number, required: true },
    destination: { type: String, required: true },
    mainFlightCode: { type: String, required: true },
});

const MyFlightModel = mongoose.model('MyFlight', myFlightSchema);

export default MyFlightModel;