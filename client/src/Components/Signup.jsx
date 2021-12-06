
function Signup({setLoggedInUser}) {
    
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
        <div style={{paddingTop: "5%"}}>
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
                    <div class="d-grid gap-3 d-md-flex justify-content-md-end">
                        <button type="submit" class="btn btn-info d-grid gap-2 d-md-flex justify-content-md-end">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup