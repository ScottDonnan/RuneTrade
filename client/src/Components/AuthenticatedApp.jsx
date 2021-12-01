import {useState, useEffect} from 'react'
import CardList from "./CardList"
import {Routes, Route} from 'react-router-dom'
import Library from "./Library"
import Home from './Home'
import TradeList from './TradeList'
import NewTradeForm from './NewTradeForm'


function AuthenticatedApp({fullCardList, loggedInUser}) {
    const [userLibrary, setUserLibrary] = useState([])
    const [tradeExecuted, setTradeExecuted] = useState(false)
    const [tradeCreateSucc, setTradeCreateSucc] = useState(null)
    const [tradeCancelled, setTradeCancelled] = useState(false)
    const [tradeDeclined, setTradeDeclined] = useState(false)
    const [accepterCardOffered, setAccepterCardOffered] = useState(false)




    useEffect(() => {
        fetch(`/userlibrary/${loggedInUser.id}`)
        .then(resp => resp.json())
        .then(data => setUserLibrary(data))
    }, [tradeExecuted, tradeCreateSucc, tradeCancelled, accepterCardOffered, tradeDeclined])

    const userLibraryCards = userLibrary.map(library => library.card)
    
    return(
        <div>
            Authenticated App!!
            <Routes>
                <Route exact path='/' element={<Home />} />
                <Route path="trade/*" element={<TradeList userLibrary={userLibrary} loggedInUser={loggedInUser} tradeExecuted={tradeExecuted} setTradeExecuted={setTradeExecuted} tradeCreateSucc={tradeCreateSucc} setTradeCreateSucc={setTradeCreateSucc} tradeCancelled={tradeCancelled} setTradeCancelled={setTradeCancelled} accepterCardOffered={accepterCardOffered} setAccepterCardOffered={setAccepterCardOffered} tradeDeclined={tradeDeclined} setTradeDeclined={setTradeDeclined} tradeDeclined={tradeDeclined}/>} />
                <Route path='library' element={<Library fullCardList={userLibraryCards} />} />
                <Route path='cards' element={<CardList fullCardList={fullCardList} />} />
            </Routes>
        </div>       
    )
}

export default AuthenticatedApp