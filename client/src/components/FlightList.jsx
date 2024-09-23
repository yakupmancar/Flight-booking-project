import React, { useContext, useState } from 'react'
import Flight from './Flight'
import { FlightsContext } from '../context/FlightsContext';

const FlightList = () => {

  const { flights, loading, error } = useContext(FlightsContext);

  if (loading) {
    console.log("veriler yükleniyor")
  }

  if (error) {
    console.log("error", error)
  }

  //! PAGINATION
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const handlePagination = (data) => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return data.slice(startIndex, endIndex);
  };
  const displayedFlights = handlePagination(flights);

  const handleNextPage = () => {
    if (currentPage < Math.ceil(flights.length / pageSize)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const totalPages = Math.ceil(flights.length / pageSize);


  return (
    <div className='flex flex-col gap-10'>
      {
        displayedFlights.length === 0 ? (
          <div>Veri yok</div>
        ) : (
          displayedFlights.map((flight) => (
      <Flight key={flight.id} flight={flight} />
      ))
      )
      }

      <div className="flex justify-center gap-x-3">
        {currentPage > 1 && (
          <button className='' onClick={handlePreviousPage}>
            <i class="fa-solid fa-angle-left"></i>
          </button>
        )}
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
          <button key={pageNumber} className={`border border-gray-400 px-2 rounded-full ${pageNumber === currentPage ? 'text-black font-bold border-2 border-gray-600' : ''}`}
            onClick={() => setCurrentPage(pageNumber)}>
            {pageNumber}
          </button>
        ))}
        {currentPage < totalPages && (
          <button className='' onClick={handleNextPage} >
            <i class="fa-solid fa-angle-right"></i>
          </button>
        )}
      </div>
    </div>
  )
}

export default FlightList