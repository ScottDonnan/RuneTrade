import CardList from "./CardList"

function UnauthenticatedApp({fullCardList}) {
    return(
        <div>
            Unauthenticated
            <CardList fullCardList={fullCardList}/>
        </div>
    )
}

export default UnauthenticatedApp