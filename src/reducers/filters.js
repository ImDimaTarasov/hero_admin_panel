const initialState = {
    filters: [],
    activeFilter: 'all'
}

const filters = (state = initialState, action) => {
    switch (action.type) {
        case 'FILTERS_FETCHED':
            return {
                ...state,
                filters: action.payload,
            }
        case 'FILTER_ACTIVE':
            return {
                ...state,
                activeFilter: action.payload
            }
        default: return state
    }
}

export default filters;