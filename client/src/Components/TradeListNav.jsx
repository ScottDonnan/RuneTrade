import {Link} from 'react-router-dom'
import '../App.css'

function TradeListNav() {
    return(
        
            <nav className='sidebar' class="nav flex-column nav-pills navbar-light bg-light">
                <div className="sidebar-header">
                    <h3>Trade Sidebar</h3>
                </div>
                <Link to="newtrade" class="nav-link" aria-current="page">New Trade</Link>
                <Link to="my_trades" class="nav-link">My Trades</Link>
                <Link to="my_accepted_trades" class="nav-link">Trades Awaiting Approval</Link>
                <Link to="availabletrades" class="nav-link">Available Trades</Link>
            </nav>
        
    )
}

export default TradeListNav