import React from 'react'
import { NavLink } from 'react-router-dom'

const Header = () => {
    return (
        <header className="site-header">
            <h1 className="site-title">Easy Allies Hall of Greats</h1>
            <nav className="site-nav">
                <ul>
                    <li>
                        <NavLink to="/">Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/games">Games</NavLink>
                    </li>
                    <li>
                        <NavLink to="/allies">Allies</NavLink>
                    </li>
                    <li>
                        <NavLink to="/shows">Shows</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Header
