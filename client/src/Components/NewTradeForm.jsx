import {useState} from 'react'
import Card from './Card'
import "../App.css"

function NewTradeForm({loggedInUser, userLibrary, tradeCreateSucc, setTradeCreateSucc, updateListedStatus, userLibraryCount}) {
    
    const [tradeNote, setTradeNote] = useState('')
    const [selectedLibrary, setSelectedLibrary] = useState('')
    const cardsAvailableToTrade = userLibrary.filter(library => !library.listed)
    let tradeComment

    function createTrade(e) {
        e.preventDefault()
        tradeComment = e.target[0].value
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

    function handleNewTradeClick() {
        setSelectedLibrary('')
        setTradeCreateSucc(null)
        setTradeNote('')

    }

    // const createTradeForm =     <div className="newForm">
    // //                                 <div class="container-md border" style={{marginTop: "5%"}}>
    // //                                     Please select a card to trade
    // //                                     <img style={{width: "20%"}}src={selectedLibrary.card?.card_image} alt={selectedLibrary.card?.name} />
    // //                                     <form class="col g-3" onSubmit={createTrade}>
    // //                                         <div class="input-group input-group-lg">
    // //                                             <span class="input-group-text" id="inputGroup-sizing-lg">Add a Note</span>
    // //                                             <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" value={tradeNote} onChange={(e) => setTradeNote(e.target.value)} />
    // //                                         </div>
    // //                                         <button type="submit" class="btn btn-primary">Offer</button>
    // //                                     </form>
                                            // {cardsAvailableToTrade.map((library, index) => <div className="clicking" key={index} onClick={() => handleClick(library)}><Card card={library.card} style="tradeCard" userLibraryCount={userLibraryCount} /></div>)}                                

    // //                                 </div>
    // //                             </div>

const createTradeForm =             <div className="newFormPage">
                                        <div className="tradeForm">
                                            <div class="card-header">
                                                NEW TRADE
                                            </div>
                                            <div class="card-body">
                                                <h5 class="card-title">PLEASE SELECT A CARD TO TRADE</h5>
                                                <img className="form-image" src={selectedLibrary.card?.card_image} alt={selectedLibrary.card?.name} />
                                                <form class="col g-3" onSubmit={createTrade}>
                                                    <div class="input-group">
                                                        <span class="input-group-text" >ADD A COMMENT TO TRADE</span>
                                                        <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" value={tradeNote} onChange={(e) => setTradeNote(e.target.value)} />
                                                    </div>
                                                    <button type="submit" class="btn btn-primary">Offer Trade</button>
                                                </form>
                                            </div>
                                            
                                            <div class="card-footer text-muted mb-2">
                                                NEW TRADE
                                            </div>
                                        </div>
                                        <div className="tradeCards">
                                            {cardsAvailableToTrade.map((library, index) => <div className="clicking" key={index} onClick={() => handleClick(library)}><Card card={library.card} style="tradeCard" userLibraryCount={userLibraryCount} /></div>)}
                                        </div>
                                    </div>


    const tradeCreatedMessage = <div>
                                    <h2>CONGRATULATIONS YOU'VE OFFERED A TRADE</h2>
                                    <h3>APPROVE TRADES AND GET MORE LOOT TOKENS TO EXPAND YOUR LIBRARY</h3>
                                    <button class="btn btn-primary" onClick={handleNewTradeClick}>New Trade</button>
                                </div>

    return (
        <div style={{textAlign: "center"}}>
            {tradeCreateSucc ? tradeCreatedMessage : createTradeForm}
        </div>
    )
}

export default NewTradeForm