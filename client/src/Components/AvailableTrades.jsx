import { useEffect, useState } from "react"
import TradeCard from "./TradeCard"

function AvailableTrades({loggedInUser, userLibrary}) {
    const [tradesList, setTradesList] = useState([])
    const [accepterCardOffered, setAccepterCardOffered] = useState(false)
    const openMarketTrades = tradesList.filter(trade => trade.trade_proposer_id !== loggedInUser.id && trade.executed === null && trade.trade_accepter_id === null)
    let tradeComment
    
    useEffect(() => {
        fetch('/trades')
        .then(resp => resp.json())
        .then(data => {
            setTradesList(data)
        })
    }, [])

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
                    setAccepterCardOffered(true)
                } else {
                    console.log(resp)
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
                console.log(resp)
            }
        })
    }

    

    return (
        <div>
            {accepterCardOffered ? <button onClick={() => setAccepterCardOffered(false)}>another trade</button> : openMarketTrades.map(trade => <TradeCard key={trade.id} tradeComments={trade.trade_comments} id={trade.id} tradeProposer={trade.trade_proposer} proposedLibrary={trade.proposer_library} userLibrary={userLibrary} handleTradeAccepterOffer={handleTradeAccepterOffer}/>)}
        </div>
    )
}

export default AvailableTrades