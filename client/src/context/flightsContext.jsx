import React, { createContext, useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';

export const FlightsContext = createContext();

export const FlightsContextProvider = ({ children }) => {
    const [flights, setFlights] = useState([]);
    const [filteredFlights, setFilteredFlights] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState({
        arrivalTime: '',
        stops: '',
        destination: ''
    });
    const [destinations, setDestinations] = useState([]);
    const [myFlights, setMyFlights] = useState([]);
    const { user } = useUser();

    const fetchFlights = async () => {
        try {
            const response = await fetch('/api/flights');
            if (!response.ok) {
                throw new Error('Data extraction error.');
            }
            const data = await response.json();
            setFlights(data.flights);
            setFilteredFlights(data.flights.filter(flight => flight.route.destinations.length === 1));
            setDestinations([...new Set(data.flights.map(flight => flight.route.destinations).flat())]);
            setLoading(false);
        } catch (error) {
            setError('Data extraction error.');
            setLoading(false);
        }
    };

    const applyFilters = () => {
        let filtered = flights;

        if (filters.arrivalTime) {
            const [startHour, endHour] = filters.arrivalTime.split('-').map(time => parseInt(time));
            filtered = filtered.filter(flight => {
                const arrivalTime = new Date(flight.expectedTimeOnBelt);
                const options = { timeZone: 'Europe/Istanbul', hour: '2-digit', hour12: false };
                const arrivalHour = parseInt(arrivalTime.toLocaleString('tr-TR', options).split(':')[0]);
                return arrivalHour >= startHour && arrivalHour <= endHour;
            });
        }

        if (filters.stops === 'nonstop') {
            filtered = filtered.filter(flight => flight.route.destinations.length === 1);
        } else if (filters.stops) {
            filtered = []; // Nonstop harici seçenekler seçildiğinde boş bir dizi döndür
        }

        if (filters.destination) {
            filtered = filtered.filter(flight => flight.route.destinations.includes(filters.destination));
        }

        setFilteredFlights(filtered);
    };

    useEffect(() => {
        fetchFlights();
    }, []);

    useEffect(() => {
        applyFilters();
    }, [filters, flights]);

    useEffect(() => {
        fetchMyFlights();
    }, [user]);

    const addFlight = async (myFlightData) => {
        const existingFlight = myFlights.find(flight =>
            flight.mainFlightCode === myFlightData.mainFlightCode &&
            flight.departureTime === myFlightData.departureTime
        );

        if (existingFlight) {
            throw new Error("Bu uçuş zaten rezerve edilmiş.");
        }

        const response = await fetch("/api/myFlights", {
            method: "POST",
            body: JSON.stringify(myFlightData),
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error("Uçuş eklenmedi");
        }

        try {
            const newFlight = await response.json();
            setMyFlights((prev) => {
                if (!Array.isArray(prev)) {
                    return [newFlight.data];
                }
                return [...prev, newFlight.data];
            });
        } catch (error) {
            console.error("Error adding flight:", error.message);
        }
    };

    const fetchMyFlights = async () => {
        if (!user) return;
        try {
            const response = await fetch(`/api/myFlights/${user.id}`);
            if (!response.ok) {
                throw new Error('Veri çekme hatası.');
            }
            const result = await response.json();
            setMyFlights(result.data);
            setLoading(false);
        } catch (error) {
            setError('Veri çekme hatası');
            setLoading(false);
        }
    };

    return (
        <FlightsContext.Provider value={{ flights: filteredFlights, loading, error, setFilters, myFlights, addFlight, destinations }}>
            {children}
        </FlightsContext.Provider>
    );
};
