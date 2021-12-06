import {useState, useEffect} from 'react'
import Card from "./Card"
import SearchBar from "./SearchBar"
import FilterFields from "./FilterFields"
import '../App.css'

function CardList({fullCardList}) {
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
            setCount(previous => previous + 15)
        }
        console.log(filteredCardList)
    }

    function handlePageDown() {
        if (count >= 15) {
            setCount(previous => previous - 15)
        }
    }
    
    return (
        <div>
            <h2 className="title">Runeterra Card List</h2>
            <div className="filters-and-search">
                <FilterFields selectedRegion={selectedRegion} setSelectedRegion={setSelectedRegion} setSelectedType={setSelectedType} setSelectedSet={setSelectedSet} setSelectedRarity={setSelectedRarity} />
                <SearchBar setSearchBarValue={setSearchBarValue} />
            </div>
            <div className="card-holder">
                {filteredCardList.slice(count, count+15).map((card, index) => <Card key={index} card={card} style="card"/>)}
            </div>
            <button type="button" class="btn btn-primary" onClick={handlePageDown}>Previous Page</button>
            <button type="button" class="btn btn-primary" onClick={handlePageUp}>Next Page</button>
        </div>
    )
}

export default CardList