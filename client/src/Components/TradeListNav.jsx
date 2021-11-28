import {Link} from 'react-router-dom'

function TradeListNav() {
    return(
        <nav class="nav flex-column nav-pills">
            <Link to="/trade/new_trade" class="nav-link" aria-current="page" href="#">New Trade</Link>
            <a class="nav-link" href="#">Link</a>
            <a class="nav-link" href="#">Link</a>
            <a class="nav-link" href="#">Disabled</a>
        </nav>
    )
}

export default TradeListNav