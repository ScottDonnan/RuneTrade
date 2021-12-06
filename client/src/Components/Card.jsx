import '../App.css'

function Card({card, style, userLibraryCount}) {
    return (
        <div className={style}>
            <img className="card-image" src={card.card_image} alt={card.name}/>
            {userLibraryCount ? userLibraryCount[card.name]: null}
        </div>
    )
}

export default Card