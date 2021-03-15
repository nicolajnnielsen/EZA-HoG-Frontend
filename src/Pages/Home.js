import React, { useEffect, useState } from 'react'
import gameDataService from '../api/gameDataService';
import GameCard from '../components/GameCard';

const Home = () => {
    const [games, setGames] = useState([]);
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        const getGames = async () => {
            const res = await gameDataService.getAllInducted();
            setGames(res.data);
            setLoading(false);
        }
        getGames();
    }, []);

    return (
        <div className="container mx-auto grid lg:grid-cols-4 xl:grid-cols-5 content-start">
            {isLoading && <h1>Loading</h1>}
            {!isLoading && games.map((game, i) => {
                {/* if (i === 1) {
                    return (
                        <GameCard key={i} game={game} colSpan={true} />
                    )
                }
                if (i === 3) {
                    return (
                        <GameCard key={i} game={game} rowSpan={true} />
                    )
                } */}
                return (
                    <GameCard key={i} game={game} />
                )
            })}
        </div>
    );
}

export default Home
