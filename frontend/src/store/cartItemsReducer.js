import csrfFetch from "./csrf"

export const RECEIVE_ITEMS = `ITEMS/RECEIVE_ITEMS`
export const RECEIVE_ITEM = `ITEMS/RECEIVE_ITEM`
export const REMOVE_ITEM = `ITEMS/REMOVE_ITEM`

export const receiveItems = (items) =>{
    return {
        type: RECEIVE_ITEMS,
        items
    }
}
export const receiveItem = (item) =>{
    return {
        type: RECEIVE_ITEM,
        item
    }
}
export const removeItem = (itemId) =>{
    return {
        type: REMOVE_ITEM,
        itemId
    }
}

export const getItems = (state) => {
    return state.cart_items ? Object.values(state.cart_items) : []
}

export const getItem = (productName, selectedColor) => (state) => {
    if (state.cart_items){
        return Object.values(state.cart_items).find(el=>{
            return el.color === selectedColor && el.name === productName
        })
    } else {
        return null
    }

}

// export const fetchItem = (product_id) => async (dispatch) => {
//     const res = await csrfFetch(`/api/cart-items/${product_id}`)
//     if (res.ok){
//         const item = await res.json();
//         dispatch(receiveItem(item))
//     }
// }

export const fetchItems = (userId) => async (dispatch) => {
    if (!userId){
        dispatch(receiveItems({}))
    }else{
        const res = await csrfFetch(`/api/cart_items?userId=${userId}`)
        if (res.ok){
            const items = await res.json()
            dispatch(receiveItems(items))
        }
    }

}



export const createItem = (item) => async (dispatch) => {
    const res = await csrfFetch(`/api/cart_items/`, {
        method:"POST",
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(item)
    })
    if (res.ok){
        const newItem = await res.json()
        dispatch(receiveItem(newItem))
    }
}

export const updateItem = (item) => async (dispatch) => {
    const res = await csrfFetch(`/api/cart_items/${item.id}`,{
        method:"PATCH",
        headers: {"Content-Type":"application/json"},
        body:JSON.stringify(item)
    })
    if (res.ok){
        const newItem = await res.json()
        dispatch(receiveItem(newItem))
    }
}

export const deleteItem = (itemId) => async (dispatch) => {
    const res = await csrfFetch(`/api/cart_items/${itemId}`, {
        method:"DELETE"
    })
    if (res.ok){
        dispatch(removeItem(itemId))
    }
}

export default function cartItemsReducer (state={}, action){
    switch (action.type){
        case RECEIVE_ITEMS:
            return {...action.items}
        case RECEIVE_ITEM :
            return {...state, [action.item.id]: action.item }
        case REMOVE_ITEM:
            const newState = {...state}
            delete newState[action.itemId]
            return newState
        default:
            return state
    }
}
