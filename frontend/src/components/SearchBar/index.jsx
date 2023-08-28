import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import './SearchBar.scss'
import { useDispatch, useSelector } from "react-redux";
// import { fetchProducts, fetchProductsBySearch, getProducts } from "../../store/productsReducer";
import { fetchResults, getResults, receiveResults } from "../../store/searchResultsReducer";
import SearchResults from "../SearchResults"
import { useDebounce } from "../../util/hooks";

export default function SearchBar({}) {

    const [searchValue, setSearchValue] = useState("")
    const [limitProducts, setLimitProducts] =useState([])
    const history = useHistory()
    const dispatch = useDispatch()
    const debouncedSearch = useDebounce(searchValue,500)
    // const products = useSelector(getProducts)
    const searchResults = useSelector(getResults)

    // preveious attempt at using same reducer for product and search
    // useEffect(() => {
    //   if (!products) return
    //   setLimitProducts(products.slice(0,5))
    //  },[products])

    useEffect(() => {
      if (debouncedSearch) dispatch(fetchResults(debouncedSearch))
     },[debouncedSearch])

     useEffect(() => {
      if (searchResults) setLimitProducts(searchResults.slice(0,5))
      },[searchResults])


    // clean up on submit
    const clearSubmit = () => {
      setSearchValue("")
      setLimitProducts([])
      dispatch(receiveResults({}))
     }

    const handleSubmit = (e) => {
        e.preventDefault();
        clearSubmit()
        history.push(`/search/${searchValue}`)
    }

    // const handleChange = (value) => {
    //     setSearchValue(value)
    //     // dispatch(fetchProductsBySearch(value))
    //     // dispatch(fetchResults(value))
    //  }

    const handleLeave = (e) => {
      clearSubmit()
     }

    return (
      <form className="search-bar-container" onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            // onFocus={handleFocus}
            onBlur={handleLeave}
            placeholder={'Search for Item'}
          />
          <SearchResults searchResults={limitProducts} clearSubmit={clearSubmit} />
        </div>
        <button type="submit" className="search-button">
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </form>
    )
}
