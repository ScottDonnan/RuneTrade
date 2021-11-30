import TradeCard from "./TradeCard"
import Comment from "./Comment"
import { useRoutes } from "react-router"

function MyTrades({tradesList, loggedInUser}) {
    const myAcceptedTrades = tradesList.filter(trade => trade.trade_proposer_id === loggedInUser.id)
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
        } else {
            returnTrade()
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
                resp.json().then(data => console.log(data))
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
                resp.json().then(data => console.log(data))
            }
        })
    }

    function returnTrade() {
        console.log('return this trade')
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
                    </form>
                </div>
    })
    
    
    return (
        <div>
            My Trades!
            {myTradesDisplay}
        </div>
    )
}

export default MyTrades