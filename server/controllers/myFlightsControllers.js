import MyFlightModel from "../models/flightModel.js";

export const createFlight = async (req, res) => {
    const flight = req.body;

    const newFlight = new MyFlightModel(flight);

    try {
        await newFlight.save();
        res.status(201).json({ success: true, data: newFlight });
    } catch (error) {
        console.error("Error in Create flight:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};


export const getMyFlights = async (req, res) => {

    try {
        const userId = req.params.userId
        const myFlights = await MyFlightModel.find({userId: userId});
        if(myFlights.length === 0) {
            return res.status(404).send("No records found for the user");
        }
        res.status(200).json({ success: true, data: myFlights });
    } catch (error) {
        console.log("error in fetching flights:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};