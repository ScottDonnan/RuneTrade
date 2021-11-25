import {useState, useEffect} from 'react'
import FilterFields from './FilterFields'
import SearchBar from './SearchBar'
import Card from './Card'

function Library({fullCardList}) {
    const [searchBarValue, setSearchBarValue] = useState("")
    const [selectedRegion, setSelectedRegion] = useState(["Bandle City", "Bilgewater", "Demacia", "Freljord", "Ionia", "Noxus", "Piltover & Zaun", "Shadow Isles", "Shurima", "Targon"])
    const [selectedType, setSelectedType] = useState("")
    const [selectedSet, setSelectedSet] = useState("")
    const [selectedRarity, setSelectedRarity] = useState("")
    const [count, setCount] = useState(0)

    
    // function findRegion(card) {
    //     selectedRegion.includes(card.region)
    // }
    
    const filteredCardList = fullCardList.filter(card => {
        return (
            card.name.toLowerCase().includes(searchBarValue.toLowerCase()) 
            && selectedRegion.includes(card.region)
            && card.card_type.includes(selectedType)
            && card.set.includes(selectedSet)
            && card.rarity.toLowerCase().includes(selectedRarity.toLowerCase())
        )
    })

    useEffect(() => {
        setCount(0)
    }, [searchBarValue, selectedRegion, selectedType, selectedSet, selectedRarity])

    function handlePageUp() {
        if (count+15 <= filteredCardList.length) {
            setCount(count+15)
        }
    }

    function handlePageDown() {
        if (count >= 15) {
            setCount(count-15)
        }
    }
    

    return (
        <div>
            CardList!!
            <FilterFields selectedRegion={selectedRegion} setSelectedRegion={setSelectedRegion} setSelectedType={setSelectedType} setSelectedSet={setSelectedSet} setSelectedRarity={setSelectedRarity} />
            <SearchBar setSearchBarValue={setSearchBarValue} />
            <Card cardList={filteredCardList.slice(count, count+15)} />
            <button type="button" class="btn btn-primary" onClick={handlePageDown}>Previous Page</button>
            <button type="button" class="btn btn-primary" onClick={handlePageUp}>Next Page</button>
        </div>
    )
}

export default Library