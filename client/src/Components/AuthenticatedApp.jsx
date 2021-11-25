import {useState, useEffect} from 'react'
import CardList from "./CardList"
import {Routes, Route} from 'react-router-dom'
import Library from "./Library"
import Home from './Home'


function AuthenticatedApp({fullCardList, loggedInUser}) {
    const [userLibrary, setUserLibrary] = useState([])

    useEffect(() => {
        fetch(`/userlibrary/${loggedInUser.id}`)
        .then(resp => resp.json())
        .then(data => setUserLibrary(data))
    }, [])
    
    return(
        <div>
            Authenticated App!!
            <Routes>
                <Route path='/library' element={<Library fullCardList={userLibrary} />} />
                <Route path='/cards' element={<CardList fullCardList={fullCardList} />} />
                <Route path='/' element={<Home />} />
            </Routes>
        </div>       
    )
}

export default AuthenticatedApp