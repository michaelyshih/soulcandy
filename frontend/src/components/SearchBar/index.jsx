import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export default function SearchBar({}) {

    const [searchValue, setSearchValue] = useState()
    const history = useHistory()

    const handleSubmit = (e) => {
        e.preventDefault();
        if (searchValue === "Search for Item"){
        history.push("/search/NO INPUT")
        } else {
        setSearchValue("")
        history.push(`/search/${searchValue}`)
        }
    }

    const handleFocus = (e) =>{
        e.preventDefault();
        if (searchValue === "Search for Item") {
        setSearchValue("")
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onFocus={handleFocus}
                // onBlur={handleLeave}
                placeholder={'Search for Item'}
            />

            <button type="submit" className="search-button">
                <i className="fa-solid fa-magnifying-glass"></i>
            </button>
        </form>
    )
}
