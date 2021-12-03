import {Link} from 'react-router-dom'

function Navigation({loggedInUser}) {
    
    const authenticatedNavBar = <><li class="nav-item">
                                        <Link to="/library" class="nav-link" href="#">Library</Link>
                                    </li>
                                    <li class="nav-item">
                                        <Link to='/trade' class="nav-link" href="#">Trade</Link>
                                    </li>
                                    <li class="nav-item">
                                        <Link to="loot" class="nav-link">Loot</Link>
                                    </li>
                                    <li class="nav-item">
                                        <Link to="logout" class="nav-link">Logout {loggedInUser?.user_name}</Link>
                                    </li>
                                    </>

    return(
        <nav class="navbar sticky-top navbar-expand-lg navbar-light bg-light">
            <div class="container-fluid">
                <Link to="/" class="navbar-brand" href="#">RuneTrade</Link>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <Link to="/cards" class="nav-link" aria-current="page" href="#">Cards</Link>
                        </li>
                        <li class="nav-item">
                            <Link to="/login" class="nav-link" aria-current="page" href="#">Login</Link>
                        </li>
                        {loggedInUser ? authenticatedNavBar : null}                       
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navigation