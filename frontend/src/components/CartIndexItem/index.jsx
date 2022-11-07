// import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

export default function CartIndexItem({item}){
    // const dispatch = useDispatch();
    return (
        <section className="cart-index-item-continer">
            <picture className="cart-image-container">
                <Link to={`/products/${item.name}`}>
                    {/* <img src="" alt="" /> */}
                    <div className="cart-image"></div>
                </Link>
            </picture>
            <h2>
               {item.name}
            </h2>

        </section>
    )
}
