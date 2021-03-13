import http from './init';

const getAll = () => {
    return http.get('/games');
}

const getGame = id => {
    return http.get(`/games/${id}`);
}

const searchGames = filters => {
    return http.get(`/games?${filters}`);
}

const GameDataService = {
    getAll,
    getGame,
    searchGames,
}

export default GameDataService