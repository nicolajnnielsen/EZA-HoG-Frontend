import React, { useContext } from 'react';
import AllyCard from '../components/AllyCard';
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
        <div className="container mx-auto flex flex-wrap justify-center">
            {loadingAllies && <p>Loading</p> }
            {!loadingAllies && allies.map((ally, i) => (
                <AllyCard key={i} ally={ally} />
            ))}
        </div>
    )
}

export default Allies
