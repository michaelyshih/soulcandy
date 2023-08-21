import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { fetchProductsBySearch, getProducts } from '../../store/productsReducer';
import CategoryIndexitem from '../CategoryIndexItem';
import "./CategorySearch.scss"

export default function CategorySearch(){
    const {query} = useParams();
    const dispatch = useDispatch();
    const products = useSelector(getProducts);

    let titleCard = `SEARCH RESULTS FOR '${query}'`

    useEffect(()=>{
        dispatch(fetchProductsBySearch(query))
    },[query])

    const nonFound = () => {
        if  (Object.keys(products).length === 0){
            return (
                <h2 className='title-card'>No Results Found</h2>
            )
        }
    }

    return (
        <>
        <h1 className='title-card'>
            {titleCard}
        </h1>
        <ul className='category-items-container'>
            {nonFound()}
            {products?.map(product=>
            <li className='category-items' key={product.id}>
                <CategoryIndexitem product={product}/>
            </li>)}
        </ul>
        </>
    )
}
