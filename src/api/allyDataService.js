import http from './init';

const getAll = () => {
    return http.get('/allies');
}

const getAlly = id => {
    return http.get(`/allies/${id}`);
}

const AllyDataService = {
    getAll,
    getAlly,
}

export default AllyDataService