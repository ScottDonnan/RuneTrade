import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UnauthenticatedApp from "./Components/UnauthenticatedApp";

function App() {
  const [fullCardList, setFullCardList] = useState([])

  useEffect(() => {
    fetch('/cards')
    .then(resp => resp.json())
    .then(data => setFullCardList(data))
  }, [])

  return (
    <BrowserRouter>
        <UnauthenticatedApp fullCardList={fullCardList}/>
    </BrowserRouter>
  );
}

export default App;