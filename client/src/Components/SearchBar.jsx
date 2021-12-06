
function SearchBar({setSearchBarValue}) {

    return (
        <div class="row">
            <label for="searchBar" class="col">Search:</label>
            <input class="col" type="text" id="searchBar" name="searchBar" onChange={(e) => setSearchBarValue(e.target.value)} />
        </div>
    )
}

export default SearchBar