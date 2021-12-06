
function SearchBar({setSearchBarValue}) {

    return (
        <div className="search-bar">
            <label for="searchBar" >Search:</label>
            <input type="text" id="searchBar" name="searchBar" onChange={(e) => setSearchBarValue(e.target.value)} />
        </div>
    )
}

export default SearchBar