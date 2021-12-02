import {useState} from 'react'
import LootCard from './LootCard'

function Loot({fullCardList, loggedInUser, randomCardArray, setRandomCardArray}){
    const [newBox, setNewBox] = useState(true)
    
    function generateCards() {
        let numArray = []
        for (let loop = 0; loop < 5; loop++ ) {
            let generatedNumber = Math.floor((Math.random() * 847) + 1)
            numArray = [...numArray, generatedNumber]
       }
       const cardArray = numArray.map(num => {
           return fullCardList.find(card => card.id === num)
        })
       setNewBox(true)
       createLibraries(cardArray)
    }

    function createLibraries(cardArray) {
        cardArray.forEach(card => {
            const newLibObj = {
                user_id: loggedInUser.id,
                card_id: card.id,
                listed: false     
            }
            fetch(`/libraries`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(newLibObj)
            })
            .then(resp => {
                if(resp.ok) {
                    resp.json().then(data => console.log(data))
                    setRandomCardArray(cardArray)
                } else {
                    resp.json().then(data => console.log(data))
                }
            })
        })
    }

    return(
        <div>
            <button onClick={generateCards}>Open a Pack</button>
            <div class="card-group">
                {randomCardArray.map(card => <LootCard card={card} newBox={newBox} setNewBox={setNewBox} />)}
            </div>
        </div>
    )
}

export default Loot