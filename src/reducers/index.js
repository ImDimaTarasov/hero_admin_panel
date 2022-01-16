const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
    filters: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'HEROES_FETCHING':
            return {
                ...state,
                heroesLoadingStatus: 'loading'
            }
        case 'HEROES_FETCHED':
            return {
                ...state,
                heroes: action.payload,
                heroesLoadingStatus: 'idle'
            }
        case 'HEROES_FETCHING_ERROR':
            return {
                ...state,
                heroesLoadingStatus: 'error'
            }
        case 'HERO_DELETE':
            const newHeroArr = state.heroes.filter(hero => hero.id !== action.payload);
            return {
                ...state,
                heroes: newHeroArr
            }
        case 'HERO_ADD':
            const addHero = state.heroes.concat(action.payload);
            return {
                ...state,
                heroes: addHero
            }
        case 'FILTERS_FETCHED':
        return {
            ...state,
            filters: action.payload,
        }
        default: return state
    }
}

export default reducer;