import {useEffect} from 'react'

function TradeCard({tradeProposer, offeredCard, userLibrary}) {
    const proposerName = tradeProposer.user_name
    const proposerLib = offeredCard.card_id
    let card = {}
    
    useEffect(() => {
        fetch(`/cards/${proposerLib}`)
        .then(resp => resp.json())
        .then(data => {
            card = {...data}
        })
    }, [])
    
    return (
        <div class="card bg-light" style={{width: "18rem"}}>
            <img src="..." class="card-img-top" alt="image for ..." />
            <div class="card-body">
                <h5 class="card-title">{proposerLib}</h5>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <form class="col g-3">
                    {proposerName}{proposerLib}
                    <div col-md-6>
                        <label for="inputState" class="form-label">Select Trade Card</label>
                        <select id="inputState" class="form-select">
                            <option selected>Card to Trade</option>
                            {userLibrary.map(card => <option key={card.id} value={card.id}>{card.name}</option>)}
                        </select>
                    </div>
                    <a href="#" class="btn btn-primary">Submit Trade</a>
                </form>
            </div>
        </div>  
    )
}

export default TradeCard