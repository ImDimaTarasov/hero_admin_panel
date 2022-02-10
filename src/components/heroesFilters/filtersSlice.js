import { createAsyncThunk, createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import {useHttp} from '../../hooks/http.hook';


const filtersAdapter = createEntityAdapter();
const initialState = filtersAdapter.getInitialState({
    filtersLoadingStatus: 'idle',
    activeFilter: 'all'
});

export const fetchFilters = createAsyncThunk(
    'filters/filtersFetched',
    () => {
        const {request} = useHttp();
        const filters = request(`http://adminpanel.dimatarasov.com/heroes.json`)
            .then(data => data.filters)
        return filters
    }
);

const filtersSlice = createSlice({
    name:  'filters',
    initialState,
    reducers: {
        filtersFetched: (state, action) => {
            state.filters = action.payload;
        },
        filterActiveFetching: (state, action) => {
            state.activeFilter = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchFilters.pending, state => {state.filtersLoadingStatus = 'loading'})
            .addCase(fetchFilters.fulfilled, (state, action) => {
                state.filtersLoadingStatus = 'idle';
                filtersAdapter.setAll(state, action.payload)
            })
            .addCase(fetchFilters.rejected, state => {state.filtersLoadingStatus = 'error'})
            .addDefaultCase(()=>{})
    }
});

const {actions, reducer} = filtersSlice;

export const {selectAll} = filtersAdapter.getSelectors((state) => state.filters);

export default reducer;
export const { 
    filtersFetched,
    filterActiveFetching
} = actions;