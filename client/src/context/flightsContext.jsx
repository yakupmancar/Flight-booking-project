import React, { createContext, useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';


// FlightsContext adında bir context oluşturuyoruz. Bu context, uygulamadaki diğer bileşenlerin uçuş verilerine erişmesini sağlar.
export const FlightsContext = createContext();

// Bu provider, oluşturulan filtre ve diğer fonksiyonel işlemleri, children (çocuk bileşenler) bileşenlere aktarmamızı sağlar.
export const FlightsContextProvider = ({ children }) => {

    // flights: API'den çekilen tüm uçuşları tutar.
    const [flights, setFlights] = useState([]);

    // filteredFlights: Filtreler uygulandıktan sonra kalan uçuşları tutar.
    const [filteredFlights, setFilteredFlights] = useState([]);

    // loading: Veriler yüklenirken true olur, yükleme tamamlandığında false olur.
    const [loading, setLoading] = useState(true);

    // error: Bir hata oluşursa, bu değişkene hata mesajı kaydedilir.
    const [error, setError] = useState(null);

    // filters: Kullanıcı tarafından seçilen filtreleri tutar. Başlangıçta boş olarak ayarlanmıştır.
    const [filters, setFilters] = useState({
        arrivalTime: '',
        stops: '',
        destination: ''
    });

    // destinations: API'den çekilen varış noktalarını (destinasyonları) tutar.
    const [destinations, setDestinations] = useState([]);

    // myFlights: Kullanıcının kendi rezerve ettiği uçuşları tutar.
    const [myFlights, setMyFlights] = useState([]);

    // useUser hook'u, giriş yapmış olan kullanıcı bilgilerini sağlar.
    const { user } = useUser();


    // API'den uçuş verilerini çeken fonksiyon.
    const fetchFlights = async () => {
        try {
            const response = await fetch('/api/flights');
            if (!response.ok) {
                throw new Error('Data extraction error.');
            }
            const data = await response.json();
            setFlights(data.flights);   // flights state'ini API'den alınan verilerle günceller.

            setFilteredFlights(data.flights.filter(flight => flight.route.destinations.length === 1));   // Sadece tek duraklı uçuşları filtreleyerek filteredFlights state'ine kaydeder.

            setDestinations([...new Set(data.flights.map(flight => flight.route.destinations).flat())]);    // Uçuşların varış noktalarını (destinasyonlarını) alır ve duplicates olmaması için Set yapısını kullanarak filtreler.

            setLoading(false);
        } catch (error) {
            setError('Veri çekme hatası.');
            setLoading(false);
        }
    };

    // Filtreleri uygulayan fonksiyon. flights üzerinde yapılan filtrelemelere göre filteredFlights güncellenir.
    const applyFilters = () => {
        let filtered = flights;     // Başlangıçta, tüm uçuşlar filtrelenmemiş olarak alınır.

        // Eğer kullanıcı bir varış saati filtresi belirlemişse, bu saat aralığına uyan uçuşlar filtrelenir.
        if (filters.arrivalTime) {
            const [startHour, endHour] = filters.arrivalTime.split('-').map(time => parseInt(time));
            filtered = filtered.filter(flight => {
                const arrivalTime = new Date(flight.expectedTimeOnBelt);
                const options = { timeZone: 'Europe/Istanbul', hour: '2-digit', hour12: false };
                const arrivalHour = parseInt(arrivalTime.toLocaleString('tr-TR', options).split(':')[0]);
                return arrivalHour >= startHour && arrivalHour <= endHour;
            });
        }

        // Eğer kullanıcı 'nonstop' (duraksız) uçuşları seçmişse, sadece tek duraklı uçuşlar filtrelenir.
        if (filters.stops === 'nonstop') {
            filtered = filtered.filter(flight => flight.route.destinations.length === 1);
        } else if (filters.stops) {
            filtered = []; // Nonstop harici seçenekler seçildiğinde boş bir dizi döndür
        }

        // Eğer bir varış noktası seçilmişse, sadece bu varış noktasına giden uçuşlar filtrelenir.
        if (filters.destination) {
            filtered = filtered.filter(flight => flight.route.destinations.includes(filters.destination));
        }

        setFilteredFlights(filtered);       //state'i filtrelenmiş uçuşlar ile güncelleriz.
    };


    // Kullanıcının rezerve ettiği uçuşları API'den çeken fonksiyon.
    const fetchMyFlights = async () => {
        if (!user || !user.id) {
            console.log("User not found or user.id not defined");
            return;
        }
        console.log("Fetching flights for user:", user.id); // Log ekledik.
        try {
            const response = await fetch(`/api/myFlights/${user.id}`);
            if (response.status === 404) {
                setMyFlights([]); // 404 hatasında boş liste döndürdük.
                setLoading(false);
                return;
            }
            if (!response.ok) {
                console.error('Response not ok:', response.status);
                throw new Error('Veri çekme hatası.');
            }
            const result = await response.json();
            console.log("Fetched flights:", result.data);
            setMyFlights(result.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching flights:', error);
            setError('Veri çekme hatası');
            setLoading(false);
        }
    };
    




    // Sayfa yüklendiğinde API'den uçuş verilerini çeker.
    useEffect(() => {
        fetchFlights();
    }, []);


    // Filtreler ya da uçuş verileri değiştiğinde, applyFilters fonksiyonu çalışarak değiştirilen filtrelerin yeniden uygulanmasını sağlar.
    useEffect(() => {
        applyFilters();
    }, [filters, flights]);


    // Kullanıcının kendi rezerve ettiği uçuşları çeker. user değiştiğinde bu useEffect çalışır.
    useEffect(() => {
        if (user && user.id) {
            console.log("fetching flights for user:", user.id);
            fetchMyFlights();
        }
    }, [user]);


    // Kullanıcının uçuş eklemesini sağlayan fonksiyon.
    const addFlight = async (myFlightData) => {

        // Eğer aynı uçuş kodu ve kalkış saati ile bir uçuş zaten eklenmişse, hata fırlatır.
        const existingFlight = myFlights.find(flight =>
            flight.mainFlightCode === myFlightData.mainFlightCode &&
            flight.departureTime === myFlightData.departureTime
        );

        if (existingFlight) {
            throw new Error("Bu uçuş zaten rezerve edilmiş.");
        }

        // Yeni uçuşu API'ye POST isteği ile gönderir.
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
            // Yeni uçuşu myFlights listesine ekler.
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

    // FlightsContext.Provider bileşeni ile, value prop'unda tüm gerekli veriler ve fonksiyonlar sağlanır.
    return (
        <FlightsContext.Provider value={{ flights: filteredFlights, loading, error, setFilters, myFlights, addFlight, destinations }}>
            {children}
        </FlightsContext.Provider>
    );
};
