import {Link} from 'react-router-dom'

function Login({setLoggedInUser}) {
    
    function handleLogin(e) {
        e.preventDefault()
        const loginObj = {
            user_name: e.target[0].value,
            password: e.target[1].value,
        }
        fetch('/login', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(loginObj)
        })
        .then(resp => {
            if(resp.ok) {
                resp.json().then(user => setLoggedInUser(user))
            } else {
                resp.json().then(data => alert(data.errors))
            }
        })
    }
    
    return(
        <div style={{paddingTop: "5%"}}>
            <div class="container">
                <p>WELCOME TO TradeRune.  PLEASE LOGIN OR SIGNUP</p>
                <form onSubmit={handleLogin}>
                    <div class="mb-3">
                        <label for="username" class="form-label">Username</label>
                        <input type="username" class="form-control" id="username" aria-describedby="emailHelp" />
                    </div>
                    <div class="mb-3">
                        <label for="password" class="form-label">Password</label>
                        <input type="password" class="form-control" id="password" />
                    </div>
                    <div class="d-grid gap-3 d-md-flex justify-content-md-end">
                        <button type="submit" class="btn btn-light">Login</button>
                        <Link to="/Signup" class="btn btn-info d-grid gap-2 d-md-flex justify-content-md-end">Signup</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login