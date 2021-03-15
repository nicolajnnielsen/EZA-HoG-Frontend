import qs from 'qs';
import React, { useContext, useEffect, useRef, useState } from 'react'
import gameDataService from '../api/gameDataService';
import GameCard from '../components/GameCard';
import { AllyContext } from '../context/AllyContext';
import useDebounce from '../hooks/useDebounce';

const Games = () => {
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

    const [sidebarOpen, setSidebarOpen] = useState(false);

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

    const handleSidebar = () => {
        setSidebarOpen((prevState) => !prevState);
    }

    return (
        <div className="grid md:grid-cols-sidebar gap-5 px-5">
            <button className="bg-yellow-400 rounded-md md:hidden" onClick={handleSidebar}>Show Filters</button>
            <aside className={`fixed bottom-0 left-0 z-50 w-full transform transition ${!sidebarOpen && "translate-y-full"} md:static md:transform-none bg-trueGray-800 text-white p-3`}>
                <form className="flex flex-col space-y-5">
                    <div>
                        <label className="block" htmlFor="search">Title or developer</label>
                        <span className="block relative max-w-full">
                            <input className="max-w-full text-black pr-6 border-trueGray-400 focus:border-red-600 focus:ring-1 focus:ring-red-600 rounded-lg" type="text" placeholder="Title or developer" name="search" id="search" value={searchFilter} onChange={handleSearch} />
                            <svg class={`absolute right-1 top-1/2 transform origin-top -translate-y-1/2 z-40 animate-spin-center h-4 w-4 text-red-700 ${isFiltering ? "" : "hidden"}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        </span>

                    </div>
                    <ul className="flex flex-col">
                        <li className="flex justify-between items-center mb-1"><label className="mr-2" htmlFor="inductedFalse">Not inducted</label> <input type="radio" name="inducted" id="inductedFalse" className="text-red-600 focus:ring-red-600 focus:ring-2 focus:ring-offset-trueGray-800" value="false" checked={filterValues.inducted === false} onChange={handleFilterChange} /></li>
                        <li className="flex justify-between items-center mb-1"><label className="mr-2" htmlFor="inductedNull">All</label> <input type="radio" name="inducted" id="inductedNull" className="text-red-600 focus:ring-red-600 focus:ring-2 focus:ring-offset-trueGray-800" value="" checked={filterValues.inducted === null} onChange={handleFilterChange} /></li>
                        <li className="flex justify-between items-center mb-1"><label className="mr-2" htmlFor="inductedTrue">Inducted</label> <input type="radio" name="inducted" id="inductedTrue" className="text-red-600 focus:ring-red-600 focus:ring-2 focus:ring-offset-trueGray-800" value="true" checked={filterValues.inducted === true} onChange={handleFilterChange} /></li>
                    </ul>
                    <div className="">
                        <label className="block" htmlFor="ally">Choose Ally</label>
                        <select className="w-full text-black border-trueGray-400 focus:border-red-600 focus:ring-1 focus:ring-red-600 rounded-lg" name="ally" id="ally" onChange={handleFilterChange} value={filterValues.nominatedBy} >
                            <option value="" >Select Ally</option>
                            {!loadingAllies && allies.map((ally, index) => (
                                <option key={index} value={ally.id}>{ally.name}</option>
                            ))}
                        </select>
                    </div>
                </form>
            </aside>

            {error && <p>{error}</p>}
            {isFiltering && <h1>Searching...</h1>}
            {loading && <h1>Loading...</h1>}
            <section className="container mx-auto grid md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-4 content-start">
                {(!isFiltering && !loading && !error) && games.map((game, i) => {
                    return (
                        <GameCard key={i} game={game} />
                    )
                })}
            </section>
        </div>
    )
}

export default Games
