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
        <button class="nav-link" onClick={handleLogout}>Logout {loggedInUser?.user_name}</button>
    )
}

export default LogoutButton