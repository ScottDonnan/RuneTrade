import {Link} from 'react-router-dom'
import LogoutButton from './LogoutButton'

function Navigation({loggedInUser, setLoggedInUser}) {
    
    const authenticatedNavBar = <><li class="nav-item">
                                        <Link to="/library" class="nav-link" href="#">Library</Link>
                                    </li>
                                    <li class="nav-item">
                                        <Link to='/trade' class="nav-link" href="#">Trade</Link>
                                    </li>
                                    <li class="nav-item">
                                        <Link to="loot" class="nav-link">Loot</Link>
                                    </li>
                                    
                                        <LogoutButton loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser}/>
                                    
                                    </>

    return(
        <nav class="navbar sticky-top navbar-expand-sm navbar-light bg-light">
            <div class="container-fluid">
                <Link to="/" class="navbar-brand" href="#">RuneTrade</Link>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <Link to="/" class="nav-link" aria-current="page" href="#">Cards</Link>
                        </li>
                        {loggedInUser ? authenticatedNavBar : <li class="nav-item"><Link to="/login" class="nav-link" aria-current="page" href="#">Login</Link></li>}                       
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navigation