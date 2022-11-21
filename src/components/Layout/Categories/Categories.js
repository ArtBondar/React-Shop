import * as React from 'react';
import { useState } from 'react';
import "./Categories.css";

function Categories() {
    const [categoriesList, SetCategoriesList] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/category')
            .then(res => {
                SetCategoriesList(res.data);
            })
            .catch(e => {
                console.log(e);
                return null;
            })
    }, []);
    return (
        <ul className='list-group'>
            {
                categoriesList.map((element, index) => {
                    return (
                        <li key={index}>{element.name}</li>
                    )
                })
            }
        </ul>
    )
}

export default Categories;