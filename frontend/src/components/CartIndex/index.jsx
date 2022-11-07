import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getItems } from "../../store/cartItemsReducer";
import CartIndexItem from "../CartIndexItem";

export default function CartIndex(){
    const dispatch = useDispatch()
    const {user_id} = useParams()

    const {cart_items} = useSelector(getItems)

    return (
        <>
        <ul>
            {/* map each item to be used in cartindexItem */}
            {cart_items.map(cartItem =>{
                <CartIndexItem item={cartItem}/>
            })}
        </ul>
        </>
    )
}
