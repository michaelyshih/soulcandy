import { useDispatch } from "react-redux";

export default function CartIndexItem({item}){
    const dispatch = useDispatch();

    return (
        <section className="cart-index-item-continer">
            <picture className="cart-image-container">
                <Link to={`/products/${item.name}`}>
                    {/* <img src="" alt="" /> */}
                    <div className="cart-image"></div>
                </Link>
            </picture>
            
        </section>
    )
}
