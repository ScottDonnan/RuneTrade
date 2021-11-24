import {useState} from 'react'

function FilterFields({setSelectedRegion, setSelectedType, setSelectedSet, setSelectedRarity}) {


    // function handleChange(e) {
    //     console.log(e.target.value)
    // }

    return(
        
        <div>

            {/* <p>
                <button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                    Region
                </button>
            </p>
            <div class="collapse" id="collapseExample">
                <div class="card card-body">
                    <div class="list-group">
                        <div class="btn-group" role="group" aria-label="Basic checkbox toggle button group">
                            <input type="checkbox" class="btn-check" id="btncheck1" autocomplete="off" value="Bilgewater" onChange={handleChange} />
                            <label class="btn btn-outline-primary" for="btncheck1">Bilgewater</label>

                            <input type="checkbox" class="btn-check" id="btncheck2" autocomplete="off" />
                            <label class="btn btn-outline-primary" for="btncheck2">Ionia</label>

                            <input type="checkbox" class="btn-check" id="btncheck3" autocomplete="off" />
                            <label class="btn btn-outline-primary" for="btncheck3">Demacia</label>
                        </div>
                    </div>
                </div>
            </div> */}
            
            <div class="dropdown">
                <select class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false" onChange={(e) => setSelectedRegion(e.target.value)}>
                    <option class="dropdown-item" value="">All</option>
                    <option class="dropdown-item" value="Ionia">Ionia</option>
                    <option class="dropdown-item" value="Bilgewater">Bilgewater</option>
                    <option class="dropdown-item" value="Demacia">Demacia</option>
                </select>
            </div>


            <div class="dropdown">
                <select class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false" onChange={(e) => setSelectedType(e.target.value)}>
                    <option class="dropdown-item" value="">All</option>
                    <option class="dropdown-item" value="Unit">Unit</option>
                    <option class="dropdown-item" value="Spell">Spell</option>
                    <option class="dropdown-item" value="Landmark">Landmark</option>
                </select>
            </div>


            <div class="dropdown">
                <select class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false" onChange={(e) => setSelectedSet(e.target.value)}>
                    <option class="dropdown-item" value="">All</option>
                    <option class="dropdown-item" value="Set1">Set1</option>
                    <option class="dropdown-item" value="Set2">Set2</option>
                    <option class="dropdown-item" value="Set3">Set3</option>
                    <option class="dropdown-item" value="Set4">Set4</option>
                </select>
            </div>

            <div class="dropdown">
                <select class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false" onChange={(e) => setSelectedRarity(e.target.value)}>
                    <option class="dropdown-item" value="">All</option>
                    <option class="dropdown-item" value="Common">Common</option>
                    <option class="dropdown-item" value="Rare">Rare</option>
                    <option class="dropdown-item" value="Epic">Epic</option>
                    <option class="dropdown-item" value="Champion">Champion</option>
                </select>
            </div>

        </div>
    )
}

export default FilterFields