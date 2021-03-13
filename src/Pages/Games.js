import qs from 'qs';
import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import gameDataService from '../api/gameDataService';
import { AllyContext } from '../context/AllyContext';
import useDebounce from '../hooks/useDebounce';

const Game = () => {
    const { allies, loadingAllies } = useContext(AllyContext);
    const firstRender = useRef(true);
    
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);    
    const [isFiltering, setIsFiltering] = useState(false);

    const [error, setError] = useState();
    const [searchFilter, setSearchFilter] = useState("")
    const debouncedFilter = useDebounce(searchFilter, 500);
    const [filterValues, setFilterValues] = useState({
        year: null,
        platform: null,
        inducted: null,
        nominatedBy: "",
    });

    useEffect(() => {
        const query = qs.stringify({
            _where: [
                { _or: [{ title_contains: debouncedFilter || null }, { developer_contains: debouncedFilter || null }] },
                { inducted: filterValues.inducted },
                { nominated_by: filterValues.nominatedBy || null }
            ]
        }, { skipNulls: true });

        const filterGames = async (filters) => {
            try {
                const res = await gameDataService.searchGames(filters);
                setGames(res.data);
                setIsFiltering(false);
                setLoading(false);
            } catch (error) {
                console.log(error.response);
            }
        }
        if (firstRender.current) {
            firstRender.current = false;
            filterGames(query);
        } else {
            setIsFiltering(true);
            filterGames(query);
        }
    }, [debouncedFilter, filterValues]);

    const handleFilterChange = (e) => {
        const field = e.target;
        if (field.name === 'inducted') {
            setFilterValues(prevState => ({ ...prevState, inducted: radioToBool(field.value) }));
        }
        if (field.name === 'ally') {
            setFilterValues(prevState => ({ ...prevState, nominatedBy: field.value }));
        }
    }

    const handleSearch = (e) => {
        const field = e.target;
        setIsFiltering(/^\s+$/.test(field.value) ? false : true);
        setSearchFilter(/^\s+$/.test(field.value) ? field.value.trim() : field.value);
    }

    const radioToBool = (value) => {
        if (value.toLowerCase() === 'true') return true;
        if (value.toLowerCase() === 'false') return false;
        if (value.toLowerCase() === '') return null;
    }

    return (
        <div>
            <form >
                <div>
                    <label htmlFor="search">Title or developer</label>
                    <input type="text" placeholder="Title or developer" name="search" id="search" value={searchFilter} onChange={handleSearch} />
                </div>
                <ul>
                    <li><label htmlFor="inductedFalse">Not inducted</label> <input type="radio" name="inducted" id="inductedFalse" value="false" checked={filterValues.inducted === false} onChange={handleFilterChange} /></li>
                    <li><label htmlFor="inductedNull">Both</label> <input type="radio" name="inducted" id="inductedNull" value="" checked={filterValues.inducted === null} onChange={handleFilterChange} /></li>
                    <li><label htmlFor="inductedTrue">Inducted</label> <input type="radio" name="inducted" id="inductedTrue" value="true" checked={filterValues.inducted === true} onChange={handleFilterChange} /></li>
                </ul>
                <select name="ally" id="" onChange={handleFilterChange} value={filterValues.nominatedBy} >
                    <option value="" >Select Ally</option>
                    {!loadingAllies && allies.map((ally, index) => (
                        <option key={index} value={ally.id}>{ ally.name }</option>
                    ))}
                </select>
                <button>Search Games</button>
            </form>

            {error && <p>{error}</p>}
            {isFiltering && <h1>Searching...</h1>}
            {loading && <h1>Loading...</h1>}
            {(!isFiltering && !loading && !error) && games.map((game, id) => {
                return (
                    <h2 key={id} ><Link to={`/game/${game.slug}`}> {game.title} </Link></h2>
                )
            })}
        </div>
    )
}

export default Game
