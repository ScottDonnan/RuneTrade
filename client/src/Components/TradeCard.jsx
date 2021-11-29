import {useEffect, useState} from 'react'

function TradeCard({tradeProposer, offeredCard, userLibrary, handleTradeAccepterOffer}) {
    const proposerName = tradeProposer.user_name
    
    return (
        <div class="card bg-light" style={{width: "18rem"}}>
            <img src={offeredCard.card?.card_image} class="card-img-top" alt="image for ..." />
            <div class="card-body">
                <h5 class="card-title">{offeredCard.card?.name}</h5>
                <p class="card-text">User: {proposerName} <br /> Would like to trade this card.</p>
                
                <form class="col g-3" onSubmit={(e) => handleTradeAccepterOffer(e, tradeProposer.id)}>
                    <div col-md-6>
                        <label for="inputState" class="form-label">Select Trade Card</label>
                        <select id="inputState" class="form-select">
                            <option selected>Card to Trade</option>
                            {userLibrary.map(card => <option key={card.id} value={card.id}>{card.name}</option>)}
                        </select>
                    </div>
                    <div class="input-group input-group-lg">
                        <span class="input-group-text" id="inputGroup-sizing-lg">Add a Note</span>
                        <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" />
                    </div>
                    <button href="#" class="btn btn-primary">Submit Trade</button>
                </form>
            </div>
        </div>  
    )
}

export default TradeCard