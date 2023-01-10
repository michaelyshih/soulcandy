import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./CartIndexItem.scss"
import { deleteItem, updateItem } from "../../store/cartItemsReducer";
import ImageLoader from "../ImageLoader";

export default function CartIndexItem({item}){
    const dispatch = useDispatch();
    const [newAmount, setNewAmount] = useState(item.amount)

    const handleAmount = (e) =>{
        e.preventDefault();
        if (e.target.value === undefined){
            setNewAmount("")
        }
        setNewAmount(e.target.value)
    }

    useEffect(()=>{
        if(item.amount !== newAmount && newAmount !== '0' && newAmount !== undefined){
            const newCartItem = {
                ...item,
                amount: newAmount
            }
            dispatch(updateItem(newCartItem))
        }else if (newAmount === "0"){
            dispatch(deleteItem(item.id))
        }
    },[newAmount])

    const handleRemove = (e) =>{
        e.preventDefault();
        dispatch(deleteItem(item.id))
    }


    return (
        <tr className="cart-index-item-container">
            <td className="cart-item-info-block">
                    <picture className="cart-image-container">
                        <Link to={`/products/${item.name}`}>
                            <ImageLoader
                            className="cart-image"
                            src={item.imgUrl}
                            alt=""
                            />
                        </Link>
                    </picture>
                <div className="cart-item-info">
                    <h4 className="cart-item-title">{item.fullname}</h4>
                    <p>{item.color}</p>
                    <div className="cart-item-edit">
                        {/* <a href="#">Change</a> */}
                        <a href="#" onClick={handleRemove}>Remove</a>
                    </div>

                </div>
            </td>
            <td>
                    <p>{`$${item.price}`}</p>
            </td>
            <td>
                <input type="number" value={newAmount} onChange={handleAmount}/>
            </td>
            <td>
                {`$${(item.price * newAmount).toFixed(2)}`}
            </td>
        </tr>
    )
}
