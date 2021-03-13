import React, { useEffect, useState } from 'react';
import showDataService from '../api/showDataService';

const Shows = () => {
    const [shows, setShows] = useState([]);
    // const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const getShows = async () => {
            const res = await showDataService.getAll();
            setShows(res.data);
        }
        getShows();
    }, []);

    return (
        <div>
            {shows.map((show, id) => (
                <h1 key={id}>{ show.title }</h1>
            ))}
        </div>
    )
}

export default Shows
