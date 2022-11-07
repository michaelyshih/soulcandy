import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getItems } from "../../store/cartItemsReducer";
import CartIndexItem from "../CartIndexItem";

export default function CartIndex(){
    const dispatch = useDispatch()
    const {user} = useSelector(state=>state.session)
    const cart_items = useSelector(getItems)
    if (!cart_items || !user) return null

    return (
        <ul>
            {/* map each item to be used in cartindexItem */}
            {cart_items.map(cart_item =>
                <CartIndexItem key={cart_item.id} item={cart_item}/>
            )}
        </ul>
    )
}
