import {useState} from 'react'
import '../App.css'

function LootCard({card, newBox, setNewBox}) {
    const [cardDisplay, setCardDisplay] = useState(true)
    
    if (newBox && cardDisplay === false){
        setCardDisplay(true)
    }

    function handleShowCard() {
        setCardDisplay(false)
        if (newBox) {
            setNewBox(false)
        }
    }

    return(
        <div class="card">
                {cardDisplay ? <img class="card-img-top" src="https://i.redd.it/j0vji0femry41.png" onClick={handleShowCard} alt="runeterra card back"/> : <img src={card.card_image} class="card-img-top" className="card-back" alt={card.name} />}
        </div>
    )
}

export default LootCard