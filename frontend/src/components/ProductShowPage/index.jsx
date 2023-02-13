import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams,useLocation, Redirect, useHistory } from "react-router";
import { createItem } from "../../store/cartItemsReducer";
import { fetchProduct, getProduct } from "../../store/productsReducer";
import { getItem, updateItem} from "../../store/cartItemsReducer";
import  Reviews from '../Reviews';
import "./ProductShowPage.scss"
import { fetchReviews, getReviews } from "../../store/reviewsReducer";
import ReactStars from "react-rating-stars-component"
import ProductShowSwiper from "../ProductShowSwiper";



export default function ProductShowPage(){
    const dispatch = useDispatch();
    const history = useHistory();
    const {productName} = useParams();
    const product = useSelector(getProduct(productName))
    const {user} = useSelector(state=>state.session)
    const reviews = useSelector(getReviews);

    const location = useLocation();

    const preSelectedColor = location.state ? location.state.selectedColor : {}
    const colorArray = [];
    const [selectedColor, setSelectedColor] = useState(preSelectedColor)
    const cartItem = useSelector(getItem(productName,selectedColor))


    useEffect(()=>{
        dispatch(fetchProduct(productName))
    },[productName])

    useEffect(()=>{
        if(product && Object.keys(reviews).length !== 0 && (Object.keys(reviews).length !== product.numReviews)){
            dispatch(fetchProduct(productName))
        };
    },[reviews])

    useEffect(()=>{
        if (product){
            dispatch(fetchReviews(product.id))
        }
    },[product])


    if (!product || !product.photos || !product.details ) return null


    let colorKeys = {}
    const parseColor = (color) =>{
        return color.toLowerCase().split(" ").join(".").split("/").join(".")
    }

    product.color.split(",").map(color =>{
        const colorTag = parseColor(color)
        if (!colorArray.includes(color)) colorArray.push(color);
        Object.keys(product.photos).filter(key=>!key.includes("i.jpg") && key.includes(colorTag)).map( key =>{
            if (!colorKeys[color]){
                colorKeys[color] = [key]
            } else {
                colorKeys[color] = colorKeys[color].concat([key]);
            }
            return key ;
        })
        colorKeys[color] = colorKeys[color].concat([`${colorTag}.i.jpg`])
        return color;
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
            default:

        }
        return detail
    })

    const handleCart= (e)=>{
        const currColor = colorKeys[selectedColor]
        e.preventDefault();
        if (user && !cartItem){
            const newCartItem = {
                product_id: product.id,
                user_id: user.id,
                name: product.name,
                price: product.price,
                color: selectedColor,
                img_url: product.photos[currColor[currColor.length-1]],
                amount:1,
                fullname: product.fullname
            }
            dispatch(createItem(newCartItem))
            alert("item added to cart");
        } else if (cartItem){
            const newCartItem = {
                ...cartItem,
                amount: cartItem.amount + 1
            }
            dispatch(updateItem(newCartItem))
            alert("item added to cart");
        }
        else {
            history.push(`/login`)
        }
    }

    let parsedColor
    if (Object.keys(selectedColor).length === 0){
        setSelectedColor(colorArray[0])
    } else {
        parsedColor = parseColor(selectedColor)
    }

    if (Object.keys(selectedColor).length === 0 || !parsedColor) return null;

    const ratingsStar = {
        size: 10,
        count: 5,
        color: "",
        value: product.avgReviews ? product.avgReviews : 5,
        activeColor: "white",
        isHalf: true,
        emptyIcon: <i className="far fa-star" />,
        halfIcon: <i className="fa fa-star-half-alt" />,
        filledIcon: <i className="fa fa-star" />,
        edit:false
      };

    return (
            <ul className="show-bgi-container">
                <div className="show-info-container">
                    <div className="show-info">
                        <h1 className="info-tagline">{details.tagline}</h1>
                        <p className="info-title">{details.title}</p>
                        <p className="info-price">{details.price}</p>
                        <p className="info-split">{details.split}</p>
                        <div className= "info-reviews">
                        <ReactStars {...ratingsStar} />
                            <p>{product.numReviews} reviews</p>
                        </div>
                        <div className="buttons-container">
                            { colorArray.length > 1 &&
                            colorArray.map((color,i)=>{
                                return (
                                <button
                                    key={`${color + i} button`}
                                    onClick={()=>{setSelectedColor(color)}}
                                    className= {`btn ${selectedColor === color ? 'btn-success' : null} color-selector`}
                                    >
                                        <span id="color-circle">
                                            {console.log(parsedColor)}
                                        </span>
                                        {color}
                                </button>
                                )
                            })}
                        </div>

                        <button className="add-to-cart" onClick={handleCart}>Add item to cart</button>
                    </div>
                </div>


                <li className="show-bgi">
                    <ProductShowSwiper
                        parsedColor={parsedColor}
                        images={product.photos}
                        colorKeys={colorKeys[selectedColor].slice(0,colorKeys[selectedColor].length-1)}/>
                </li>

                <Reviews reviews={reviews} productId={product.id}/>
            </ul>
    )
}
