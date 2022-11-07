import { useState } from "react"
import { Link } from "react-router-dom"
import "./CategoryIndexItem.scss"

export default function CategoryIndexitem ({product}) {

    const [selectedColor, setSelectedColor] = useState(product.color.split(",")[1])

    console.log(selectedColor)

    return (
        <section className="index-item-container">
        <h3>
            <Link to={`/products/${product.name}`} className="product-link">
                {/* <img
                    className="display-img"
                    // src = product.photos[color]
                    // src="https://soulcandy-seeds-2.s3.us-west-1.amazonaws.com/push-green-i.jpg"
                    alt="" /> */}
                <div className="display-img"></div>
            </Link>
            <ul className="color-img-container" >
                {product.color.split(",").map(color=>
                    <li key={product.name + color}>
                        <Link to={`/products/${product.name}`} className="product-link">
                            {/* <img className="color-img"
                            // src="https://soulcandy-seeds-2.s3.us-west-1.amazonaws.com/push-green-i.jpg"
                            onMouseOver={()=>setSelectedColor(color)}
                            alt="" /> */}
                            <div className="color-img"></div>
                        </Link>

                    </li>
                )}
            </ul>
        </h3>
        <h2>
            <Link to={`/products/${product.name}`} className="product-link">
                <p>{product.fullname}</p>
                <p>{"$" + product.price}</p>
            </Link>
        </h2>
        </section>

    )
}
