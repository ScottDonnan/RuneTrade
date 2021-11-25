import '../App.css'

function Card({cardList}) {

    const cardDisplayArray = cardList.map(card => {
        return(
            <img key={card.id} style={{width: "20%"}} src={card.card_image} />
        )
    })

    return (
        <div>
            {cardDisplayArray}
        </div>
    )
}

export default Card