import React, { useContext } from 'react'
import { TbPlaneDeparture } from "react-icons/tb";
import { IoIosAirplane } from "react-icons/io";
import { TbPlaneArrival } from "react-icons/tb";
import { SiPegasusairlines } from "react-icons/si";
import { FlightsContext } from '../context/FlightsContext';
import { useNavigate } from "react-router-dom";
import { useUser } from '@clerk/clerk-react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';


const Flight = ({ flight }) => {

  const { addFlight } = useContext(FlightsContext);   // addFlight fonksiyonunu FlightsContext'ten çektik.

  const navigate = useNavigate();

  const { user } = useUser();   // Kullanıcı bilgilerini almak için Clerk'in useUser() hook'unu kullandık.

  if (!flight) return null;   // Uçuş bilgisi yoksa hiçbir şey render edilmez.
  console.log(flight)

  // Havaalanı kodları ile şehir adları arasındaki eşleşmeyi tutan bir nesne. Çünkü API'den şehir adı yerine havaalanı kodu olarak geldi :))
  const airportCodes = {
    "AMS": "Amsterdam",
    "NCE": "Nice",
    "MXP": "Milan",
    "MAD": "Madrid",
    "FAO": "Faro",
    "PMI": "Mallorca",
    "IBZ": "Ibiza",
    "OPO": "Porto",
    "FUE": "Fuerteventura",
    "LPA": "Las Palmas",
    "VLC": "Valencia",
    "RHO": "Rhodes",
    "LHR": "London",
    "LCA": "Larnaka",
    "SPC": "La Parma",
    "SVQ": "Sevilla",
    "CTA": "Catania",
    "HER": "Heraklion",
    "AYT": "Antalya",
    "RAK": "Marrakesh",
    "VNO": "Vilnius",
    "BCN": "Barcelona",
    "BTH": "Hang Nadim",
    "ZTH": "Zakynthos",
    "TFS": "Tenerife Island",
    "ATH": "Athens",
    "PFO": "Paphos",
    "ADB": "İzmir",
    "GRO": "Girona",
    "TBS": "Tbilisi",
    "LIS": "Lisbon",
    "BRI": "Bari",
    "MJT": "Mitilini",
    "DLMBJV": "Milas",
  };

  // Uçak kalkış ve varış saatlerini hesapladık.
  const departureTime = new Date(flight.scheduleDateTime);
  const arrivalTime = new Date(flight.expectedTimeOnBelt);

  // Uçuş süresini dakika olarak hesaplıyoruz.
  const duration = Math.ceil((new Date(flight.expectedTimeOnBelt) - new Date(flight.scheduleDateTime)) / 60000);
  const destinations = flight.route.destinations;
  const arrivalCity = airportCodes[destinations] || destinations;

  //Kalkış ve varış saatlerinin Türkiye saat dilimine çevirdik.
  const options = { timeZone: 'Europe/Istanbul', hour: '2-digit', minute: '2-digit', hour12: false };
  const departureTimeTR = departureTime.toLocaleString('tr-TR', options);
  const arrivalTimeTR = arrivalTime.toLocaleString('tr-TR', options);


  //Uçuş rezervasyon fonksiyonu
  const handleBookFlight = async () => {
    try {
      // Rezervasyon süreci
      const flightData = {
        userId: user?.id,
        departureTime: departureTime.toISOString(),
        arrivalTime: arrivalTime.toISOString(),
        flightDuration: duration,
        destination: destinations[0],
        mainFlightCode: flight.mainFlight
      };

      await addFlight(flightData);

      // Başarılı işlem uyarısı
      toast.success("Rezervasyon başarıyla tamamlandı!", {
        position: "top-right",
        autoClose: 1500
      });

      // Page redirect
      setTimeout(() => {
        navigate('/myFlights');
      }, 1500);

    } catch (error) {
      // Hata durumunda uyarı
      toast.error(error.message, {
        position: "top-right",
        autoClose: 1500
      });
    }
  };



  return (
    <div>
      <div className='w-full bg-white rounded-ss-xl rounded-se-xl rounded-ee-xl'>
        <h1 className='p-5 font-bold'>Amsterdam - {arrivalCity} </h1>

        <div className='flex justify-between items-center px-5'>
          <section className='flex flex-col'>
            <span className='flex items-center gap-x-2'>
              <TbPlaneDeparture />
              <small className='text-gray-700'>Departure</small>
            </span>
            <div className='flex flex-col'>
              <h1 className='font-bold'>{departureTimeTR}</h1>
              <span>Airport: AMS</span>
            </div>

          </section>

          <div className='border-2 border-gray-400 px-6 sm:px-10 rounded-2xl'></div>

          <section className='flex flex-col items-center'>
            <span className='text-5xl sm:text-6xl'>
              <SiPegasusairlines />
            </span>
            <span className='mt-[-10px]'>
              <IoIosAirplane className="text-[#3d008d]" />
            </span>
            <small>
              {duration} min (Nonstop)
            </small>
          </section>

          <div className='border-2 border-gray-400 px-6 sm:px-10 rounded-2xl'></div>

          <section className='flex flex-col'>
            <span className='flex items-center gap-x-2'>
              <TbPlaneArrival />
              <small className='text-gray-700'>Arrival</small>
            </span>
            <span className='font-bold'>{arrivalTimeTR}</span>
            <span>Airport: {destinations}</span>
          </section>
        </div>

        <div className='flex justify-between pt-4'>
          <div className='flex flex-col pb-2 sm:pb-3 pl-5'>
            <h1 className='text-[#3d008d] font-bold'>Price: $200</h1>
            <h1 className='text-sm'>Round Trip</h1>
          </div>
          <button className='bg-[#3d008d] text-gray-100 font-semibold px-4 sm:px-7 lg:px-9 rounded-ee-xl rounded-ss-xl' onClick={handleBookFlight}>Book Flight</button>
        </div>
      </div>

      {/* ToastContainer componenti eklenir. */}
      <ToastContainer />

      <div>
        <a className='underline text-xs bg-[#d9ccea] px-2 sm:px-4 pt-[6px] pb-2 sm:pb-3 rounded-es-lg rounded-ee-lg text-[#3d008d] font-semibold' href="#">Check the details</a>
      </div>
    </div>
  )
}

export default Flight