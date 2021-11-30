import TradeCard from "./TradeCard"
import Comment from "./Comment"
import { useRoutes } from "react-router"

function MyTrades({tradesList, loggedInUser, setTradeExecuted, tradeExecuted, tradeCancelled, setTradeCancelled}) {
    const myAcceptedTrades = tradesList.filter(trade => trade.trade_proposer_id === loggedInUser.id && trade.executed !== true)
    let submitButton
    
    function processTrade(e, trade) {
        e.preventDefault()
        if (submitButton === "Accept") {
            const proposerLibraryObj = {
                user_id: trade.trade_accepter_id
            }
            const accepterLibraryObj = {
                user_id: trade.trade_proposer_id
            }
            updateProposerLibrary(trade, proposerLibraryObj)
            updateAccepterLibrary(trade, accepterLibraryObj)
        } else if (submitButton === "Decline") {
            returnTrade(trade)
        } else {
            cancelTrade(trade)
        }
    }

    function updateProposerLibrary(trade, proposerLibraryObj){
        fetch(`/libraries/${trade.proposer_library.id}`, {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(proposerLibraryObj)
        })
        .then(resp => {
            if(resp.ok) {
                updateExecutedStatus(trade)
                console.log("proposer library updated")
            }
        })
    }

    function updateAccepterLibrary(trade, accepterLibraryObj) {
        fetch(`/libraries/${trade.accepter_library.id}`, {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(accepterLibraryObj)
        })
        .then (resp => {
            if(resp.ok) {
                resp.json().then(data => console.log("accepter library updated"))
            }
        })
    }

    function updateExecutedStatus(trade) {
        fetch(`/trades/${trade.id}`, {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ executed: true, pending: false})
        })
        .then(resp => {
            if ( resp.ok ){
                setTradeExecuted(true)
            } else {
                console.log(resp)
            }
        })
    }

    function returnTrade(trade) {
        console.log('return this trade')
    }

    function cancelTrade(trade) {
        fetch(`/trades/${trade.id}`, {
            method: "DELETE"
        })
        .then(resp => {
            if (resp.ok) {
                console.log("cancelled", resp)
                setTradeCancelled(true)
            } else {
                console.log(resp)
            }
        })
    }
    
    const myTradesDisplay = myAcceptedTrades.map(trade => {
        return  <div key={trade.id} class="container-md border">
                    <div clas="card-group">
                        <TradeCard tradeProposer={trade.trade_proposer} proposedLibrary={trade.proposer_library} />
                        <TradeCard tradeProposer={trade.trade_accepter} proposedLibrary={trade.accepter_library} />
                    </div>
                    {trade.trade_comments.map(comment => <p>User: {comment?.user.user_name} <br /> Comment: {comment.comment}</p>)}
                    <form onSubmit={(e) => processTrade(e, trade)}>
                        <Comment />
                        <button class="btn btn-success" value='Accept' onClick={() => submitButton = 'Accept'}>Accept Trade</button>
                        <button class="btn btn-danger" value='Decline' onClick={() => submitButton = 'Decline'}>Decline Trade</button>
                        <button class="btn btn-primary" value='Cancel' onClick={() => submitButton = 'Cancel'}>Cancel Trade</button>
                    </form>
                </div>
    })
    
    let buttonToDisplay

    if (tradeExecuted) {
        buttonToDisplay = <button onClick={() => setTradeExecuted(false)}>Another Trade</button>
    } else if (tradeCancelled) {
        buttonToDisplay = <button onClick={() => setTradeCancelled(false)}>Another Trade</button>
    } else {
        buttonToDisplay = myTradesDisplay
    }

    return (
        <div>
            My Trades!
            {buttonToDisplay}
        </div>
    )
}

export default MyTrades