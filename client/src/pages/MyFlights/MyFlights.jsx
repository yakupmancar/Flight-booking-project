import React, { useContext } from 'react';
import { FlightsContext } from '../../context/FlightsContext';
import { FaAngleDown } from "react-icons/fa";
import { useClerk } from '@clerk/clerk-react';

const MyFlights = () => {
  const { myFlights } = useContext(FlightsContext);
  const { user } = useClerk(); // We get user information from Clerk

  console.log(user?.firstName);
  console.log(myFlights)

  const options = { timeZone: 'Europe/Istanbul', hour: '2-digit', minute: '2-digit', hour12: false };

  // If the user is not logged in;
  if (!user) {
    return (
      <div className='mx-5'>
        <h1 className='text-2xl font-bold'>Please log in to view your flights.</h1>
      </div>
    );
  }

  // If the user does not have a flight reservation;
  if (myFlights.length === 0) {
    return (
      <div className='mx-5'>
        <h1 className='text-2xl font-bold'>You do not have any flights booked yet.</h1>
      </div>
    );
  }


  return (
    <div>
      <div className='mx-5 flex flex-col gap-7'>
        <section className='flex gap-2 items-center'>
          <h1 className='font-semibold text-lg'>Sort by:</h1>
          <select className='bg-transparent outline-none rounded py-[5px] pr-3 font-bold'>
            <option value="">Recommended</option>
            <option value="">Lowest Price</option>
            <option value="">Highest Price</option>
          </select>
        </section>

        <div className='flex flex-col gap-7'>
          {
            myFlights.map((myFlight) => {

              const departureTimeTR = new Date(myFlight.departureTime).toLocaleString('tr-TR', options);  // Convert the departure time to Türkiye time

              const arrivalTimeTR = new Date(myFlight.arrivalTime).toLocaleString('tr-TR', options);      // Convert the arrival time to Türkiye time

              const duration = Math.ceil((new Date(myFlight.arrivalTime) - new Date(myFlight.departureTime)) / 60000);

              return (
                <div key={myFlight._id}>
                  <div className='flex bg-white p-6 items-center justify-between rounded-md shadow-md'>
                    <section className='flex'>
                      <div>
                        <img src="https://i.pinimg.com/originals/3c/6c/ac/3c6cac0a8480708ad226ab1eb6e27d35.jpg" className='w-10 h-10 rounded-full object-cover mr-5' />
                      </div>

                      <div>
                        <section className='text-3xl mb-5 tracking-wider text-gray-700'>{departureTimeTR} - {arrivalTimeTR}</section>
                        <div className='flex gap-20'>
                          <section>
                            <h1 className='font-semibold text-lg mr-8'>Delta Airlines</h1>
                            <span className='flex items-center text-sm text-blue-600 hover:underline gap-2'>
                              <a href='#'>Flight details</a>
                              <FaAngleDown />
                            </span>
                          </section>
                          <section>
                            <h1 className='font-semibold text-lg'>Nonstop</h1>
                            <h1>{duration} mins</h1>
                          </section>
                          <section>
                            <h1 className='font-semibold text-lg'>AMS to {myFlight.destination}</h1>
                            <h1>{myFlight.mainFlightCode}</h1>
                          </section>
                        </div>
                      </div>
                    </section>

                    <section className='flex'>
                      <div className='flex flex-col border w-20 h-[90px] m-2 rounded-lg items-center justify-center gap-3 cursor-pointer'>
                        <h1 className='font-bold'>$156</h1>
                        <h1 className='text-sm text-gray-500'>Main</h1>
                      </div>
                      <div className='flex flex-col border w-20 h-[90px] m-2 rounded-lg items-center justify-center gap-3 cursor-pointer'>
                        <h1 className='font-bold'>$156</h1>
                        <h1 className='text-sm text-gray-500'>Comfort+</h1>
                      </div>
                      <div className='flex flex-col border w-20 h-[90px] m-2 rounded-lg items-center justify-center gap-3 bg-[#eeeff1] cursor-pointer'>
                        <h1 className='text-gray-300'>. . .</h1>
                      </div>
                      <div className='flex flex-col border w-20 h-[90px] m-2 rounded-lg items-center justify-center gap-3 cursor-pointer'>
                        <h1 className='font-bold'>$156</h1>
                        <h1 className='text-sm text-gray-500'>Delta One</h1>
                      </div>
                      <div className='flex flex-col border w-20 h-[90px] m-2 rounded-lg items-center justify-center gap-3 bg-[#eeeff1] cursor-pointer'>
                        <h1 className='text-gray-300'>. . .</h1>
                      </div>
                    </section>
                  </div>
                </div>
              );
            })
          }
        </div>
      </div>
    </div>
  );
};

export default MyFlights;
