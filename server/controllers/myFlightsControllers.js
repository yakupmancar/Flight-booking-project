import MyFlightModel from "../models/flightModel.js";

// Kullanıcının uçuş rezervasyonu yapmasını sağlayan fonksiyon 
export const createFlight = async (req, res) => {
    const flight = req.body;    //body'den gelen uçuş verisini alırız

    const newFlight = new MyFlightModel(flight);    //Yeni uçuş modeli oluşturduk (Schema'da)

    try {
        await newFlight.save();
        res.status(201).json({ success: true, data: newFlight });
    } catch (error) {
        console.error("Error in Create flight:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};


// Kullanıcıya ait kayıtlı rezervasyonları getiren fonksiyon.
export const getMyFlights = async (req, res) => {
    try {
        const userId = req.params.userId;
        console.log("Fetching flights for user:", userId); // Log ekledik
        const myFlights = await MyFlightModel.find({ userId: userId });
        console.log("Fetched myFlights:", myFlights); // Log ekledik
        if (myFlights.length === 0) {
            return res.status(404).json({ success: false, message: "No records found for the user" });
        }
        res.status(200).json({ success: true, data: myFlights });
    } catch (error) {
        console.log("error in fetching flights:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};


