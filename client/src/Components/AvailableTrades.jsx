import TradeCard from "./TradeCard"
import Comment from "./Comment"
import '../App.css'

function AvailableTrades({tradesList, accepterCardOffered, setAccepterCardOffered, loggedInUser, userLibrary, updateListedStatus}) {
    const openMarketTrades = tradesList.filter(trade => trade.trade_proposer_id !== loggedInUser.id && trade.executed === null && trade.trade_accepter_id === null)
    const cardsAvailableToTrade = userLibrary.filter(library => !library.listed)
    let tradeComment

    function handleTradeAccepterOffer(e, tradeId) {
        e.preventDefault()
        if (e.target[0].value !== 'Card to Trade') {
            tradeComment = e.target[1].value
            const tradeObj = {
                trade_accepter_id: loggedInUser.id,
                accepter_library_id: e.target[0].value
            }
            fetch(`/trades/${tradeId}`, {
                method: "PATCH",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(tradeObj)
            })
            .then(resp => {
                if (resp.ok) {
                    resp.json().then(trade => {
                        if (tradeComment !== '') {
                            createTradeNote(trade)
                        }
                    })
                    updateListedStatus(e.target[0].value, true)
                    setAccepterCardOffered(true)
                } else {
                    resp.json().then(data => console.log(data))
                }
            })
        } else {
            console.log('Please select a card to trade')
        }
    }

    function createTradeNote(trade) {
        const tradeCommentObj = {
            trade_id: trade.id,
            user_id: loggedInUser.id,
            comment: tradeComment
        }
        fetch('/trade_comments', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(tradeCommentObj)
        }).then(resp => {
            if (resp.ok) {
                resp.json().then(data => console.log(data))
            } else {
                resp.json().then(data => console.log(data))
            }
        })
    }

    const availableTradeList = openMarketTrades.map(trade => {
        return <div key={trade.id} className="pending-trade">
                    <TradeCard tradeProposer={trade.trade_proposer} proposedLibrary={trade.proposer_library} />
                    <form class="col g-3" onSubmit={(e) => handleTradeAccepterOffer(e, trade.id)}>
                        <div col-md-6>
                            <label for="inputState" class="form-label">Select Trade Card</label>
                            <select id="inputState" class="form-select">
                                <option selected>Card to Trade</option>
                                {cardsAvailableToTrade.map(library => <option key={library.id} value={library.id}>{library.card.name}</option>)}
                            </select>
                        </div>
                        <Comment />
                        {trade.trade_comments.map(comment => <div>User:{comment?.user.user_name} <br /> Comment: {comment.comment}</div>)}
                        <button href="#" class="btn btn-primary" type="submit">Submit Trade</button>
                    </form>
                </div>
    })
    
    return (
        <div>
            { accepterCardOffered ? <button onClick={() => setAccepterCardOffered(false)}>another trade</button> : availableTradeList }
        </div>
    )
}

export default AvailableTrades