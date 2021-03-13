import React, { useEffect, useState } from 'react'
import gameDataService from '../api/gameDataService';

const Home = () => {
    const [games, setGames] = useState([]);
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        const getGames = async () => {
            const res = await gameDataService.getAll();
            setGames(res.data);
            setLoading(false);
        }

        getGames();
    }, []);

    return (
        <div className="">
            {isLoading && <h1>Loading</h1>}
            {!isLoading && games.map((game, id) => {
                return (
                    <h2 key={id} >{game.title}</h2>
                )
            })}
        </div>
    );
}

export default Home
