import { useEffect, useState } from "react"
import TradeCard from "./TradeCard"

function AvailableTrades({loggedInUser, userLibrary}) {
    const [tradesList, setTradesList] = useState([])
    
    useEffect(() => {
        fetch('/trades')
        .then(resp => resp.json())
        .then(data => {
            setTradesList(data)
        })
    }, [])
    
    const openMarketTrades = tradesList.filter(trade => trade.trade_proposer_id !== loggedInUser.id && trade.executed === null)
    // debugger
    return (
        <div>
            {openMarketTrades.map(trade => <TradeCard key={trade.id} tradeProposer={trade.trade_proposer} offeredCard={trade.proposer_library} userLibrary={userLibrary} />)}
        </div>
    )
}

export default AvailableTrades