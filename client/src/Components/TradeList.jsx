import TradeListNav from "./TradeListNav"
import NewTradeForm from "./NewTradeForm"
import AvailableTrades from "./AvailableTrades"
import MyTrades from "./MyTrades"
import {Routes, Route} from 'react-router-dom'
import {useState, useEffect} from 'react'

function TradeList({loggedInUser, userLibrary}) {
    const [tradesList, setTradesList] = useState([])
    const [accepterCardOffered, setAccepterCardOffered] = useState(false)


    useEffect(() => {
        fetch('/trades')
        .then(resp => resp.json())
        .then(data => {
            setTradesList(data)
        })
    }, [accepterCardOffered])
    
    return(
        <div>
            TradeList!!!
            <TradeListNav />
            <Routes>
                <Route path="newtrade" element={<NewTradeForm loggedInUser={loggedInUser} userLibrary={userLibrary} />} />
                <Route path="mytrades" element={<MyTrades tradesList={tradesList} loggedInUser={loggedInUser}/>} />
                <Route path="availabletrades" element={<AvailableTrades tradesList={tradesList} accepterCardOffered={accepterCardOffered} setAccepterCardOffered={setAccepterCardOffered} loggedInUser={loggedInUser} userLibrary={userLibrary} />} />
            </Routes>
            
        </div>
    )
}

export default TradeList