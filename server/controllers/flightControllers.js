
export const getFlights = async (req, res) => {
    try {

        // Schiphol API'sinden uçuş verilerini almak için fetch isteği yaptık.
        const response = await fetch('https://api.schiphol.nl/public-flights/flights?includedelays=false&page=0&sort=%2BscheduleTime', {
            headers: {
                Accept: 'application/json',
                app_id: process.env.APP_ID,
                app_key: process.env.APP_KEY,
                ResourceVersion: 'v4',
            },
        });
        const data = await response.json();
        res.json(data);

    } catch (error) {
        console.error('API Error:', error);
        res.status(500).send('Error', error);
    }
};


