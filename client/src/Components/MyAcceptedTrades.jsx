import TradeCard from "./TradeCard"
import Comment from "./Comment"
import { useRoutes } from "react-router"

function MyAcceptedTrades({tradesList, loggedInUser, setTradeExecuted, tradeExecuted, tradeCancelled, setTradeCancelled, updateListedStatus}) {
    const myAcceptedTradesList = tradesList.filter(trade => trade.trade_proposer_id === loggedInUser.id && trade.executed !== true && trade.accepter_library_id)
    let submitButton
    let buttonToDisplay
    
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
            updateListedStatus(trade.proposer_library_id, false)
            updateListedStatus(trade.accepter_library_id, false)
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
        fetch(`/libraries/${trade.accepter_library?.id}`, {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(accepterLibraryObj)
        })
        .then (resp => {
            if(resp.ok) {
                resp.json().then(data => console.log("accepter library updated"))
            } else {
                resp.json().then(data => console.log(data))
            }
        })
    }

    function updateExecutedStatus(trade) {
        console.log('trade to be updated', trade)
        fetch(`/trades/${trade.id}`, {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ executed: true, pending: false})
        })
        .then(resp => {
            if ( resp.ok ){
                setTradeExecuted(true)
            } else {
                resp.json().then(data => console.log(data))
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
                updateListedStatus(trade.proposer_library_id, false)
                updateListedStatus(trade.accepter_library_id, false)
            } else {
                resp.json().then(data => console.log(data))
            }
        })
    }
    
    const MyAcceptedTradesDisplay = myAcceptedTradesList.map(trade => {
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

    if (tradeExecuted) {
        buttonToDisplay = <button onClick={() => setTradeExecuted(false)}>Another Trade</button>
    } else if (tradeCancelled) {
        buttonToDisplay = <button onClick={() => setTradeCancelled(false)}>Another Trade</button>
    } else {
        buttonToDisplay = MyAcceptedTradesDisplay
    }

    return (
        <div>
            My Accepted Trades!
            {buttonToDisplay}
        </div>
    )
}

export default MyAcceptedTrades