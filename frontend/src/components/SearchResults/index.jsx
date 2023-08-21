import { Link } from 'react-router-dom'
import './SearchResults.scss'

export default function SearchResults({ searchResults, clearSubmit }) {

    // console.log(searchResults)

  return (
    <section className="search-results">
      {searchResults?.map((product, id) => {
        // return <a href='' className="search-result" key={id}>{productName}</a>
        return (
          <Link
            to={`/products/${product.name}`}
            key={id}
            className="search-result"
            onClick={(e) => { clearSubmit() }}
          >{product.fullname}</Link>
        )
      })}
    </section>
  )
}
