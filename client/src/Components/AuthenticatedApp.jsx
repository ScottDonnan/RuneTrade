import {useState, useEffect} from 'react'
import CardList from "./CardList"
import {Routes, Route} from 'react-router-dom'
import Library from "./Library"


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
            </Routes>
        </div>       
    )
}

export default AuthenticatedApp