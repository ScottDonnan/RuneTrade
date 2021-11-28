import CardList from "./CardList"
import CardDetails from "./CardDetails"
import {Routes, Route} from 'react-router-dom'

function UnauthenticatedApp({fullCardList}) {
    return(
        <div>
            Unauthenticated App!!
            <Routes>
                <Route path='/cards' element={<CardList fullCardList={fullCardList} />} />
                <Route path='/cards/:id' element={<CardDetails />} />
            </Routes>
        </div>
    )
}

export default UnauthenticatedApp