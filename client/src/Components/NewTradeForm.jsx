import {useState} from 'react'
import Card from './Card'

function NewTradeForm({loggedInUser, userLibrary, tradeCreateSucc, setTradeCreateSucc, updateListedStatus}) {
    
    const [tradeNote, setTradeNote] = useState('')
    const [selectedLibrary, setSelectedLibrary] = useState('')
    const cardsAvailableToTrade = userLibrary.filter(library => !library.listed)
    const userCards = userLibrary.map(library => library.card)
    let tradeComment

    function createTrade(e) {
        e.preventDefault()
        tradeComment = e.target[1].value
        const tradeObj = {
            trade_proposer_id: loggedInUser.id,
            proposer_library_id:  selectedLibrary.id,
            pending: true,
        }
        fetch('/trades', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(tradeObj)
        })
        .then(resp => {
            if (resp.ok){
                resp.json().then(trade => {
                    if (tradeComment !== '') {
                        createTradeNote(trade)
                    }
                })

                setTradeCreateSucc(true)
                updateListedStatus(selectedLibrary.id, true)
            } else {
                resp.json().then(data => console.log(data))
            }
        })
    }

    function createTradeNote(trade) {
        const tradeCommentObj = {
            trade_id: trade.id,
            user_id: loggedInUser.id,
            comment: tradeComment
        }
        fetch('/trade_comments', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(tradeCommentObj)
        }).then(resp => {
            if (resp.ok) {
                resp.json().then(data => console.log(data))
            } else {
                console.log(resp)
            }
        })
    }

    function handleClick(library) {
        setSelectedLibrary(library)
    }

    const createTradeForm =     <div className="newForm">
                                    <div class="container-md border">
                                        <img style={{width: "20%"}}src={selectedLibrary.card?.card_image} alt={selectedLibrary.card?.name} />
                                        <form class="col g-3" onSubmit={createTrade}>
                                            {/* <div col-md-6>
                                                <label for="inputState" class="form-label">Select Trade Card</label>
                                                <select id="inputState" class="form-select">
                                                    <option selected>Card to Trade</option>
                                                    {cardsAvailableToTrade.map(library => <option key={library.id} value={library.id}>{library.card.name}</option>)}
                                                </select>
                                            </div> */}
                                            <div class="input-group input-group-lg">
                                                <span class="input-group-text" id="inputGroup-sizing-lg">Add a Note</span>
                                                <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" value={tradeNote} onChange={(e) => setTradeNote(e.target.value)} />
                                            </div>
                                            <button type="submit" class="btn btn-primary">Offer</button>
                                        </form>
                                    </div>
                                    
                                        {cardsAvailableToTrade.map((library, index) => <div className="clicking" key={index} onClick={() => handleClick(library)}><Card card={library.card} style="tradeCard"/></div>)}
                                    
                                </div>

    const tradeCreatedMessage = <div>
                                    Trade Created!!
                                    <button onClick={() => setTradeCreateSucc(null)}>New Trade</button>
                                </div>

    return (
        <div>
            New Trade Form!!
            {tradeCreateSucc ? tradeCreatedMessage : createTradeForm}
        </div>
    )
}

export default NewTradeForm