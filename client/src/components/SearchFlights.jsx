import React, { useContext, useState } from 'react';
import { FaPlane, FaPlaneDeparture, FaPlaneArrival } from "react-icons/fa";
import { IoMdCalendar } from "react-icons/io";
import { FlightsContext } from '../context/FlightsContext';
import { FaAngleDown } from "react-icons/fa";


const SearchFlights = () => {

    // FlightsContext'ten setFilters ve destinations verilerini kullanmak için ilgili context'i çektik.
    const { setFilters, destinations } = useContext(FlightsContext);

    // arrival adında bir state oluşturuyoruz, bu state kullanıcının seçtiği varış noktasını tutar.
    const [arrival, setArrival] = useState('');


    // Kullanıcı filtreleme işlemini başlattığında çalışacak fonksiyon.
    const handleSearch = () => {

        // setFilters fonksiyonunu kullanarak FlightsContext'teki filtreleri güncelleriz.
        // Burada destination filtresi, kullanıcının belirlediği arrival değeriyle güncellenir.
        setFilters({
            destination: arrival
        });
    };


    return (
        <div className='bg-white rounded-xl p-5'>
            <section className='flex items-center justify-between'>
                <div className='flex items-center gap-x-2 text-sm md:text-base lg:text-lg font-semibold'>
                    <span><FaPlane /></span>
                    <h1>BOOK YOUR FLIGHT</h1>
                </div>

                <div className='flex items-center font-semibold'>
                    <button className='bg-[#3d008d] text-gray-100 text-sm sm:text-base px-2 sm:px-3 rounded-l-2xl py-1'>Round trip</button>
                    <button className='bg-gray-200 text-[#3d008d] px-2 text-sm sm:text-base sm:px-3 rounded-r-2xl py-1'>One Way</button>
                </div>
            </section>

            <section className='flex gap-x-1 mt-4'>

                <div className='flex flex-grow items-center rounded-l-3xl py-1 px-2 bg-white border-[3px] border-[#eaebed]'>
                    <FaPlaneDeparture className='text-[#3d008d]' />
                </div>

                <div className='flex flex-grow items-center rounded-r-3xl py-0 sm:py-1 px-2 bg-white border-[3px] border-[#eaebed] w-16'>
                    <FaPlaneArrival className='text-[#3d008d]' />
                    <select className='cursor-pointer w-full appearance-none outline-none px-2' value={arrival} onChange={(e) => setArrival(e.target.value)}>
                        <option value="">Tüm Uçuşlar</option>
                        {destinations.map(destination => (
                            <option key={destination} value={destination}>{destination}</option>
                        ))}
                    </select>
                    <FaAngleDown />
                </div>

                <div className='flex flex-grow items-center rounded-l-3xl py-1 px-2 bg-white border-[3px] border-[#eaebed]'>
                    <IoMdCalendar className='text-[#3d008d]' />

                </div>
                <div className='flex flex-grow items-center rounded-r-3xl py-1 px-2 bg-white border-[3px] border-[#eaebed]'>
                    <IoMdCalendar className='text-[#3d008d]' />

                </div>
            </section>

            <button className='text-gray-100 bg-[#3d008d] font-semibold px-2 sm:px-4 py-1 sm:py-2 rounded-lg mt-4' onClick={handleSearch}>Show flights</button>
        </div>
    );
};

export default SearchFlights;
