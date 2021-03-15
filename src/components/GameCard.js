import React from 'react'
import { Link } from 'react-router-dom';
import placeholder from '../logo.svg';

const GameCard = ({ game, rowSpan, colSpan }) => {
    return (
        <article className={`bg-trueGray-800 rounded-2xl shadow-md ${colSpan ? "col-span-2" : ""}`}>
            <Link to={`/game/${game.slug}`}>
                <div className="aspect-w-3 aspect-h-4">
                    <img className="object-cover rounded-2xl" src={game.cover ? game.cover.url : placeholder} alt=""/>
                </div>
                <div className="p-3">
                    <h2 className="text-2xl 2xl:text-3xl text-center text-red-600">{game.title}</h2>
                    <h3 className="text-xl 2xl:text-2xl text-center text-blue-300">{game.developer}</h3>
                </div>
            </Link>
        </article>
    )
}

export default GameCard
