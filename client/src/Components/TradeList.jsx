import TradeListNav from "./TradeListNav"
import NewTradeForm from "./NewTradeForm"

function TradeList({loggedInUser, userLibrary}) {
    return(
        <div>
            TradeList!!!
            <TradeListNav />
            <NewTradeForm loggedInUser={loggedInUser} userLibrary={userLibrary} />
        </div>
    )
}

export default TradeList