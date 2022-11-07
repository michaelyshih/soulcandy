import csrfFetch from "./csrf"

export const RECEIVE_PRODUCTS = "products/receiveProducts"
export const RECEIVE_PRODUCT = "products/receiveProduct"

const receiveProducts = (products) =>{
    return {
        type: RECEIVE_PRODUCTS,
        products
    }
}

const receiveProduct = (product) =>{
    return {
        type: RECEIVE_PRODUCT,
        product
    }
}

export const getProducts = (state) => {
    return state.products ? Object.values(state.products) : []
}

export const getProduct = (name) => (state) => {
    return state.products ? state.products[name] : {}

}


export const fetchProducts = (category,subcategory) => async (dispatch) => {
    const res = await csrfFetch(`/api/products?category=${category}&subcategory=${subcategory}`)
    if (res.ok){
        const newProducts = await res.json();
        dispatch(receiveProducts(newProducts))
    } // else redirect
}

export const fetchProduct = (productName) => async (dispatch) => {
    const res = await csrfFetch(`/api/products/${productName}`)
    if (res.ok){
        const product = await res.json();
        dispatch(receiveProduct(product))
    }
}

export default function productsReducer (state={}, action){
    switch (action.type){
        case RECEIVE_PRODUCTS:
            return {...action.products}
        case RECEIVE_PRODUCT:
            return {...state, [action.product.name]:action.product}
        default:
            return state
    }
}
