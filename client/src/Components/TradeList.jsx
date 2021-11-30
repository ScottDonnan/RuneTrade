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
            <MyTrades tradesList={tradesList} loggedInUser={loggedInUser}/>
            <NewTradeForm loggedInUser={loggedInUser} userLibrary={userLibrary} />
            <AvailableTrades tradesList={tradesList} accepterCardOffered={accepterCardOffered} setAccepterCardOffered={setAccepterCardOffered} loggedInUser={loggedInUser} userLibrary={userLibrary} />
            
        </div>
    )
}

export default TradeList