import { useState } from "react"
import { Link } from "react-router-dom"
import "./CategoryIndexItem.scss"
import ImageLoader from "../ImageLoader"

export default function CategoryIndexitem ({product}) {

    const [selectedColor, setSelectedColor] = useState(product.color.split(",")[0])

    const photos = Object.fromEntries(Object.entries(product.photos).filter(([key])=>key.includes("i.jpg")))


    return (
        <section className="index-item-container">
        <h3>
            <Link to={{
                pathname:`/products/${product.name}`,
                state:{selectedColor:selectedColor}
                }}
                className="product-link" >
                <ImageLoader
                 className="display-img"
                 src={photos[`${selectedColor.toLowerCase().split(" ").join(".").split("/").join(".")}.i.jpg`]}
                 alt=""
                />
            </Link>
            <ul className="color-img-container" >
                {product.color.split(",").map(color=>
                    <li key={product.name + color}>
                        <Link to={{
                            pathname:`/products/${product.name}`,
                            state:{selectedColor:selectedColor}
                            }}
                            className="product-link">
                            <img className="color-img"
                            src={photos[`${color.toLowerCase().split(" ").join(".").split("/").join(".")}.i.jpg`]}
                            onMouseOver={()=>setSelectedColor(color)}
                            alt="" />
                        </Link>

                    </li>
                )}
            </ul>
        </h3>
        <h2>
            <Link to={{
                pathname:`/products/${product.name}`,
                state:{selectedColor:selectedColor}
                }}
                className="product-link">
                <p>{product.fullname}</p>
                <p>{"$" + product.price}</p>
            </Link>
        </h2>
        </section>

    )
}
