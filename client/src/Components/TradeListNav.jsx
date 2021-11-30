import {Link} from 'react-router-dom'

function TradeListNav() {
    return(
        <nav class="nav flex-column nav-pills">
            <Link to="/trade/new_trade" class="nav-link" aria-current="page" href="#">New Trade</Link>
            <a class="nav-link" href="#">Available Trades</a>
            <a class="nav-link" href="#">My Trades</a>
            <a class="nav-link" href="#">Completed Trades</a>
        </nav>
    )
}

export default TradeListNav