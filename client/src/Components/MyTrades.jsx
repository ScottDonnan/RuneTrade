import TradeCard from "./TradeCard"
import '../App.css'
// import {useState} from 'react'

function MyTrades({tradesList, loggedInUser, tradeCancelled, setTradeCancelled, updateListedStatus}) {
    const myProposedTrades = tradesList.filter(trade => trade.trade_proposer_id === loggedInUser.id && trade.executed !== true)
    const myExecutedTrades = tradesList.filter(trade => trade.executed === true && trade.trade_proposer_id === loggedInUser.id)
    const myAcceptedTrades = tradesList.filter(trade => trade.trade_accepter_id === loggedInUser.id && trade.executed !== true)
    

    
    const displayProposedTrades = myProposedTrades.map(trade => {
        return <div className="pending-trade">
                {Cards(trade)}
                <button class="btn btn-danger" onClick={() => cancelTrade(trade)}>Cancel Trade</button>
                </div>
            })

    const displayAcceptedTrades = myAcceptedTrades.map(trade => {
        return <div className="pending-trade">
                    {Cards(trade)}
                </div>  
    })

    const displayExecutedTrades = myExecutedTrades.map(trade => {
        return <div className="pending-trade">
                    {Cards(trade)}
                </div> 
    })

    function Cards(trade) {
        return <div key={trade.id}>
            <p>Trade Id: {trade.id}</p>
            <p>Executed Status: {trade.executed ? "True" : "Not Executed"}</p>
            <p>Initial Trade Proposed By: {trade.trade_proposer?.user_name}</p>
            <div className="mytraded-accepted-card">
                {trade.trade_accepter ? <TradeCard tradeProposer={trade.trade_accepter} proposedLibrary={trade.accepter_library} /> : null}
                <TradeCard tradeProposer={trade.trade_proposer} proposedLibrary={trade.proposer_library} />
            </div>
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
        <div className="my-trades">
            <h2>------ Proposed Trades --------</h2>
            {tradeCancelled ? <button class="btn btn-primary" onClick={() => setTradeCancelled(false)}>View Trades</button> : displayProposedTrades}
            <br />
            <br />
            <br />
            <h2>------ Accepted Trades -------</h2>
            {displayAcceptedTrades}
            <br />
            <br />
            <br />
            <h2>------- Executed Trades --------</h2>
            {displayExecutedTrades}
        </div>
    )
}

export default MyTrades