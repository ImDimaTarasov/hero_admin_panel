import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle'
}

const heroesSlice = createSlice({
    name:  'heroes',
    initialState,
    reducers: {
        heroesFetching: state => {state.heroesLoadingStatus = 'loading'},
        heroesFetched: (state, action) => {
            state.heroesLoadingStatus = 'idle';
            state.heroes = action.payload;
        },
        heroesFetchingError: state => {state.heroesLoadingStatus = 'error'},
        heroesDeleteCard: (state, action) => {
            state.heroes = state.heroes.filter(hero => hero.id !== action.payload);
        },
        heroesAddCard:(state, action) => {
            state.heroes.push(action.payload);
        },
    }
});

const {actions, reducer} = heroesSlice;

export default reducer;
export const { 
    heroesFetching,
    heroesFetched,
    heroesFetchingError,
    heroesDeleteCard,
    heroesAddCard
} = actions;