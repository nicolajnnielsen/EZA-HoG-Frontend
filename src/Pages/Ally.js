import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import allyDataService from '../api/allyDataService'

const Allies = () => {
    const { id } = useParams();
    const [ally, setAlly] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const getAllies = async () => {
            const res = await allyDataService.getAlly(id);
            console.log(res);
            setAlly(res.data);
            setLoaded(true);
        }
        getAllies();
    }, [id]);

    return (
        <div>
            {loaded && <h1>{ ally.name }</h1> }
        </div>
    )
}

export default Allies
