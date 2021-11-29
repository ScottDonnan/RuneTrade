import {useState, useEffect} from 'react'

function TradeCard({tradeComments, id, tradeProposer, proposedLibrary, userLibrary, handleTradeAccepterOffer}) {
    const [newTradeNote, setNewTradeNote] = useState('')
    const proposerName = tradeProposer.user_name

    return (
        <div class="card bg-light" style={{width: "18rem"}}>
            <img src={proposedLibrary.card?.card_image} class="card-img-top" alt="image for ..." />
            <div class="card-body">
                <h5 class="card-title">{proposedLibrary.card?.name}</h5>
                <p class="card-text">User: {proposerName} <br /> Would like to trade this card.</p>
                
                <form class="col g-3" onSubmit={(e) => handleTradeAccepterOffer(e, id)}>
                    <div col-md-6>
                        <label for="inputState" class="form-label">Select Trade Card</label>
                        <select id="inputState" class="form-select">
                            <option selected>Card to Trade</option>
                            {userLibrary.map(library => <option key={library.id} value={library.id}>{library.card.name}</option>)}
                        </select>
                    </div>
                    <div class="input-group input-group-lg">
                        <span class="input-group-text" id="inputGroup-sizing-lg">Add a Note</span>
                        <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" value={newTradeNote} onChange={(e) => setNewTradeNote(e.target.value)} />
                    </div>
                    {tradeComments.map(comment => <div>{comment.comment}</div>)}
                    <button href="#" class="btn btn-primary" type="submit">Submit Trade</button>
                </form>
            </div>
        </div>  
    )
}

export default TradeCard