import {useState, useEffect} from 'react'
import CardList from "./CardList"
import {Routes, Route} from 'react-router-dom'
import Library from "./Library"
import Home from './Home'
import TradeList from './TradeList'
import Loot from './Loot'


function AuthenticatedApp({fullCardList, loggedInUser}) {
    const [userLibrary, setUserLibrary] = useState([])
    const [tradeExecuted, setTradeExecuted] = useState(false)
    const [tradeCreateSucc, setTradeCreateSucc] = useState(null)
    const [tradeCancelled, setTradeCancelled] = useState(false)
    const [tradeDeclined, setTradeDeclined] = useState(false)
    const [accepterCardOffered, setAccepterCardOffered] = useState(false)
    const [randomCardArray, setRandomCardArray] = useState([])

    useEffect(() => {
        fetch(`/userlibrary/${loggedInUser.id}`)
        .then(resp => resp.json())
        .then(data => setUserLibrary(data))
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
    
    const userLibraryCards = userLibrary.map(library => library.card).sort(compare)
    
    // let x = new Set(userLibraryCards)
    // console.log(x)
    
    // const counts = {}
    
    // x.forEach((card) => {
    //     counts[card.name] = (counts[card.name] || 0) + 1;
    // })

    // console.log('library counts', counts)

    // function compare(a, b) {
    //     if (a.name < b.name) {
    //         return -1
    //     } else if (a.name > b.name) {
    //         return 1
    //     } else {
    //         return 0
    //     }
    // }

    // console.log(userLibraryCards.sort(compare))






    return(
        <div>
            Authenticated App!!
            <Routes>
                <Route exact path='/' element={<Home />} />
                <Route path="trade/*" element={<TradeList userLibrary={userLibrary} loggedInUser={loggedInUser} tradeExecuted={tradeExecuted} setTradeExecuted={setTradeExecuted} tradeCreateSucc={tradeCreateSucc} setTradeCreateSucc={setTradeCreateSucc} tradeCancelled={tradeCancelled} setTradeCancelled={setTradeCancelled} accepterCardOffered={accepterCardOffered} setAccepterCardOffered={setAccepterCardOffered} tradeDeclined={tradeDeclined} setTradeDeclined={setTradeDeclined} />} />
                <Route path='library' element={<Library fullCardList={userLibraryCards} />} />
                <Route path='cards' element={<CardList fullCardList={fullCardList} />} />
                <Route path='loot' element={<Loot fullCardList={fullCardList} loggedInUser={loggedInUser} randomCardArray={randomCardArray} setRandomCardArray={setRandomCardArray} />} />
            </Routes>
        </div>       
    )
}

export default AuthenticatedApp