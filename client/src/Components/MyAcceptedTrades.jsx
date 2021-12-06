import TradeCard from "./TradeCard"
import Comment from "./Comment"
import '../App.css'

function MyAcceptedTrades({tradesList, loggedInUser, setLoggedInUser, setTradeExecuted, tradeExecuted, tradeCancelled, setTradeCancelled, updateListedStatus, setTradeDeclined, tradeDeclined}) {
    const myAcceptedTradesList = tradesList.filter(trade => trade.trade_proposer_id === loggedInUser.id && trade.executed !== true && trade.accepter_library_id)
    let submitButton
    let buttonToDisplay
    
    function processTrade(e, trade) {
        e.preventDefault()
        if (submitButton === "Accept") {
            const proposerLibraryObj = {
                user_id: trade.trade_accepter_id,
            }
            const accepterLibraryObj = {
                user_id: trade.trade_proposer_id
            }
            updateProposerLibrary(trade, proposerLibraryObj)
            updateProposerLootToken(trade)
            updateAccepterLibrary(trade, accepterLibraryObj)
            updateListedStatus(trade.proposer_library_id, false)
            updateListedStatus(trade.accepter_library_id, false)
        } else if (submitButton === "Decline") {
            returnTrade(trade)
        } else {
            cancelTrade(trade)
        }
    }

    function updateProposerLootToken(trade) {
        const addLootToken = trade.trade_proposer.loot_token + 1
        fetch(`/users/${trade.trade_proposer_id}`, {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({loot_token: addLootToken})
        }).then (resp => {
            if(resp.ok) {
                resp.json().then(user => setLoggedInUser(user))
            } else {
                resp.json().then(data => console.log(data))
            }
        })
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
        fetch(`/trades/${trade.id}`, {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ accepter_library_id: null, trade_accepter_id: null})
        })
        .then(resp => {
            if (resp.ok) {
                console.log('trade declined')
                resp.json().then(data => console.log(data))
                setTradeDeclined(true)
                updateListedStatus(trade.accepter_library_id, false)
            } else {
                resp.json().then(data => console.log(data))
            }
        })
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
        return  <div key={trade.id} className="pending-trade">
                    <h2>Trade Number {trade.id}</h2>
                    <div className="pending-trade-cards">
                        <TradeCard tradeProposer={trade.trade_proposer} proposedLibrary={trade.proposer_library} />
                        <TradeCard tradeProposer={trade.trade_accepter} proposedLibrary={trade.accepter_library} />
                    </div>
                    <ul className="note-list">
                            <h3>Comments:</h3>
                            {trade.trade_comments.map(comment => <li>{comment?.user.user_name}: {comment.comment}</li>)}
                        </ul>
                    <form onSubmit={(e) => processTrade(e, trade)}>
                        <Comment />
                        <button class="btn btn-success" value='Accept' onClick={() => submitButton = 'Accept'}>Accept Trade</button>
                        <button class="btn btn-danger m-2" value='Decline' onClick={() => submitButton = 'Decline'}>Decline Trade</button>
                        <button class="btn btn-primary" value='Cancel' onClick={() => submitButton = 'Cancel'}>Cancel Trade</button>
                    </form>
                </div>
    })

    if (tradeExecuted) {
        buttonToDisplay = <button onClick={() => setTradeExecuted(false)}>Another Trade</button>
    } else if (tradeCancelled) {
        buttonToDisplay = <button onClick={() => setTradeCancelled(false)}>Another Trade</button>
    } else if(tradeDeclined) { 
        buttonToDisplay = <button onClick={() => setTradeDeclined(false)}>Another Trade</button>
    } else {
        buttonToDisplay = MyAcceptedTradesDisplay
    }

    return (
        <div className="accepted-trades">
            {buttonToDisplay}
        </div>
    )
}

export default MyAcceptedTrades