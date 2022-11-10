import csrfFetch from "./csrf"

export const RECEIVE_REVIEWS = `REVIEWS/RECEIVE_REVIEWS`
export const RECEIVE_REVIEW = `REVIEWS/RECEIVE_REVIEW`
export const REMOVE_REVIEW = `REVIEWS/REMOVE_REVIEW`

export const receiveReviews = (reviews) =>{
    return {
        type: RECEIVE_REVIEWS,
        reviews
    }
}
export const receiveReview = (review) =>{
    return {
        type: RECEIVE_REVIEW,
        review
    }
}
export const removeReview = (reviewId) =>{
    return {
        type: REMOVE_REVIEW,
        reviewId
    }
}

export const getReviews = (state) => {
    return state.reviews ? Object.values(state.reviews) : []
}

export const getReview = (reviewId) => (state) => {
    return state.reviews ? state.reviews[reviewId]  : null
}

export const fetchReview = (reviewId) => async (dispatch) => {
    const res = await csrfFetch(`/api/reviews/${reviewId}`)
    if (res.ok){
        const review = await res.json();
        dispatch(receiveReview(review))
    }
}

export const fetchReviews = (productId) => async (dispatch) => {
        const res = await csrfFetch(`/api/reviews?productId=${productId}`)
        if (res.ok){
            const reviews = await res.json()
            dispatch(receiveReviews(reviews))
        }
    }

export const createReview = (review) => async (dispatch) => {
    const res = await csrfFetch(`/api/reviews/`, {
        method:"POST",
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(review)
    })
    if (res.ok){
        const newReview = await res.json()
        dispatch(receiveReview(newReview))
    }
}

export const updateReview = (review) => async (dispatch) => {
    const res = await csrfFetch(`/api/reviews/${review.id}`,{
        method:"PATCH",
        headers: {"Content-Type":"application/json"},
        body:JSON.stringify(review)
    })
    if (res.ok){
        const newReview = await res.json()
        dispatch(receiveReview(newReview))
    }
}

export const deleteReview = (reviewId) => async (dispatch) => {
    debugger
    const res = await csrfFetch(`/api/reviews/${reviewId}`, {
        method:"DELETE"
    })
    if (res.ok){
        dispatch(removeReview(reviewId))
    }
}

export default function reviewsReducer (state={}, action){
    switch (action.type){
        case RECEIVE_REVIEWS:
            return {...action.reviews}
        case RECEIVE_REVIEW :
            return {...state, [action.review.id]: action.review }
        case REMOVE_REVIEW:
            const newState = {...state}
            delete newState[action.reviewId]
            return newState
        default:
            return state
    }
}
