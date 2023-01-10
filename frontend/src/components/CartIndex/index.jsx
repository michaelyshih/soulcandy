import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";
import { getItems, deleteItem } from "../../store/cartItemsReducer";
import CartIndexItem from "../CartIndexItem";
import "./CartIndex.scss"

export default function CartIndex(){
    const dispatch = useDispatch()
    const {user} = useSelector(state=>state.session)
    const cart_items = useSelector(getItems)
    let subtotal = 0
    const something = ()=>{
        if (!cart_items && !user){
            return null
        } else {
            return (
                <tbody>
                {cart_items.map(cart_item =>{
                    subtotal += (cart_item.amount * cart_item.price);
                    return <CartIndexItem key={cart_item.id} item={cart_item}/>
                }  )}
                </tbody>
            )
        }
    }

    const handleCheckout = (e) =>{
        e.preventDefault();
        cart_items.map(cart_item=>{
            dispatch(deleteItem(cart_item.id))
            return cart_item;
        })
        alert("thank you for your purchase")
    }

    return (
        <>
        <h1 className="title-card">
            CART
        </h1>
        <div className="cart-items-container">
            <table className="cart-items-table">
                <thead className="cart-header">
                    <tr>
                        <th className="cart-header-item"><h3>Item</h3></th>
                        <th className="cart-header-price"><h3>Price</h3></th>
                        <th className="cart-header-quantity"><h3>Quantity</h3></th>
                        <th className="cart-header-total"><h3>Total</h3></th>
                    </tr>
                </thead>
                {something()}
            </table>

            <section className="checkout">
                <div className="checkout-row"><h4>Subtotal</h4><p>{subtotal.toFixed(2)}</p></div>
                <div className="checkout-row"><h4>Shipping</h4><p>0</p></div>
                <div className="checkout-row"><h4>Total</h4><p>{subtotal.toFixed(2)}</p></div>
                <div><button onClick={handleCheckout}>checkout</button></div>
            </section>
        </div>

        </>
    )
}
