import TradeCard from "./TradeCard"
// import {useState} from 'react'

function MyTrades({tradesList, loggedInUser, tradeCancelled, setTradeCancelled, updateListedStatus}) {
    const myProposedTrades = tradesList.filter(trade => trade.trade_proposer_id === loggedInUser.id && trade.executed !== true)
    const myExecutedTrades = tradesList.filter(trade => trade.executed === true)
    const myAcceptedTrades = tradesList.filter(trade => trade.trade_accepter_id === loggedInUser.id && trade.executed !== true)
    

    
    const displayProposedTrades = myProposedTrades.map(trade => {
        return <div>
                {Cards(trade)}
                <button onClick={() => cancelTrade(trade)}>Cancel Trade</button>
                </div>
            })

    const displayAcceptedTrades = myAcceptedTrades.map(trade => {
        return Cards(trade) 
    })

    const displayExecutedTrades = myExecutedTrades.map(trade => {
        return Cards(trade) 
    })

    function Cards(trade) {
        return <div>
            Trade Id: {trade.id}
            <br/>
            Executed Status: {trade.executed ? "True" : "Not Executed"}
            <br/>
            Accepted By: {trade.trade_accepter?.user_name}
            <br/>
            <TradeCard key={trade.id} tradeProposer={trade.trade_proposer} proposedLibrary={trade.proposer_library} />
        </div>
    }

    function cancelTrade(trade) {
        fetch(`/trades/${trade.id}`, {
            method: "DELETE"
        })
        .then(resp => {
            if (resp.ok) {
                console.log("cancelled", resp)
                setTradeCancelled(true)
                updateListedStatus(trade.proposer_library_id, false)
                updateListedStatus(trade.accepter_library_id, false)
            } else {
                resp.json().then(data => console.log(data))
            }
        })
    }

    return(
        <div>
            ------ Proposed Trades --------
            {tradeCancelled ? <button onClick={() => setTradeCancelled(false)}>View Trades</button> : displayProposedTrades}
            <br />
            <br />
            <br />
            ------ Accepted Trades -------
            {displayAcceptedTrades}
            <br />
            <br />
            <br />
            ------- Executed Trades --------
            {displayExecutedTrades}
        </div>
    )
}

export default MyTrades