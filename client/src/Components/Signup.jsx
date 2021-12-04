import {useState} from 'react'

function Signup({setLoggedInUser}) {
    const [signupSuccess, setSignupSuccess] = useState(null)
    
    function handleSignup(e) {
        e.preventDefault()
        const signupObj = {
            user_name: e.target[0].value,
            email: e.target[1].value,
            password: e.target[2].value,
            password_confirmation: e.target[3].value,
            loot_token: 1
        }
        fetch('/signup', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(signupObj)
        })
        .then(resp => {
            if (resp.ok) {
                resp.json().then(user => {
                    alert("thank you for signing up")
                    setLoggedInUser(user)
                })
            } else {
                resp.json().then(data => console.log(data))
            }
        })
    }

    return( 
        <div class="container">
            <form onSubmit={handleSignup}>
                <div class="mb-3">
                    <label for="userName" class="form-label">Username</label>
                    <input type="username" class="form-control" id="userName" />
                </div>
                <div class="mb-3">
                    <label for="email" class="form-label">Email address</label>
                    <input type="email" class="form-control" id="email" aria-describedby="emailHelp" />
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Password</label>
                    <input type="password" class="form-control" id="exampleInputPassword1" />
                </div>
                <div class="mb-3">
                    <label for="passwordConfirmation" class="form-label">Confirm Password</label>
                    <input type="password" class="form-control" id="passwordConfirmation" />
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Signup