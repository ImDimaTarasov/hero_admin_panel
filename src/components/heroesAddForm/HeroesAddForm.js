import { useState} from "react";
import { useDispatch, useSelector } from 'react-redux';

import { v4 as randomId } from 'uuid';

import store from "../../store";
import {useHttp} from '../../hooks/http.hook';
import { heroesAddCard } from "../heroesList/heroesSlice";
import { selectAll } from '../heroesFilters/filtersSlice';

const HeroesAddForm = () => {
    const [heroName, setHeroName] = useState('');
    const [heroDescription, setHeroDescription] = useState('');
    const [heroElement, setHeroElement] = useState('');

    const filtersLoadingStatus = useSelector(state => state.filters);
    const filters = selectAll(store.getState());
    const {request} = useHttp();
    const dispatch = useDispatch();


    const onSubmit = (e) => {
        e.preventDefault();
        const newHero = {
            id: randomId(),
            name: heroName,
            description: heroDescription,
            element: heroElement
        };
        request(`http://localhost:3001/heroes/`,"POST", JSON.stringify(newHero))
            .then(dispatch(heroesAddCard(newHero)))
            .catch(() => console.log("method POST is not available here"))
        setHeroName('');
        setHeroDescription('');
        setHeroElement('');
    }

    const renderFilter = (filters, status) => {
        if (status === 'loading'){
            return (<option>Loading</option>)
        } else if (status === 'error'){
            return (<option>Error</option>)
        }

        if( filters && filters.length > 0){
            return filters.map(({name, id}) => {
                // eslint-disable-next-line
                if(name === 'all') return;
                return (
                    <option key={id} value={name}> {name}</option>
                )
            })
        }
    };
    
    return (
        <form 
            className="border p-4 shadow-lg rounded"
            onSubmit={onSubmit}
        >
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Name</label>
                <input 
                    onChange ={(e)=>setHeroName(e.target.value)}
                    value ={heroName}
                    required
                    type="text" 
                    name="name" 
                    className="form-control" 
                    id="name" 
                    placeholder="What is my name?"/>
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Description</label>
                <textarea
                    onChange ={(e)=>setHeroDescription(e.target.value)}
                    value ={heroDescription}
                    required
                    name="text" 
                    className="form-control" 
                    id="text" 
                    placeholder="What can I do?"
                    style={{"height": '130px'}}/>
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Select element of hero</label>
                <select 
                onChange ={(e)=>setHeroElement(e.target.value)}
                value ={heroElement}
                required
                className="form-select" 
                id="element" 
                name="element">
                <option >My element...</option>
                {renderFilter(filters,filtersLoadingStatus )}
            </select>
            </div>

            <button type="submit" className="btn btn-primary">Create</button>
        </form>
    )
}

export default HeroesAddForm;