import {heroesFetching, heroesFetched, heroesFetchingError} from '../components/heroesList/heroesSlice';


export const fetchHeroes = (request) => (dispatch)=> {
    dispatch(heroesFetching());
    request("http://localhost:3001/heroes")
        .then(data => dispatch(heroesFetched(data)))
        .catch(() => dispatch(heroesFetchingError()))
}

export const fetchFilters = (request) => (dispatch) => {
    request(`http://localhost:3001/filters`)
        .then(data => dispatch(filtersFetched(data)))
        .catch((err) => console.log(err))
}
// export const heroesFetching = () => {
//     return {
//         type: 'HEROES_FETCHING'
//     }
// }

// export const heroesFetched = (heroes) => {
//     return {
//         type: 'HEROES_FETCHED',
//         payload: heroes
//     }
// }

// export const heroesFetchingError = () => {
//     return {
//         type: 'HEROES_FETCHING_ERROR'
//     }
// }

// export const heroesDeleteCard = (id) => {
//     return {
//         type: 'HERO_DELETE',
//         payload: id
//     }
// }
// export const heroesAddCard = (hero) => {
//     return {
//         type: 'HERO_ADD',
//         payload: hero
//     }
// }
export const filtersFetched = (filters) => {
    return {
        type: 'FILTERS_FETCHED',
        payload: filters
    }
}
export const filterActive = (filter) => {
    return {
        type: 'FILTER_ACTIVE',
        payload: filter
    }
}
