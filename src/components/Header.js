import React from 'react'
import { Link, NavLink } from 'react-router-dom'

const Header = () => {
    return (
        <header className="bg-black flex justify-between items-center px-5 h-20">
            <h1 className="text-red-600 text-2xl"><Link to="/"> Easy Allies Hall of Greats</Link></h1>
            <nav className="flex-grow">
                <ul className="flex justify-evenly text-xl">
                    <li>
                        <NavLink to="/" className="text-white" >Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/games" className="text-white" >Games</NavLink>
                    </li>
                    <li>
                        <NavLink to="/allies" className="text-white" >Allies</NavLink>
                    </li>
                    <li>
                        <NavLink to="/shows" className="text-white" >Shows</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Header
