import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import './SearchBar.scss'
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, fetchProductsBySearch, getProduct, getProducts } from "../../store/productsReducer";
import SearchResults from "../SearchResults";

export default function SearchBar({}) {

    const [searchValue, setSearchValue] = useState()
    const history = useHistory()
    const dispatch = useDispatch()

    const SearchResult = "Search Result"

    const handleSubmit = (e) => {
        e.preventDefault();
        setSearchValue("")
        history.push(`/search/${searchValue}`)
    }

    const handleChange = (value) => {
        setSearchValue(value)
        dispatch(fetchProductsBySearch(value))
     }

    const products = useSelector(getProducts)

    const limitedProducts = products ? products.slice(0,5).map((product) => {
        return product.fullname
     }) : []

    console.log(limitedProducts)

    // const handleFocus = (e) =>{
        // if (searchValue === "Search for Item") {
            // setSearchValue("")
        // }
    // }

    return (
      <form className="search-bar-container" onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <input
            type="text"
            value={searchValue}
            onChange={(e) => handleChange(e.target.value)}
            // onFocus={handleFocus}
            // onBlur={handleLeave}
            placeholder={'Search for Item'}
          />
          <SearchResults searchResults={limitedProducts}/>
        </div>
        <button type="submit" className="search-button">
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </form>
    )
}
