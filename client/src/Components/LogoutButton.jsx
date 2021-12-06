function LogoutButton({loggedInUser, setLoggedInUser}) {
    
    function handleLogout() {
        fetch('/logout', {method: "DELETE"})
        .then(resp => {
            if(resp.ok) {
                resp.json().then(data => console.log(data))
                setLoggedInUser(null)
            } else {
                resp.json().then(data => console.log(data))
            }
        })
    }
    
    return(
        <button class="btn btn-primary position-absolute-end-0" onClick={handleLogout}>Logout {loggedInUser?.user_name}</button>
    )
}

export default LogoutButton