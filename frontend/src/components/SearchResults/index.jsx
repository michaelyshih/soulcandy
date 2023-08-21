import './SearchResults.scss'

export default function SearchResults({searchResults}) {

        console.log(searchResults)

        return (
          <section className="search-results">
            {searchResults?.map((productName, id) => {
                return <li key={id}>{productName}</li>
              })}
          </section>
        )

}
