import React, { useEffect, useState } from 'react'
import gameDataService from '../api/gameDataService';
import Loader from '../components/Loader';

const Home = () => {
    const [games, setGames] = useState([]);
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        const getGames = async () => {
            const res = await gameDataService.getAll();
            setGames(res.data);
            // setLoading(false);
        }

        getGames();
    }, []);

    return (
        <div className="">
            {isLoading && <Loader />}
            {!isLoading && games.map((game, id) => {
                return (
                    <h2 key={id} >{game.title}</h2>
                )
            })}
        </div>
    );
}

export default Home
