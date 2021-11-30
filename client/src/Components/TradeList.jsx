import TradeListNav from "./TradeListNav"
import NewTradeForm from "./NewTradeForm"
import AvailableTrades from "./AvailableTrades"
import MyTrades from "./MyTrades"
import {Routes, Route} from 'react-router-dom'
import {useState, useEffect} from 'react'

function TradeList({loggedInUser, userLibrary, tradeExecuted, setTradeExecuted}) {
    const [tradesList, setTradesList] = useState([])
    const [accepterCardOffered, setAccepterCardOffered] = useState(false)
    const [tradeReturned, setTradeReturned] = useState(false)
    const [tradeCancelled, setTradeCancelled] = useState(false)
    const [tradeCreateSucc, setTradeCreateSucc] = useState(null)


    useEffect(() => {
        fetch('/trades')
        .then(resp => resp.json())
        .then(data => {
            setTradesList(data)
        })
    }, [accepterCardOffered, tradeExecuted, tradeCancelled, tradeCreateSucc])
    
    return(
        <div>
            TradeList!!!
            <TradeListNav />
            <Routes>
                <Route path="newtrade" element={<NewTradeForm loggedInUser={loggedInUser} userLibrary={userLibrary} tradeCreateSucc={tradeCreateSucc} setTradeCreateSucc={setTradeCreateSucc} />} />
                <Route path="mytrades" element={<MyTrades tradesList={tradesList} loggedInUser={loggedInUser} tradeExecuted={tradeExecuted} setTradeExecuted={setTradeExecuted} tradeCancelled={tradeCancelled} setTradeCancelled={setTradeCancelled} />} />
                <Route path="availabletrades" element={<AvailableTrades tradesList={tradesList} accepterCardOffered={accepterCardOffered} setAccepterCardOffered={setAccepterCardOffered} loggedInUser={loggedInUser} userLibrary={userLibrary} />} />
            </Routes>
            
        </div>
    )
}

export default TradeList