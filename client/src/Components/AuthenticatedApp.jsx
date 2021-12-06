import {useState, useEffect} from 'react'
import CardList from "./CardList"
import {Routes, Route} from 'react-router-dom'
import Library from "./Library"
import TradeList from './TradeList'
import Loot from './Loot'


function AuthenticatedApp({fullCardList, loggedInUser, setLoggedInUser}) {
    const [userLibrary, setUserLibrary] = useState([])
    const [tradeExecuted, setTradeExecuted] = useState(false)
    const [tradeCreateSucc, setTradeCreateSucc] = useState(null)
    const [tradeCancelled, setTradeCancelled] = useState(false)
    const [tradeDeclined, setTradeDeclined] = useState(false)
    const [accepterCardOffered, setAccepterCardOffered] = useState(false)
    const [randomCardArray, setRandomCardArray] = useState([])
    const userLibraryCards = userLibrary.map(library => library.card).sort(compare)
    const userLibraryCount = {}
    
    useEffect(() => {
        fetch(`/userlibrary/${loggedInUser.id}`)
        .then(resp => {
            if(resp.ok) {
                resp.json().then(data => setUserLibrary(data))
            } else {
                resp.json().then(data => console.log(data))
            }
        })
    }, [tradeExecuted, tradeCreateSucc, tradeCancelled, accepterCardOffered, tradeDeclined, randomCardArray])
    
    function compare(a, b) {
        if (a.name < b.name) {
            return -1
        } else if (a.name > b.name) {
            return 1
        } else {
            return 0
        }
    }
    
    userLibraryCards.forEach((card) => {
        userLibraryCount[card.name] = (userLibraryCount[card.name] || 0) + 1;
    })
    
    const noDuplicateCards = [...new Set(userLibraryCards.map(card => card.id))].map(id => {
        return userLibraryCards.find(card => card.id === id)
    })

    return(
        <Routes>
            {/* <Route exact path='/' element={<Home />} /> */}
            <Route path='/' element={<CardList fullCardList={fullCardList} />} />
            <Route path="trade/*" element={<TradeList userLibrary={userLibrary} loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} tradeExecuted={tradeExecuted} setTradeExecuted={setTradeExecuted} tradeCreateSucc={tradeCreateSucc} setTradeCreateSucc={setTradeCreateSucc} tradeCancelled={tradeCancelled} setTradeCancelled={setTradeCancelled} accepterCardOffered={accepterCardOffered} setAccepterCardOffered={setAccepterCardOffered} tradeDeclined={tradeDeclined} setTradeDeclined={setTradeDeclined} userLibraryCount={userLibraryCount} />} />
            <Route path='library' element={<Library loggedInUser={loggedInUser} fullCardList={noDuplicateCards} userLibraryCount={userLibraryCount} />} />
            <Route path='loot' element={<Loot setLoggedInUser={setLoggedInUser} fullCardList={fullCardList} loggedInUser={loggedInUser} randomCardArray={randomCardArray} setRandomCardArray={setRandomCardArray} />} />
            <Route path='*' element={<Library loggedInUser={loggedInUser} fullCardList={noDuplicateCards} userLibraryCount={userLibraryCount} />} />
        </Routes>     
    )
}

export default AuthenticatedApp