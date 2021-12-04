import {useState, useEffect} from 'react'
import LootCard from './LootCard'
import '../App.css'

function Loot({fullCardList, loggedInUser, randomCardArray, setRandomCardArray, setLoggedInUser}){
    const [newBox, setNewBox] = useState(true)
    let lootDisplay 
    
    useEffect(() => {
        setRandomCardArray([])
    }, [])
    
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
                    updateProposerLootToken(loggedInUser)
                } else {
                    resp.json().then(data => console.log(data))
                }
            })
        })
    }

    function updateProposerLootToken(user) {
        const addLootToken = user.loot_token - 1
        fetch(`/users/${user.id}`, {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({loot_token: addLootToken})
        }).then (resp => {
            if(resp.ok) {
                resp.json().then(user => setLoggedInUser(user))
            } else {
                resp.json().then(data => console.log(data))
            }
        })
    }
    
    if (loggedInUser.loot_token > 0) {
            lootDisplay = <div>
                You have {loggedInUser.loot_token} tokens, click me for some new cards.
                <br />
                <img style={{width: '300px'}} onClick={generateCards} src="https://images.contentstack.io/v3/assets/blta38dcaae86f2ef5c/blt95b91d7af4d5c6a6/5fd2a6b07c43e43bf4196b87/1.16_patch_notes_zaun_cardback.png" />
            </div>
        } else {
            lootDisplay = <div>
                Sorry, you need to accept more trades to get more Tokens
            </div>
        }
       

    return(
        <>
            {lootDisplay}
            <div class="card-group">
                    {randomCardArray.map(card => <LootCard card={card} newBox={newBox} setNewBox={setNewBox} />)}
                </div>
        </>
    )
}

export default Loot