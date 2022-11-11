import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { fetchProductsBySearch, getProducts } from '../../store/productsReducer';
import CategoryIndexitem from '../CategoryIndexItem';
import "./CategorySearch.scss"

export default function CategorySearch(){
    const dispatch = useDispatch();
    const {category, subcategory} = useParams();
    const {searchValue} = useParams();
    let titleCard = "SHOP"

    const products = useSelector(getProducts);

    return (
        <>
        <h1 className='title-card'>
            {titleCard}
        </h1>
        <ul className='category-items-container'>
            {products?.map(product=>
            <li className='category-items' key={product.id}>
                <CategoryIndexitem product={product}/>
            </li>)}
        </ul>
        </>
    )
}
