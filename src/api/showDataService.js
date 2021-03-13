import http from './init';

const getAll = () => {
    return http.get('/shows');
}

const getShow = id => {
    return http.get(`/shows/${id}`);
}

const ShowDataService = {
    getAll,
    getShow,
}

export default ShowDataService