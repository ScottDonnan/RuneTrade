import CardList from "./CardList"
import {Routes, Route} from 'react-router-dom'

function UnauthenticatedApp({fullCardList}) {
    return(
        <div>
            Unauthenticated App!!
            <Routes>
                <Route path='/cards' element={<CardList fullCardList={fullCardList} />} />
            </Routes>
        </div>
    )
}

export default UnauthenticatedApp