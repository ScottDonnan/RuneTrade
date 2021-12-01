function Loot({fullCardList}){
    
    function generateCards() {
        const randomNumber = Math.floor((Math.random() * 1000) + 1)
        const generatedCard = fullCardList.filter(card => card.id === randomNumber)
        console.log(generatedCard)
    }
    
    return(
        <div>
            <button onClick={generateCards}>Open a Pack</button>
        </div>
    )
}

export default Loot