"use client";
import { useState, useEffect } from 'react';
import "./SearchBar.scss";
const SearchBar = ({handleChangeCategory, handleSearch}) => {
    
    const [categories, setCategories] = useState([]);
    
    useEffect(() => {
        const getCategories = async ()  => {
            const res = await fetch(`http://localhost:8080/category/`);
            const data = await res.json();
            return data;
          };
        getCategories().then((categories) => {
            setCategories(categories);
        });

    }, []);

    return (
        <div className="search-bar">
            <input type="text" placeholder="Search" onChange={handleSearch}/>
            <select onChange={handleChangeCategory}>
                <option value="all">All</option>
                {categories && categories.map((category) => (
                
                    <option key={category.id} value={category.id}>{category.categoryName}</option>
                ))}
            </select>
        </div>
    )
}

export default SearchBar;
