import {useState} from 'react'
import Card from "./Card"
import SearchBar from "./SearchBar"
import FilterFields from "./FilterFields"

function CardList({fullCardList}) {

    const [searchBarValue, setSearchBarValue] = useState("")

    const filteredCardList = fullCardList.filter(card => card.name.toLowerCase().includes(searchBarValue.toLowerCase()))
    console.log("filtered card list", filteredCardList)

    return (
        <div>
            CardList!!
            <FilterFields />
            <SearchBar setSearchBarValue={setSearchBarValue} />
            <Card cardList={filteredCardList} />
        </div>
    )
}

export default CardList