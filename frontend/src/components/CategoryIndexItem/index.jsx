import { useState } from "react"
import { Link } from "react-router-dom"
import "./CategoryIndexItem.scss"
import ImageLoader from "../ImageLoader"
// using regex here rather than splitting and joining would be more efficient
import parseColor from "../../util/parseColor"
// function parseColor (color) {
//     return `${color.replace(/[ \/]/g,".").toLowerCase()}.i.jpg`
//     // return `${color.toLowerCase().split(" ").join(".").split("/").join(".")}.i.jpg`
// }

export default function CategoryIndexitem ({product}) {

    // setting color as first image by default
    const [selectedColor, setSelectedColor] = useState(product.color.split(",")[0])

    //looking through all photos in product to find icons
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
                 src={photos[`${parseColor(selectedColor)}.i.jpg`]}
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
                                    src={photos[`${parseColor(color)}.i.jpg`]}
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
