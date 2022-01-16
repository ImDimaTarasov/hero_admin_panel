import { useState, useEffect} from "react";
import { useDispatch, useSelector } from 'react-redux';

import { v4 as randomId } from 'uuid';

import {useHttp} from '../../hooks/http.hook';
import { heroesAddCard, filtersFetched, heroesFetchingError} from "../../actions";
// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST

// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров

const HeroesAddForm = () => {
    const [heroName, setHeroName] = useState('');
    const [heroDescription, setHeroDescription] = useState('');
    const [heroElement, setHeroElement] = useState('');


    const {request} = useHttp();
    const dispatch = useDispatch();
    const {filters} = useSelector(state => state);
    
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
            .catch(() => dispatch(heroesFetchingError()))
        setHeroName('');
        setHeroDescription('');
        setHeroElement('');
    }

    useEffect(() => {
        request(`http://localhost:3001/filters`)
            .then(data => dispatch(filtersFetched(data)))
            .catch(() => dispatch(heroesFetchingError()))
        // eslint-disable-next-line
    }, []);



    const renderElement = (arr) => {
        
        const elem = arr.map((item,i) => {
            return (
                <option key={i} value={item.name}> {item.name}</option>
            )
        })
        return (
            <select 
                onChange ={(e)=>setHeroElement(e.target.value)}
                value ={heroElement}
                required
                className="form-select" 
                id="element" 
                name="element">
                <option >My element...</option>
                {elem}
            </select>
        )
       
    }
    
    const elements = renderElement(filters.slice(1,filters.length));
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
                {elements}
            </div>

            <button type="submit" className="btn btn-primary">Create</button>
        </form>
    )
}

export default HeroesAddForm;