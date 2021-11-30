import TradeListNav from "./TradeListNav"
import NewTradeForm from "./NewTradeForm"
import AvailableTrades from "./AvailableTrades"
import MyAcceptedTrades from "./MyAcceptedTrades"
import MyTrades from "./MyTrades"
import {Routes, Route} from 'react-router-dom'
import {useState, useEffect} from 'react'

function TradeList({loggedInUser, userLibrary, tradeExecuted, setTradeExecuted, tradeCreateSucc, setTradeCreateSucc, tradeCancelled, setTradeCancelled, accepterCardOffered, setAccepterCardOffered}) {
    const [tradesList, setTradesList] = useState([])
    const [tradeReturned, setTradeReturned] = useState(false)

    useEffect(() => {
        fetch('/trades')
        .then(resp => resp.json())
        .then(data => {
            setTradesList(data)
        })
    }, [accepterCardOffered, tradeExecuted, tradeCancelled, tradeCreateSucc])

    function updateListedStatus(libraryId, status) {
        fetch(`/libraries/${libraryId}`, {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({listed: status})
        }).then(resp => {
            if (resp.ok) {
                resp.json().then(data => console.log(data))
            } else {
                console.log(resp)
            }
        })
    }
    
    return(
        <div>
            TradeList!!!
            <TradeListNav />
            <Routes>
                <Route path="newtrade" element={<NewTradeForm loggedInUser={loggedInUser} userLibrary={userLibrary} tradeCreateSucc={tradeCreateSucc} setTradeCreateSucc={setTradeCreateSucc} updateListedStatus={updateListedStatus} />} />
                <Route path="my_trades" element={<MyTrades loggedInUser={loggedInUser} tradesList={tradesList} />} />
                <Route path="my_accepted_trades" element={<MyAcceptedTrades tradesList={tradesList} loggedInUser={loggedInUser} tradeExecuted={tradeExecuted} setTradeExecuted={setTradeExecuted} tradeCancelled={tradeCancelled} setTradeCancelled={setTradeCancelled} updateListedStatus={updateListedStatus} />} />
                <Route path="availabletrades" element={<AvailableTrades tradesList={tradesList} accepterCardOffered={accepterCardOffered} setAccepterCardOffered={setAccepterCardOffered} loggedInUser={loggedInUser} userLibrary={userLibrary} updateListedStatus={updateListedStatus} />} />
            </Routes>
            
        </div>
    )
}

export default TradeList