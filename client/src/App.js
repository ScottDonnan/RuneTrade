import { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import UnauthenticatedApp from "./Components/UnauthenticatedApp";
import AuthenticatedApp from "./Components/AuthenticatedApp";
import Navigation from "./Components/Navigation"

function App() {
  const [fullCardList, setFullCardList] = useState([])
  const [loggedInUser, setLoggedInUser] = useState({id: 1})

  useEffect(() => {
    fetch('/cards')
    .then(resp => resp.json())
    .then(data => setFullCardList(data))
  }, [])

  return (
    <BrowserRouter>
        <Navigation loggedInUser={loggedInUser} />
        {loggedInUser ? <AuthenticatedApp loggedInUser={loggedInUser} fullCardList={fullCardList} /> : <UnauthenticatedApp fullCardList={fullCardList}/>}
    </BrowserRouter>
  );
}

export default App;