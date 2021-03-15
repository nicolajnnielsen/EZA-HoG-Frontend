import http from './init';

const getAll = () => {
    return http.get('/games');
}

const getAllInducted = () => {
    return http.get('/games?inducted=true');
}

const getGame = id => {
    return http.get(`/games/${id}`);
}

const searchGames = filters => {
    return http.get(`/games?${filters}`);
}

const GameDataService = {
    getAll,
    getAllInducted,
    getGame,
    searchGames,
}

export default GameDataService