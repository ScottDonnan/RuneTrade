import {useState} from 'react'

function Comment() {
    const [newTradeNote, setNewTradeNote] = useState('')
    
    return(
        <div class="input-group">
            <span class="input-group-text" id="inputGroup-sizing-lg">Add a Note</span>
            <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" value={newTradeNote} onChange={(e) => setNewTradeNote(e.target.value)} />
        </div>
    )
}

export default Comment