import {useHttp} from '../../hooks/http.hook';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect'
import { useCallback } from 'react';

import { fetchHeroes } from '../../actions';
import { heroesDeleteCard } from "./heroesSlice";

import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';


const HeroesList = () => {
    const filteredHeroesSelector = createSelector(
        (state) => state.filters.activeFilter,
        (state) => state.heroes.heroes,
        (filters, heroes) => {
            if(filters === 'all'){
                return heroes;
            }else {
                return heroes.filter(item => item.element === filters);
            }
        }
    )
    const filteredHeroes = useSelector(filteredHeroesSelector);
    // const filteredHeroes = useSelector(state => {
    //     if(state.filters.activeFilter === 'all'){
    //         return state.heroes.heroes;
    //     }else {
    //         return state.heroes.heroes.filter(item => item.element === state.filters.activeFilter);
    //     }
    // }); 


    const heroesLoadingStatus = useSelector(state => state.heroes.heroesLoadingStatus);
    const dispatch = useDispatch();
    const {request} = useHttp();
    useEffect(() => {
        dispatch(fetchHeroes(request));

        // eslint-disable-next-line
    }, []);
    
    const onDelete = useCallback((id) => {
        request(`http://localhost:3001/heroes/${id}`,"DELETE")
            .then(dispatch(heroesDeleteCard(id)))   
            .catch((err) => console.log(err))  
        // eslint-disable-next-line
    },[request]);

    // const filterPost = (items, filter) => {
    //     switch(filter) {
    //         case 'fire':
    //             return items.filter(item => item.element === 'fire')
    //         case 'water':
    //             return items.filter(item => item.element ==='water')
    //         case 'wind':
    //             return items.filter(item => item.element ==='wind')
    //         case 'earth':
    //             return items.filter(item => item.element ==='earth')
    //         default:
    //             return items
    //     }
    // }

    if (heroesLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (heroesLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Error</h5>
    }

    const renderHeroesList = (arr) => {
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">There aren't heroes</h5>
        }
        return arr.map(({id, ...props}) => {
            return <HeroesListItem 
                key={id} 
                {...props}
                onDelete = {() => onDelete(id)}
            />
        })
    }

    // const elements = renderHeroesList(filterPost(heroes, activeFilter));
    const elements = renderHeroesList(filteredHeroes);
    return (
        <ul>
            {elements}
        </ul>
    )
}

export default HeroesList;