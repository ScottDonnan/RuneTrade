import Card from "./Card";
import {useState, useEffect} from 'react'

function ActualList({filteredCardList, searchBarValue, selectedRegion, selectedType, selectedSet, selectedRarity}) {
    const [count, setCount] = useState(0)

    
    useEffect(() => {
        setCount(0)
    }, [searchBarValue])

    function handlePageUp() {
        if (count+10 <= filteredCardList.length) {
            setCount(previous => previous + 10)
        }
    }

    function handlePageDown() {
        if (count >= 10) {
            setCount(previous => previous - 10)
        }
    }
    
    return (
        <>
            <div className="card-holder">
                {filteredCardList.slice(count, count+10).map((card, index) => <Card key={index} card={card} style="card"/>)}
            </div>
            <button type="button" class="btn btn-primary" onClick={handlePageDown}>Previous Page</button>
            <button type="button" class="btn btn-primary" onClick={handlePageUp}>Next Page</button>
            <button>{count / 10} of {Math.floor(filteredCardList.length / 10)}</button>
        </>
    )
}

export default ActualList;