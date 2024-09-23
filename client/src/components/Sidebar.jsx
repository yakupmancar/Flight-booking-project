import React from 'react'
import { IoCarOutline } from "react-icons/io5";
import { FaHotel } from "react-icons/fa6";
import { FaUmbrellaBeach } from "react-icons/fa";


const Sidebar = () => {
    return (
        <div>
            <div className='flex flex-col gap-6'>
                <section className='relative cursor-pointer'>
                    <img className='w-full h-60 rounded-2xl object-cover' src="https://images.pexels.com/photos/825890/pexels-photo-825890.jpeg" />
                    <div className='absolute bottom-6 left-4 text-lg text-gray-100 font-semibold'>
                        <span className='text-4xl'>
                            <IoCarOutline />
                        </span>
                        <h1>CAR RENTALS</h1>
                    </div>
                </section>

                <section className='relative cursor-pointer'>
                    <img className='w-full h-60 rounded-2xl object-cover' src="https://images.pexels.com/photos/774042/pexels-photo-774042.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
                    <div className='absolute bottom-6 left-4 text-lg text-gray-100 font-semibold'>
                        <span className='text-4xl'>
                            <FaHotel/>
                        </span>
                        <h1>HOTELS</h1>
                    </div>
                </section>

                <section className='relative cursor-pointer'>
                    <img className='w-full h-60 rounded-2xl object-cover' src="https://images.pexels.com/photos/4247717/pexels-photo-4247717.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
                    <div className='absolute bottom-6 left-4 text-lg text-gray-100 font-semibold'>
                        <span className='text-4xl'>
                            <FaUmbrellaBeach />
                        </span>
                        <h1>TRAVEL PACKAGE</h1>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default Sidebar