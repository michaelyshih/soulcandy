import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { createReview, updateReview } from "../../store/reviewsReducer";
import ReactStars from "react-rating-stars-component";
import "./Review.scss";
import Reviewitem from "../ReviewItem";

export default function Review({reviews , productId}) {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        name: "",
        body: "",
        rating: 5,
    });
    const [edittingReview, setEdittingReview] = useState();
    const user = useSelector(state=>state.session.user)

    const resetFormData = () => {
        setFormData({
            name: "",
            body: "",
            rating: 5,
        })
        setEdittingReview("")
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        if (user && !edittingReview){
            const newReview = {
                name: formData.name,
                body: formData.body,
                rating: formData.rating,
                product_id: productId,
                user_id: user.id
            }
            dispatch(createReview(newReview))
            resetFormData()

        } else if (user && (user.id === edittingReview.userId)) {
            const newReview = {
                ...edittingReview,
                name: formData.name,
                body: formData.body,
                rating: formData.rating,
            }
            dispatch(updateReview(newReview))
            resetFormData()
        } else {
            alert("Need to Sign In first")
        }

    }

    const ratingsStar = {
        count: 5,
        color: "",
        activeColor: "white",
        emptyIcon: <i className="far fa-star" />,
        halfIcon: <i className="fa fa-star-half-alt" />,
        filledIcon: <i className="fa fa-star" />,
      };

    const hasReview = () =>{
        if (!reviews) return null
        return (
            <ul className="review-index">
                <h1 className="title-card">REVIEWS</h1>
                {reviews.map(review=>{
                    return (
                        <li className="review-index-item-container" key={review.id}>

                            <Reviewitem
                            reviewId={review.id}
                            formData={formData}
                            setFormData={setFormData}
                            ratingsStar={ratingsStar}
                            setEdittingReview={setEdittingReview}
                            user={user}
                            />
                        </li>
                        )
                })}
            </ul>
        )}

    return (
        <section className="reviews-container">
        {hasReview()}
        <h1 className="title-card">LEAVE A REVIEW</h1>
        <form id="review-form" className="create-review-form" onSubmit={handleSubmit}>
            <ul >
                {/* {errors.map(error=> <li key={error}>{error}</li>)} */}
            </ul>
            <label htmlFor="name">
                <h3>Title:</h3>
                <p>required</p>
            </label>
            <input type="text" id="name" size="70" value={formData.name} onChange={(e)=>setFormData({...formData, name: e.target.value})} required/>
            <ReactStars {...ratingsStar} size={40} onChange={ (e) => setFormData({...formData, rating: e.target.value})}/>
            <label htmlFor="body">
                <h3>Review:</h3>
                <p>required</p>
            </label>
            <textarea name="body" id="body" cols="70" rows="10" value={formData.body} onChange={(e)=>setFormData({...formData, body: e.target.value})} required></textarea>
            <button className='main-button' type="Submit">Submit</button>
        </form>
        </section>
    )
}
