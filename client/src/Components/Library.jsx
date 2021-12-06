import {useState, useEffect} from 'react'
import FilterFields from './FilterFields'
import SearchBar from './SearchBar'
import Card from './Card'

function Library({fullCardList, userLibraryCount }) {
    const [searchBarValue, setSearchBarValue] = useState("")
    const [selectedRegion, setSelectedRegion] = useState(["Bandle City", "Bilgewater", "Demacia", "Freljord", "Ionia", "Noxus", "Piltover & Zaun", "Shadow Isles", "Shurima", "Targon"])
    const [selectedType, setSelectedType] = useState("")
    const [selectedSet, setSelectedSet] = useState("")
    const [selectedRarity, setSelectedRarity] = useState("")
    const [count, setCount] = useState(0)
    
    const filteredCardList = fullCardList.filter(card => {
        return (
            card.name.toLowerCase().includes(searchBarValue.toLowerCase()) 
            && selectedRegion.includes(card.region)
            && card.card_type.includes(selectedType)
            && card.set.includes(selectedSet)
            && card.rarity.toLowerCase().includes(selectedRarity.toLowerCase())
        )
    }).slice(count, count+15)

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

    // {filteredCardList.map((card, index) => <Card key={index} card={card}/>)}

    return (
        <div>
            <FilterFields selectedRegion={selectedRegion} setSelectedRegion={setSelectedRegion} setSelectedType={setSelectedType} setSelectedSet={setSelectedSet} setSelectedRarity={setSelectedRarity} />
            <SearchBar setSearchBarValue={setSearchBarValue} />
            <div className="card-holder">
                {filteredCardList.map((card, index) => <Card key={index} card={card} userLibraryCount={userLibraryCount} style="card" />)}
            </div>            
            <button type="button" class="btn btn-primary" onClick={handlePageDown}>Previous Page</button>
            <button type="button" class="btn btn-primary" onClick={handlePageUp}>Next Page</button>
        </div>
    )
}

export default Library