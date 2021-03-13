import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AllyContext } from '../context/AllyContext';

const Allies = () => {
    const { allies, loadingAllies } = useContext(AllyContext);
    // const loading = useContext(AllyContext.loading);
    // const [loaded, setLoaded] = useState(false);

    // useEffect(() => {
    //     const getAllies = async () => {
    //         const res = await allyDataService.getAll();
    //         console.log(res);
    //         setAllies(res.data);
    //     }
    //     getAllies();
    // }, []);

    return (
        <div>
            {loadingAllies && <p>Loading</p> }
            {!loadingAllies && allies.map((ally, id) => (
                <h1 key={id}><Link to={`/ally/${ally.slug}`}> {ally.name} </Link></h1>
            ))}
        </div>
    )
}

export default Allies
