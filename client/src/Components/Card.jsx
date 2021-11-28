import '../App.css'
import {Link, useParams} from 'react-router-dom'

function Card({cardList}) {
    let { id } = useParams()

    const cardDisplayArray = cardList.map(card => {
        return(
            <img to="cards/:id" key={card.id} style={{width: "20%"}} src={card.card_image} />
        )
    })

    return (
        <div to="/cards/:id">
            {cardDisplayArray}
        </div>
    )
}

export default Card