
function TradeCard({tradeProposer, proposedLibrary}) {
    const proposerName = tradeProposer?.user_name

    return (
        <div style={{width: "75%"}}>
            <div class="card-header">
                Listed By: 
                <h3>{proposerName}</h3>
            </div>
            <img src={proposedLibrary?.card.card_image} class="card-img-top" alt="Runeterra trading card" />
            <div class="card-body">
                <h5 class="card-title">{proposedLibrary?.card.name}</h5>
            </div>
        </div>  
    )
}

export default TradeCard