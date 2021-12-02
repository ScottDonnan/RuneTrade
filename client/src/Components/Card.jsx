import '../App.css'

function Card({cardList}) {
    let keyCount = 0
    const cardDisplayArray = cardList.map(card => {
        keyCount++
        return(
            <div className="card">
                <img key={keyCount} style={{width: "90%"}} src={card.card_image} />
                Card Count:
            </div>
        )
    })

    return (
        <div className="card-holder">
            {cardDisplayArray}
        </div>
    )
}

export default Card