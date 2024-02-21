import ReactStars from "react-rating-stars-component";
import { useDispatch, useSelector } from "react-redux";
import { deleteReview, getReview } from "../../store/reviewsReducer";
import "./ReviewItem.scss"

export default function Reviewitem ({user, formData, setFormData, setEdittingReview, reviewId, ratingsStar}){

    const dispatch = useDispatch();
    const editReview = useSelector(getReview(reviewId))

    const handleEdit = () => {
        setFormData({
            ...formData,
            body: editReview.body,
            name: editReview.name,
            rating: editReview.rating
        });
        setEdittingReview(editReview);
    }

    const handleDelete = () => {
        dispatch(deleteReview(editReview.id))
    }

    const showEdit = () =>{
        if (user && user.id === editReview.userId){
            return (
                <section className="review-item-edit">
                    <a href="#review-form" onClick={()=>handleEdit()}><i className="fa-regular fa-pen-to-square"></i></a>
                    <a href="#review-index-item-container" onClick={handleDelete}><i className="fa-solid fa-trash-can"></i></a>
                </section>
            )
        } else {
            return null
        }
    }

    return (
        <>
        <ReactStars {...ratingsStar} value={editReview.rating} edit={false} size={10}/>
            <h4 className="review-item-header">
                <p>{editReview.name}</p>
                {showEdit()}
            </h4>
        <p>{editReview.body}</p>
        </>
    )
}
