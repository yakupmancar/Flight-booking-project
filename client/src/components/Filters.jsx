import React, { useContext } from 'react';
import { FlightsContext } from '../context/flightsContext';


const Filters = () => {
    const { setFilters } = useContext(FlightsContext);  //setFilters state'ini ContextAPI'den aldık.

    //Arrival time(varış zamanı) filtresindeki değişkenleri handle ettik.
    const handleArrivalTimeChange = (event) => {
        const selectedValue = event.target.value;

        setFilters(prevFilters => ({
            ...prevFilters,
            arrivalTime: prevFilters.arrivalTime === selectedValue ? '' : selectedValue
        }));
    };

    //'stops' filtresindeki değişkenleri handle ettik.
    const handleStopsChange = (event) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            stops: event.target.value
        }));
    };
    return (
        <div>
            <div className='pl-5 py-4 w-full justify-around flex md:flex-col gap-5 text-sm'>
                <section className='hidden sm:block'>
                    <h1 className='font-semibold mb-2'>Sort by:</h1>
                    <select className='outline-none rounded py-[5px] xl:w-44 px-1'>
                        <option value="">Recommended</option>
                        <option value="">Lowest Price</option>
                        <option value="">Highest Price</option>
                    </select>
                </section>

                <section>
                    <h1 className='font-semibold mb-2'>Arrival Time</h1>
                    <div className='flex flex-col gap-1 text-[13px]'>
                        <span className='flex items-center gap-x-1'>
                            <input
                                type="radio"
                                name="arrival-time"
                                id="morning"
                                value="00-11"
                                className='appearance-none h-[9px] w-[9px] border border-[#3d008d] rounded-full checked:bg-[#3d008d] checked:border-transparent'
                                onChange={handleArrivalTimeChange}
                            />
                            <label htmlFor="morning" className='ml-1'>00:00 - 11:59</label>
                        </span>
                        <span className='flex items-center gap-x-1'>
                            <input
                                type="radio"
                                name="arrival-time"
                                id="afternoon"
                                value="12-23"
                                className='appearance-none h-[9px] w-[9px] border border-[#3d008d] rounded-full checked:bg-[#3d008d] checked:border-transparent'
                                onChange={handleArrivalTimeChange}

                            />
                            <label htmlFor="afternoon" className='ml-1'>12:00  - 00.00</label>
                        </span>
                    </div>
                </section>

                <section>
                    <h1 className='font-semibold mb-2'>Stops</h1>
                    <div className='flex flex-col gap-1 text-[13px]'>
                        <div className='flex justify-between'>
                            <span className='flex items-center gap-x-1'>
                                <input
                                    type="radio"
                                    name="stops"
                                    value="nonstop"
                                    id="nonstop"
                                    onChange={handleStopsChange}
                                    className='appearance-none h-[9px] w-[9px] border border-[#3d008d] rounded-full checked:bg-[#3d008d] checked:border-transparent'
                                />
                                <label htmlFor="nonstop" className='ml-1'>Nonstop</label>
                            </span>
                            <h1>$230</h1>
                        </div>
                        <div className='flex justify-between'>
                            <span className='flex items-center gap-x-1'>
                                <input
                                    type="radio"
                                    name="stops"
                                    value="one-stop"
                                    id="one-stop"
                                    className='appearance-none h-[9px] w-[9px] border border-[#3d008d] rounded-full checked:bg-[#3d008d] checked:border-transparent'
                                    onChange={handleStopsChange}
                                />
                                <label htmlFor="one-stop" className='ml-1'>1 Stop</label>
                            </span>
                            <h1>$230</h1>
                        </div>
                        <div className='flex justify-between'>
                            <span className='flex items-center gap-x-1'>
                                <input
                                    type="radio"
                                    name="stops"
                                    value="two-stop"
                                    id="two-stop"
                                    className='appearance-none h-[9px] w-[9px] border border-[#3d008d] rounded-full checked:bg-[#3d008d] checked:border-transparent'
                                    onChange={handleStopsChange}
                                />
                                <label htmlFor="two-stop" className='ml-1'>2+ Stop</label>
                            </span>
                            <h1>$230</h1>
                        </div>
                    </div>
                </section>

                <section className='hidden sm:block'>
                    <h1 className='font-semibold mb-2'>Airlines Included</h1>
                    <div className='flex flex-col gap-1 text-[13px]'>
                        <div className='flex items-center justify-between'>
                            <span className='flex items-center gap-1'>
                                <input
                                    type="radio"
                                    name="airline"
                                    id="airline1"
                                    className='appearance-none h-[9px] w-[9px] border border-[#3d008d] rounded-full checked:bg-[#3d008d] checked:border-transparent'
                                />
                                <label className='ml-1' htmlFor="airline1">Pegasus</label>
                            </span>
                            <h1>$230</h1>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Filters;
