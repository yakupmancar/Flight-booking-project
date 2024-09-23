import React from 'react';
import SearchFlights from '../../components/SearchFlights';
import Sidebar from '../../components/Sidebar';
import FlightList from '../../components/FlightList';
import Filters from '../../components/Filters';
import '../../assets/styles/scroll.css';

const Home = () => {
  return (
    <div>
      <div className='flex gap-x-6 mx-5 pb-5'>
        <section className='w-[83%] flex flex-col gap-7'>
          <SearchFlights />

          <div className='flex'>
            <section className='w-4/5 scrollable'>
              <FlightList />
            </section>

            <section className='w-1/5'>
              <Filters />
            </section>

          </div>
        </section>

        <section className='w-1/5'>
          <Sidebar />
        </section>
      </div>
    </div>
  );
};

export default Home;
