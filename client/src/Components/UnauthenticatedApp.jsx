import CardList from "./CardList"
import CardDetails from "./CardDetails"
import Login from "./Login"
import Signup from "./Signup"
import {Routes, Route} from 'react-router-dom'

function UnauthenticatedApp({fullCardList, setLoggedInUser}) {
    
    const alphaList = fullCardList.sort(compare)
    
    function compare(a, b) {
        if (a.name < b.name) {
            return -1
        } else if (a.name > b.name) {
            return 1
        } else {
            return 0
        }
    }
    
    return(
        <div>
            
            <Routes>
                <Route path='/' element={<CardList fullCardList={alphaList} />} />
                <Route path='/cards/:id' element={<CardDetails />} />
                <Route path='/login' element={<Login setLoggedInUser={setLoggedInUser} />} />
                <Route path='/signup' element={<Signup setLoggedInUser={setLoggedInUser} />} />
                <Route path='*' element={<CardList fullCardList={alphaList} />} />

            </Routes>
        </div>
    )
}

export default UnauthenticatedApp