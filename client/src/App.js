import { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import UnauthenticatedApp from "./Components/UnauthenticatedApp";
import AuthenticatedApp from "./Components/AuthenticatedApp";
import Navigation from "./Components/Navigation"

function App() {
  const [fullCardList, setFullCardList] = useState([])
  const [loggedInUser, setLoggedInUser] = useState(null)

  useEffect(() => {
    fetch('/cards').then(resp => resp.json()).then(data => setFullCardList(data))
  }, [])

  useEffect(() => {
    fetch('/me').then(resp => {
      if(resp.ok) {
        resp.json().then(user => setLoggedInUser(user))
      } else {
        resp.json().then(data => console.log(data))
      }
    })
  }, [])

  return (
    <BrowserRouter>
        <Navigation loggedInUser={loggedInUser} />
        {loggedInUser ? <AuthenticatedApp loggedInUser={loggedInUser} fullCardList={fullCardList} /> : <UnauthenticatedApp fullCardList={fullCardList} setLoggedInUser={setLoggedInUser}/>}
    </BrowserRouter>
  );
}

export default App;