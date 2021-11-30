import TradeCard from "./TradeCard"
// import {useState} from 'react'

function MyTrades({tradesList, loggedInUser}) {
    // const [filterValue, setFilterValue] = useState('')
    const myTradeList = tradesList.filter(trade => trade.trade_proposer_id === loggedInUser.id)

    // const sortedTrades = myTradeList.filter(trade => trade.executed.includes(filterValue) || trade.proposer_library_id || )
    
    const displayTrades = myTradeList.map(trade => {
        return <div>
            Trade Id: {trade.id}
            <br/>
            Executed Status: {trade.executed ? "True" : "Not Executed"}
            <br/>
            Accepted By: {trade.trade_accepter?.user_name}
            <br/>
            <TradeCard key={trade.id} tradeProposer={trade.trade_proposer} proposedLibrary={trade.proposer_library} />
            <br/>
            <br/>
            <br/>
        </div>
    })

    return(
        <div>
            {/* <div class="dropdown">
                <select class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false" >
                    <option class="dropdown-item" value="">All</option>
                    <option class="dropdown-item" value="null">Awaiting Accepter</option>
                    <option class="dropdown-item" value="true">Accepted</option>
                    <option class="dropdown-item" value="true">Executed</option>
                </select>
            </div> */}
            {displayTrades}
        </div>
    )
}

export default MyTrades