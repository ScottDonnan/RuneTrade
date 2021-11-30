import {Link} from 'react-router-dom'

function TradeListNav() {
    return(
        <nav class="nav flex-column nav-pills">
            <Link to="newtrade" class="nav-link" aria-current="page">New Trade</Link>
            <Link to="my_trades" class="nav-link">My Trades</Link>
            <Link to="my_accepted_trades" class="nav-link">Trades Awaiting Approval</Link>
            <Link to="availabletrades" class="nav-link">Available Trades</Link>
            <Link to="loot" class="nav-link" href="#">Loot</Link>
        </nav>
    )
}

export default TradeListNav