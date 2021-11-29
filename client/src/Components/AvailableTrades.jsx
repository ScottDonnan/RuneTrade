import { useEffect, useState } from "react"
import TradeCard from "./TradeCard"

function AvailableTrades({loggedInUser, userLibrary}) {
    const [tradesList, setTradesList] = useState([])
    const openMarketTrades = tradesList.filter(trade => trade.trade_proposer_id !== loggedInUser.id && trade.executed === null)
    
    useEffect(() => {
        fetch('/trades')
        .then(resp => resp.json())
        .then(data => {
            setTradesList(data)
        })
    }, [])

    function handleTradeAccepterOffer(e) {
        e.preventDefault()
        console.log(e)
        // trade_propser_id = 
        // trade_accepter_id = loggedInUser.id
        // propser_library_id = 
        // accepter_library_id = event
    }

    

    return (
        <div>
            {openMarketTrades.map(trade => <TradeCard key={trade.id} tradeProposer={trade.trade_proposer} offeredCard={trade.proposer_library} userLibrary={userLibrary} handleTradeAccepterOffer={handleTradeAccepterOffer}/>)}
        </div>
    )
}

export default AvailableTrades