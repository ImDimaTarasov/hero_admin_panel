import {useHttp} from '../../hooks/http.hook';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';

import { heroesDeleteCard, fetchHeroes, filteredHeroesSelector } from "./heroesSlice";

import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';


const HeroesList = () => {
   
    const filteredHeroes = useSelector(filteredHeroesSelector);
    const heroesLoadingStatus = useSelector(state => state.heroes.heroesLoadingStatus);
    const dispatch = useDispatch();
    const {request} = useHttp();


    useEffect(() => {
        dispatch(fetchHeroes());

        // eslint-disable-next-line
    }, []);
    
    const onDelete = useCallback((id) => {
        request(`http://localhost:3001/heroes/${id}`,"DELETE")
            .then(dispatch(heroesDeleteCard(id)))   
            .catch(() => console.log("method DELETE is not available here"))  
        // eslint-disable-next-lin
    },[request]);
    

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