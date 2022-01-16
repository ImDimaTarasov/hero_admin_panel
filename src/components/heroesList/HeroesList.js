import {useHttp} from '../../hooks/http.hook';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { heroesFetching, heroesFetched, heroesFetchingError, heroesDeleteCard } from '../../actions';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';

// Задача для этого компонента:
// При клике на "крестик" идет удаление персонажа из общего состояния
// Усложненная задача:
// Удаление идет и с json файла при помощи метода DELETE

const HeroesList = () => {
    const {heroes, heroesLoadingStatus, activeFilter} = useSelector(state => state);
    const dispatch = useDispatch();
    const {request} = useHttp();
    useEffect(() => {
        dispatch(heroesFetching());
        request("http://localhost:3001/heroes")
            .then(data => dispatch(heroesFetched(data)))
            .catch(() => dispatch(heroesFetchingError()))

        // eslint-disable-next-line
    }, []);
    
    const onDelete = (id) => {
        request(`http://localhost:3001/heroes/${id}`,"DELETE")
            .then(dispatch(heroesDeleteCard(id)))   
            .catch(() => dispatch(heroesFetchingError()))  
    }
    const filterPost = (items, filter) => {
        switch(filter) {
            case 'fire':
                return items.filter(item => item.element === 'fire')
            case 'water':
                return items.filter(item => item.element ==='water')
            case 'wind':
                return items.filter(item => item.element ==='wind')
            case 'earth':
                return items.filter(item => item.element ==='earth')
            default:
                return items
        }
    }
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

    const elements = renderHeroesList(filterPost(heroes, activeFilter));
    return (
        <ul>
            {elements}
        </ul>
    )
}

export default HeroesList;