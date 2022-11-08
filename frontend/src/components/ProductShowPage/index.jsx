import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams,useLocation } from "react-router";
import { createItem } from "../../store/cartItemsReducer";
import { fetchProduct, getProduct } from "../../store/productsReducer";
import { getItem, updateItem} from "../../store/cartItemsReducer";
import "./ProductShowPage.scss"

export default function ProductShowPage(){
    const dispatch = useDispatch();
    const {productName} = useParams();
    const product = useSelector(getProduct(productName))
    const {user} = useSelector(state=>state.session)

    const location = useLocation();
    const preSelectedColor = location.state ? location.state.selectedColor : {}
    const colorArray = [];
    const [selectedColor, setSelectedColor] = useState(preSelectedColor)
    const cartItem = useSelector(getItem(productName,selectedColor))


    useEffect(()=>{
        dispatch(fetchProduct(productName))
    },[productName])



    if (!product || !product.photos || !product.details ) return null

    let colorKeys = {}
    product.color.split(",").map(color =>{
        if (!colorArray.includes(color)) colorArray.push(color);
        [1,2,3,4].map( i =>{
            const colorKey = `${color.toLowerCase().split(" ").join(".").split("/").join(".")}.${i}.jpg`
            if (!colorKeys[color]){
                colorKeys[color] = [colorKey]
            } else {
                colorKeys[color] = colorKeys[color].concat([colorKey]);
            }
        })
        colorKeys[color] = colorKeys[color].concat([`${color.toLowerCase().split(" ").join(".").split("/").join(".")}.i.jpg`])
    });

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
                img_url: product.photos[colorKeys[selectedColor][colorKeys[selectedColor].length-1]],
                amount:1,
                fullname: product.fullname
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
    if (Object.keys(selectedColor).length === 0) setSelectedColor(colorArray[0])
    if (Object.keys(selectedColor).length === 0)return null;

    // debugger

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

                <li className="show-bgi">
                    <img
                    src={`${product.photos[colorKeys[selectedColor][0]]}`}
                    alt="" />
                </li>
            </ul>
    )
}
