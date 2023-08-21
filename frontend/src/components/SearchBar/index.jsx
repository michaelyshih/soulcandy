import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import './SearchBar.scss'
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, fetchProductsBySearch, getProducts } from "../../store/productsReducer";
import SearchResults from "../SearchResults";

export default function SearchBar({}) {

    const [searchValue, setSearchValue] = useState("")
    const [limitProducts, setLimitProducts] =useState([])
    const history = useHistory()
    const dispatch = useDispatch()
    const products = useSelector(getProducts)
    const SearchResult = "Search Result"

    useEffect(() => {
      if (!products) return
      setLimitProducts(products.slice(0,5))
     },[products])

    const handleSubmit = (e) => {
        e.preventDefault();
        setSearchValue("")
        setLimitProducts([])
        history.push(`/search/${searchValue}`)

    }

    const handleChange = (value) => {
        setSearchValue(value)
        dispatch(fetchProductsBySearch(value))
     }

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
          <SearchResults searchResults={limitProducts} />
        </div>
        <button type="submit" className="search-button">
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </form>
    )
}
