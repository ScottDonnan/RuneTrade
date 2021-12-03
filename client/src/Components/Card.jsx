import '../App.css'

function Card({card, style, userLibraryCount}) {
    return (
        <div className={style}>
            <img style={{width: "90%"}} src={card.card_image} />
            {userLibraryCount ? userLibraryCount[card.name]: null}
        </div>
    )
}

export default Card