import TradeListNav from "./TradeListNav"
import NewTradeForm from "./NewTradeForm"
import AvailableTrades from "./AvailableTrades"
import {Routes, Route} from 'react-router-dom'

function TradeList({loggedInUser, userLibrary}) {
    return(
        <div>
            TradeList!!!
            <TradeListNav />
            
            <NewTradeForm loggedInUser={loggedInUser} userLibrary={userLibrary} />
            <AvailableTrades loggedInUser={loggedInUser} userLibrary={userLibrary} />
            
        </div>
    )
}

export default TradeList