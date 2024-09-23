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
                    <section className='flex items-center gap-x-1 text-xl font-bold '>
                        <span><SiLotpolishairlines /></span>
                        <h1>PLANE SCAPE</h1>
                    </section>
                </Link>

                <section className='flex items-center gap-7 font-semibold'>
                    <div className='flex items-center justify-center gap-x-2'>
                        <span><GiTicket /></span>
                        <span>Deals</span>
                    </div>

                    <div className='flex items-center justify-center gap-x-2'>
                        <span><FaEarthAmericas /></span>
                        <span>Discover</span>
                    </div>

                    <div className='flex items-center justify-center gap-x-2 '>

                        {/* Show user information if logged in */}
                        <SignedIn>
                            <UserButton />
                            <h1>{user?.firstName}</h1>
                            /
                            <Link className='hover:underline' to="/myFlights">
                                MyFlights
                            </Link>
                        </SignedIn>
                        {/* If not logged in, show Sign In and Sign Up buttons */}
                        <SignedOut>
                            <SignUpButton className="hover:underline" mode='modal' />
                            |
                            <SignInButton className="hover:underline" mode='modal' />
                        </SignedOut>
                    </div>
                </section>
            </div>
        </header>
    );
};

export default Header;
