import TradeListNav from "./TradeListNav"
import NewTradeForm from "./NewTradeForm"
import AvailableTrades from "./AvailableTrades"
import MyAcceptedTrades from "./MyAcceptedTrades"
import MyTrades from "./MyTrades"
import {Routes, Route} from 'react-router-dom'
import {useState, useEffect} from 'react'

function TradeList({loggedInUser, userLibrary, tradeExecuted, setTradeExecuted, tradeCreateSucc, setTradeCreateSucc, tradeCancelled, setTradeCancelled, accepterCardOffered, setAccepterCardOffered, tradeDeclined, setTradeDeclined, userLibraryCount}) {
    const [tradesList, setTradesList] = useState([])

    useEffect(() => {
        fetch('/trades')
        .then(resp => resp.json())
        .then(data => {
            setTradesList(data)
        })
    }, [accepterCardOffered, tradeExecuted, tradeCancelled, tradeCreateSucc, tradeDeclined])

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
        <div className="wrapper">
            <TradeListNav />
            <Routes>
                <Route path="newtrade" element={<NewTradeForm loggedInUser={loggedInUser} userLibrary={userLibrary} tradeCreateSucc={tradeCreateSucc} setTradeCreateSucc={setTradeCreateSucc} updateListedStatus={updateListedStatus} userLibraryCount={userLibraryCount}/>} />
                <Route path="my_trades" element={<MyTrades loggedInUser={loggedInUser} tradesList={tradesList} setTradeCancelled={setTradeCancelled} tradeCancelled={tradeCancelled} updateListedStatus={updateListedStatus} />} />
                <Route path="my_accepted_trades" element={<MyAcceptedTrades tradesList={tradesList} loggedInUser={loggedInUser} tradeExecuted={tradeExecuted} setTradeExecuted={setTradeExecuted} tradeCancelled={tradeCancelled} setTradeCancelled={setTradeCancelled} updateListedStatus={updateListedStatus} tradeDeclined={tradeDeclined} setTradeDeclined={setTradeDeclined} />} />
                <Route path="availabletrades" element={<AvailableTrades tradesList={tradesList} accepterCardOffered={accepterCardOffered} setAccepterCardOffered={setAccepterCardOffered} loggedInUser={loggedInUser} userLibrary={userLibrary} updateListedStatus={updateListedStatus} />} />
            </Routes>
            
        </div>
    )
}

export default TradeList