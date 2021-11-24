import {useEffect, useState} from 'react'
import CardList from "./CardList"
import SearchBar from "./SearchBar"
import FilterFields from "./FilterFields"

function UnauthenticatedApp({fullCardList}) {
    const [searchBarValue, setSearchBarValue] = useState("")
    const [selectedRegion, setSelectedRegion] = useState("")
    const [selectedType, setSelectedType] = useState("")
    const [selectedSet, setSelectedSet] = useState("")
    const [selectedRarity, setSelectedRarity] = useState("")
    const [count, setCount] = useState(0)

    const filteredCardList = fullCardList.filter(card => {
        return (
            card.name.toLowerCase().includes(searchBarValue.toLowerCase()) 
            && card.region.includes(selectedRegion)
            && card.card_type.includes(selectedType)
            && card.set.includes(selectedSet)
            && card.rarity.toLowerCase().includes(selectedRarity.toLowerCase())
        )
    })
    console.log('filteredCardList', filteredCardList)

    useEffect(() => {
        setCount(0)
    }, [searchBarValue, selectedRegion, selectedType, selectedSet, selectedRarity])

    function handlePageUp() {
        if (count+8 <= filteredCardList.length) {
            setCount(count+8)
        }
    }

    function handlePageDown() {
        if (count >= 8) {
            setCount(count-8)
        }
    }
    
    return(
        <div>
            Unauthenticated
            <FilterFields setSelectedRegion={setSelectedRegion} setSelectedType={setSelectedType} setSelectedSet={setSelectedSet} setSelectedRarity={setSelectedRarity} />
            <SearchBar setSearchBarValue={setSearchBarValue} />
            <CardList filteredCardList={filteredCardList} count={count} />
            <button type="button" class="btn btn-primary" onClick={handlePageDown}>Primary</button>
            <button type="button" class="btn btn-primary" onClick={handlePageUp}>Primary</button>
        </div>
    )
}

export default UnauthenticatedApp