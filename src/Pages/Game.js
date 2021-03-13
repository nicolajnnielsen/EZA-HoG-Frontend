import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import gameDataService from '../api/gameDataService';

const Game = () => {
    const [game, setGame] = useState();
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState();
    const { id } = useParams();

    useEffect(() => {
        const getGame = async () => {
            try {
                const res = await gameDataService.getGame(id);
                setGame(res.data);
                setLoaded(true);
            } catch (error) {
                console.log(error.response);
                setError(error.response.data);
                setLoaded(true);
            }
        }
        getGame();
    }, [id]);

    return (
        <div>
            {error && <p>{ error }</p> }
            {!loaded && <h1>Loading</h1> }
            {( loaded && !error ) && <h1> {game.title} </h1>}
        </div>
    )
}

export default Game
