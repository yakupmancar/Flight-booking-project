import React, { useContext, useState } from 'react'
import Flight from './Flight'
import { FlightsContext } from '../context/flightsContext';

// FlightList bileşeni uçuşları listelemek ve sayfalama (pagination) işlemi yapmak için kullanılır.
const FlightList = () => {

  // FlightsContext'ten flights, loading, ve error değerlerini alıyoruz.
  const { flights, loading, error } = useContext(FlightsContext);


  //! PAGINATION
  const [currentPage, setCurrentPage] = useState(1);  // Şuanki sayfa numarası
  const pageSize = 5; // Bir sayfada 5 uçuş gösterilir.


  // handlePagination fonksiyonu, flights dizisini alır ve ilgili sayfadaki verileri döndürür.
  const handlePagination = (data) => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return data.slice(startIndex, endIndex);
  };
  const displayedFlights = handlePagination(flights);   // displayedFlights, currentPage'e göre gösterilecek uçuşları içerir.


  // Sonraki sayfaya geçiş fonksiyonu.
  const handleNextPage = () => {
    if (currentPage < Math.ceil(flights.length / pageSize)) {
      setCurrentPage(currentPage + 1);
    }
  };


  // Önceki sayfaya geçiş fonksiyonu.
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const totalPages = Math.ceil(flights.length / pageSize);  // Toplam sayfa sayısı.


  // Loading ekranı
  if (loading) {
    return (
      <div className="text-center mt-10 text-xl md:text-2xl font-bold">
        Veriler yükleniyor...
      </div>
    );
  }

  // Error ekranı
  if (error) {
    return (
      <div className="text-center mt-10 text-xl md:text-2xl font-bold text-red-500">
        Hata: {error}
      </div>
    );
  }

  return (
    <div className='flex flex-col gap-10'>
      {

        // Eğer displayedFlights boşsa, ekrana "Veri yok" mesajı yazdırılır.
        displayedFlights.length === 0 ? (
          <div className='mt-10 text-xl md:text-3xl font-bold'>Veri yok</div>
        ) : (

          // Boş değilse, listedeki her bir uçuş Flight bileşeni ile ekrana yazdırılır.
          displayedFlights.map((flight) => (
            <Flight key={flight.id} flight={flight} />
          ))
        )
      }

      <div className="flex justify-center gap-2 md:gap-3">
        {currentPage > 1 && (
          <button onClick={handlePreviousPage}>
            <i class="fa-solid fa-angle-left"></i>
          </button>
        )}
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
          <button key={pageNumber} className={`border text-sm sm:text-base border-gray-400 px-2 rounded-full ${pageNumber === currentPage ? 'text-black font-bold border-2 border-gray-600' : ''}`}
            onClick={() => setCurrentPage(pageNumber)}>
            {pageNumber}
          </button>
        ))}
        {currentPage < totalPages && (
          <button onClick={handleNextPage} >
            <i class="fa-solid fa-angle-right"></i>
          </button>
        )}
      </div>
    </div>
  )
}

export default FlightList