import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { fetchProducts, getProducts } from '../../store/productsReducer';
import CategoryIndexitem from '../CategoryIndexItem';
import "./CategoryIndex.scss"

export default function CategoryIndex(){
    const dispatch = useDispatch();
    const {category, subcategory} = useParams();
    let titleCard

    switch(true){
        case category === "headset":
            titleCard = subcategory ? `${subcategory.toUpperCase()} HEADPHONES` : `HEADPHONES`
            break
        case category === "earbuds":
            if (subcategory === "wireless") titleCard = "TRUE WIRELESS"
            titleCard = subcategory ? `${subcategory.toUpperCase()} EARBUDS` : `EARBUDS`
            break
        case category === "accessory":
            titleCard = "ACCESSORY"
            break
        case category === "gaming":
            titleCard = "GAMING"
            break
        default:
            titleCard = "SHOP"
    }

    const products = useSelector(getProducts);

    useEffect(()=>{
        dispatch(fetchProducts(category, subcategory))
    },[dispatch,category,subcategory])

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
