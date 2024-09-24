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
        <section className='w-full lg:w-[83%] flex flex-col gap-7'>
          <div className='w-full'>
            <SearchFlights />
          </div>

          {/* Ekran md altındayken Filters componenti, SearchFlights ile FlightList arasında olur */}
          <div className='flex flex-col md:flex-row md:gap-5'>
            <section className='md:hidden w-full mt-5'>
              <Filters />
            </section>

            <section className='w-full md:w-4/5 scrollable'>
              <FlightList />
            </section>

            {/* md ve üzeri ekranlar için sağ tarafta Filters */}
            <section className='hidden md:block w-1/5'>
              <Filters />
            </section>
          </div>
        </section>

        {/* lg ve üzeri ekranlarda sağda Sidebar */}
        <section className='hidden lg:block lg:w-1/5'>
          <Sidebar />
        </section>
      </div>
    </div>
  );
};

export default Home;
