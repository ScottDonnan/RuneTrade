import {useState, useEffect} from 'react'

function TradeCard({tradeProposer, proposedLibrary}) {
    const proposerName = tradeProposer?.user_name

    return (
        <div class="card bg-light" style={{width: "18rem"}}>
            <img src={proposedLibrary?.card.card_image} class="card-img-top" alt="image for ..." />
            <div class="card-body">
                <h5 class="card-title">{proposedLibrary?.card.name}</h5>
                <p class="card-text">User: {proposerName} <br />A brief Card description to go here</p>
            </div>
        </div>  
    )
}

export default TradeCard