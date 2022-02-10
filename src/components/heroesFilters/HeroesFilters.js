import { useEffect} from "react";
import { useDispatch, useSelector } from 'react-redux';

import store from "../../store";
import { filterActiveFetching, fetchFilters, selectAll } from './filtersSlice';

const HeroesFilters = () => {
    const dispatch = useDispatch();

    const filters = selectAll(store.getState());
    const { activeFilter } = useSelector(state => state.filters);
    
    const filterSelect = (filter) => {
        dispatch(filterActiveFetching(filter))
    }
    useEffect(() => {
       dispatch(fetchFilters())
        // eslint-disable-next-line
    }, []);
    const renderFilter = (arr) => {
        const btns = arr.map((item) => {
            const active = activeFilter === item.name;
            const clazz = active ? `btn ${item.className} active`: `btn ${item.className}`
            return(
                <button 
                    key={item.name} 
                    className={clazz}
                    onClick={()=> filterSelect(item.name)}
                    >
                        {item.name}
                </button>
            )
        })
        return (
            <div className="btn-group">
                {btns}
            </div>
        )
    }
    const elements = renderFilter(filters);
    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Filter heroes by elements</p>
                {elements}
            </div>
        </div>
    )
}

export default HeroesFilters;