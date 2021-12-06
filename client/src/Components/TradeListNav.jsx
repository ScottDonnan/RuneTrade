import {Link} from 'react-router-dom'
import '../App.css'

function TradeListNav() {
    return(
        
            <nav class="nav flex-column">
                <Link to="newtrade" class="btn btn-primary btn-block m-2 mt-4" aria-current="page">New Trade</Link>
                <Link to="" class="btn btn-primary m-2">My Trades</Link>
                <Link to="my_accepted_trades" class="btn btn-primary m-2">Trades Awaiting Approval</Link>
                <Link to="availabletrades" class="btn btn-primary m-2">Available Trades</Link>
            </nav>
        
    )
}

export default TradeListNav