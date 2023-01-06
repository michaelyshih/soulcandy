# SoulCandy

[Live Site](https://soulcandy.onrender.com)

SoulCandy, a clone of the online e-commerce website SkullCandy, allows users to view and purchase products. Users could save their cart, which will only be removed on poractive logout.

---

## Technologies Used

 - JavaScript
 - React
 - Redux
 - Swiper Library
 - Ruby On Rails
 - PostgreSQL, ActionCable
 - HTML5
 - SCSS
 - AWS

SoulCandy utilizes Ruby on Rails back end and uses database using PostgreSQL. The front end is built using React.js, Redux for the global state management of the application, HTML5, and SCSS. It also stores all images and database images using AWS.

---

## Features

### User Authentication:

- Users can create an account and login/logout with their user information.
- Users can login using a Demo User account, which will provide them with access to all of the application’s features.
- Users cannot add items to cart without first logging in.
- User authentication uses Rails’ session object to store in the database a session token to authenticate users after logging in.

### Products:

 - Users can view and browse different types of products
 - Users can view said products and sort them through category
 - Users can select different colors they like based on selected color
 - Users can add selected color product to cart
 - Users can maintain the selected color through the category page

### reviews:

 - Users can leave a review
 - Users can only remove their own review
 - Users can edit only their ow review
 - Users can see their review instantaniously get updated

### Search:

 - Users can find their desired item by searching for keywords
 - when there is no items found with the keyword search, there would be nothing shown

---

## Code Snippets

1. Dry implementation of categories and search result utilizing same style and component

```javascript
// frontend/src/components/CategoryIndex/index.jsx line 10
    const dispatch = useDispatch();
    const {category, subcategory} = useParams();
    let titleCard

    switch(category){
        case "headset":
            titleCard = subcategory ? `${subcategory.toUpperCase()} HEADPHONES` : `HEADPHONES`
            break
        case "earbuds":
            if (subcategory === "wireless") titleCard = "TRUE WIRELESS"
            titleCard = subcategory ? `${subcategory.toUpperCase()} EARBUDS` : `EARBUDS`
            break
        case "accessory":
            titleCard = "ACCESSORY"
            break
        case "gaming":
            titleCard = "GAMING"
            break
        default:
            titleCard = "SHOP"
    }

```

2. Utilizing a image loader component to clean up effect of image rendering

```javascript
// frontend/src/components/CategoryIndexItem/index.jsx line 30
            <ul className="color-img-container" >
                {product.color.split(",").map(color=>
                    <li key={product.name + color}>
                        <Link to={{
                            pathname:`/products/${product.name}`,
                            state:{selectedColor:selectedColor}
                            }}
                            className="product-link">
                            <img className="color-img"
                            src={photos[parseColor(color)]}
                            onMouseOver={()=>setSelectedColor(color)}
                            alt="" />
                        </Link>

                    </li>
                )}
            </ul>

```

3. Maintaining color selection and passing a variable to another component in the history chain using useLocation.

```javascript
// frontend/src/components/CategoryIndex/index.jsx line 10
    const dispatch = useDispatch();
    const {category, subcategory} = useParams();
    let titleCard

    switch(category){
        case "headset":
            titleCard = subcategory ? `${subcategory.toUpperCase()} HEADPHONES` : `HEADPHONES`
            break
        case "earbuds":
            if (subcategory === "wireless") titleCard = "TRUE WIRELESS"
            titleCard = subcategory ? `${subcategory.toUpperCase()} EARBUDS` : `EARBUDS`
            break
        case "accessory":
            titleCard = "ACCESSORY"
            break
        case "gaming":
            titleCard = "GAMING"
            break
        default:
            titleCard = "SHOP"
    }

```

## Features for the Future

 - Better search bar redirection
 - More images and links to move around the site
 - optimizing database to include more products
