import React from 'react';
import { FaEarthAmericas } from "react-icons/fa6";
import { GiTicket } from "react-icons/gi";
import { SiLotpolishairlines } from "react-icons/si";
import { Link } from 'react-router-dom';
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton, useUser } from '@clerk/clerk-react';

const Header = () => {

    const { user } = useUser();
    return (
        <header className='mx-6'>
            <div className='flex justify-between h-20 items-center'>
                <Link to="/">
                    <section className='flex items-center gap-x-2 text-sm sm:text-lg md:text-xl font-bold '>
                        <span><SiLotpolishairlines /></span>
                        <h1>PLANE SCAPE</h1>
                    </section>
                </Link>

                <section className='flex items-center gap-7 font-semibold'>
                    <div className='md:flex hidden items-center justify-center gap-x-2'>
                        <span><GiTicket /></span>
                        <span>Deals</span>
                    </div>

                    <div className='hidden md:flex items-center justify-center gap-x-2 cursor-pointer'>
                        <span><FaEarthAmericas /></span>
                        <span>Discover</span>
                    </div>

                    <div className='flex items-center justify-center gap-x-1 sm:gap-x-2'>

                        {/* Oturum açılmışa kullanıcı bilgilerini gösterir. */}
                        <SignedIn>
                            <UserButton/>
                            <h1 className='sm:text-base text-sm'>{user?.firstName}</h1>
                            /
                            <Link className='hover:underline sm:text-base text-sm' to="/myFlights">
                                MyFlights
                            </Link>
                        </SignedIn>
                        
                        {/* Oturum açılmamışsa Signin ve Signout butonları gözükür. */}
                        <SignedOut>
                            <SignUpButton className="hover:underline sm:text-base text-xs" mode='modal' />
                            |
                            <SignInButton className="hover:underline sm:text-base text-xs" mode='modal' />
                        </SignedOut>
                    </div>
                </section>
            </div>
        </header>
    );
};

export default Header;
