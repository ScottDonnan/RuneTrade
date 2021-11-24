import {useState} from 'react'

function SearchBar({setSearchBarValue}) {

    return (
        <input type="text" id="searchBar" name="searchBar" onChange={(e) => setSearchBarValue(e.target.value)} />
    )
}

export default SearchBar