import { useDispatch, useSelector } from 'react-redux';

import { filterActive } from "../../actions";
// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

const HeroesFilters = () => {
    const dispatch = useDispatch();
    const {filters, activeFilter} = useSelector(state => state);

    const filterSelect = (filter) => {
        dispatch(filterActive(filter))
    }
    const renderFilter = (arr) => {
        const btns = arr.map((item, i) => {
            const active = activeFilter === item.name;
            const clazz = active ? `btn ${item.className} active`: `btn ${item.className}`
            return(
                <button 
                    key={i} 
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