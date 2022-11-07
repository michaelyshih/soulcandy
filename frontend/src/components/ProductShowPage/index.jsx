// import { useState } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import {useLocation} from "react-router-dom"
import { createItem } from "../../store/cartItemsReducer";
import { fetchProduct, getProduct } from "../../store/productsReducer";
import { getItem, updateItem} from "../../store/cartItemsReducer";
import "./ProductShowPage.scss"

export default function ProductShowPage(){
    const dispatch = useDispatch();
    const {productName} = useParams();
    const product = useSelector(getProduct(productName))
    const {user} = useSelector(state=>state.session)
    const cartItem = useSelector(getItem(productName))
    // const location = useLocation();
    // console.log(location)
    // const {from} = location.state ? location.state : {}
    // console.log(from)
    // let color = from
    const colorArray = [];
    const [selectedColor, setSelectedColor] = useState()

    // if (!color){
    //     color = selectedColor
    // }

    // const [selected, setSelected] = useState()

    useEffect(()=>{
        dispatch(fetchProduct(productName))
    },[productName])

    if (!product || !product.photos){ return null}
        let colorKeys = {}
        product.color.split(",").map(color =>
            [1,2,3,4].map( i =>{
                const colorKey = `${color.toLowerCase().split(" ").join(".").split("/").join(".")}.${i}.jpg`
                if (!colorKeys[color]){
                    colorKeys[color] = [colorKey]
                } else {
                    colorKeys[color] = colorKeys[color].concat([colorKey]);
                }
                if (!colorArray.includes(color)) colorArray.push(color)
        })
    );

    let details = {}
    product.details.split("\n      ").map((detail,i)=>{
        switch(i){
            case 0:
                details.tagline = detail;
                break
            case 1:
                details.title = detail;
                break;
            case 2:
                details.price = detail;
                break;
            case 3:
                details.split = detail;
                break;
        }
    })

    const handleCart= (e)=>{
        e.preventDefault();
        if (user && !cartItem){
            const newCartItem = {
                product_id: product.id,
                user_id: user.id,
                name: product.name,
                price: product.price,
                color: selectedColor,
                img_url: product.photos[colorKeys[selectedColor][0]],
                amount:1,
                full_name: product.full_name
            }
            dispatch(createItem(newCartItem))
        } else if (cartItem){
            const newCartItem = {
                ...cartItem,
                amount: cartItem.amount + 1
            }
            dispatch(updateItem(newCartItem))
        }
        else {
            alert("Need to Sign In first")
        }

    }

    if (!selectedColor) setSelectedColor(colorArray[0]) ;

    if(!selectedColor) return null

    return (
            <ul className="show-bgi-container">
                <div className="show-info-container">
                    <div className="show-info">
                        <h1 className="info-tagline">{details.tagline}</h1>
                        <p className="info-title">{details.title}</p>
                        <p className="info-price">{details.price}</p>
                        <p className="info-split">{details.split}</p>
                        <div className= "info-reviews">
                            <i className="fa-regular fa-star"></i>
                            <i className="fa-regular fa-star"></i>
                            <i className="fa-regular fa-star"></i>
                            <i className="fa-regular fa-star"></i>
                            <i className="fa-regular fa-star"></i>
                            <p>164 reviews</p>
                        </div>
                        <p>
                            {colorArray.map((color,i)=>{
                                return <button key={`${color + i} button`} onClick={()=>{setSelectedColor(color)}} className="color-selector">{color}</button>
                            })}
                        </p>

                        <button onClick={handleCart}>Add item to cart</button>
                    </div>
                </div>

                {/* {product.color.split(",").map(()=>{
                    return <li className="show-bgi"><img src={product.imgUrls[0]} alt="" /></li>
                })} */}

                <li className="show-bgi">
                    {/* <img
                    // src={`${product.photos[colorKeys[selectedColor][0]]}`}
                        // }
                    alt="" /> */}
                    <div></div>
                </li>
            </ul>
    )
}
