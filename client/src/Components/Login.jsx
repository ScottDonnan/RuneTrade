import {Link} from 'react-router-dom'
import {useState} from "react"

function Login({setLoggedInUser}) {
    
    function handleLogin(e) {
        e.preventDefault()
        // debugger
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
                resp.json().then(data => console.log(data))
            }
        })
    }
    
    return(
        <div class="container">
            <form onSubmit={handleLogin}>
                <div class="mb-3">
                    <label for="username" class="form-label">Username</label>
                    <input type="username" class="form-control" id="username" aria-describedby="emailHelp" />
                </div>
                <div class="mb-3">
                    <label for="password" class="form-label">Password</label>
                    <input type="password" class="form-control" id="password" />
                </div>
                <button type="submit" class="btn btn-primary">Login</button>
            </form>
                <Link to="/Signup" class="btn btn-danger">Signup</Link>
        </div>
    )
}

export default Login