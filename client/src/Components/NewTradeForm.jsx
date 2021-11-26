import {useState} from 'react'

function NewTradeForm({loggedInUser, userLibrary}) {
    
    const [tradeNote, setTradeNote] = useState('')
    const [tradeCreateSucc, setTradeCreateSucc] = useState(null)
    let tradeComment

    function getLibrary(e) {
        tradeComment = e.target[1].value
        fetch(`/users/${loggedInUser.id}/${e.target[0].value}`)
        .then(resp => {
            if (resp.ok) {
                resp.json().then(data => createTrade(data))
            } else {
                console.log(resp)
            }
        })
    }

    function createTrade(library) {
        const tradeObj = {
            trade_proposer_id: loggedInUser.id,
            proposer_library_id:  library.id,
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
            } else {
                console.log(resp)
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

    const createTradeForm = <div class="container-md border">
                                {/* <div class="row g-6">
                                    <div class="col">
                                        <input type="text" class="form-control" placeholder="First name" aria-label="First name" />
                                    </div>
                                    <div class="col">
                                        <input type="text" class="form-control" placeholder="Last name" aria-label="Last name" />
                                    </div>
                                </div> */}
                                <form class="col g-3" onSubmit={getLibrary}>
                                    <div col-md-6>
                                        <label for="inputState" class="form-label">Select Trade Card</label>
                                        <select id="inputState" class="form-select">
                                            <option selected>Card to Trade</option>
                                            {userLibrary.map(card => <option key={card.id} value={card.id}>{card.name}</option>)}
                                        </select>
                                    </div>
                                    <div class="input-group input-group-lg">
                                        <span class="input-group-text" id="inputGroup-sizing-lg">Add a Note</span>
                                        <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" value={tradeNote} onChange={(e) => setTradeNote(e.target.value)} />
                                    </div>
                                    <button type="submit" class="btn btn-primary">Offer</button>
                                </form>
                            </div>

    const tradeCreatedMessage = <div>
                                    Trade Created!!
                                    <button onClick={() => setTradeCreateSucc(null)}>New Trade</button>
                                </div>

    return (
        <div>
            {tradeCreateSucc ? tradeCreatedMessage : createTradeForm}
        </div>
    )
}

export default NewTradeForm