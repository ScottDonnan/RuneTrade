import {useState} from 'react'
import Card from "./Card"

function CardList({filteredCardList, count}) {

    

    return (
        <div>
            CardList!!
            <Card cardList={filteredCardList.slice(count, count+8)} />
        </div>
    )
}

export default CardList