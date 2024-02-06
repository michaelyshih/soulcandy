import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams,useLocation, useHistory } from "react-router";
import { fetchProduct, getProduct } from "../../store/productsReducer";
import { getItem, updateItem, createItem} from "../../store/cartItemsReducer";
import  Reviews from '../Reviews';
import "./ProductShowPage.scss"
import { fetchReviews, getReviews } from "../../store/reviewsReducer";
import ReactStars from "react-rating-stars-component"
import ProductShowSwiper from "../ProductShowSwiper";
import parseColor from "../../util/parseColor";



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

    // fetching product
    useEffect(()=>{
        dispatch(fetchProduct(productName))
    },[productName])

    // refetch reviews when a new review is added
    useEffect(()=>{
        if(product && Object.keys(reviews).length !== 0 && (Object.keys(reviews).length !== product.numReviews)){
            dispatch(fetchProduct(productName))
        };
    },[reviews])

    // if there is a product, refetch reviews
    useEffect(()=>{
        if (product){
            dispatch(fetchReviews(product.id))
        }
    },[product])


    // if component mount without product, photos or detail, return early
    if (!product || !product.photos || !product.details ) return null

    let colorKeys = {}

    // differentiate the product colors for product
    product.color.split(",").map(color =>{
        const colorTag = parseColor(color)
        // construct color into array
        if (!colorArray.includes(color)) colorArray.push(color);
        // filter photo keys for photos without "i.jpg" of the same color tag
        Object.keys(product.photos).filter(key=>!key.includes("i.jpg") && key.includes(colorTag)).map( key =>{
            // if color key does not exist, create a new array, else append to existing array
            if (!colorKeys[color]){
                colorKeys[color] = [key]
            } else {
                colorKeys[color] = colorKeys[color].concat([key]);
            }
            return key ;
        })
        // concat i.jpg to the end of array for cart tag
        colorKeys[color] = colorKeys[color].concat([`${colorTag}.i.jpg`])
        return color;
    });

    let details = {}
    //  inserting breaks after every detail object
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

    // handling cart and users
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
            // alert("item added to cart");
        } else if (cartItem){
            const newCartItem = {
                ...cartItem,
                amount: cartItem.amount + 1
            }
            dispatch(updateItem(newCartItem))
            // alert("item added to cart");
        }
        else {
            history.push(`/login`)
        }
    }

    // default color set to parsed selectedColor, if none passed in use first
    let parsedColor
    if (Object.keys(selectedColor).length === 0){
        setSelectedColor(colorArray[0])
    } else {
        parsedColor = parseColor(selectedColor)
    }

    if (Object.keys(selectedColor).length === 0 || !parsedColor) return null;

    // default star
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
                                // map the color array to color selection buttons
                                    key={`${color + i} button`}
                                    onClick={()=>{setSelectedColor(color)}}
                                    className= {`btn ${selectedColor === color ? 'btn-success' : null} color-selector`}
                                    >
                                        <span id="color-circle"/>
                                        {color}
                                </button>
                                )
                            })}
                        </div>

                        <button className="main-button" onClick={handleCart}>Add to cart</button>
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
