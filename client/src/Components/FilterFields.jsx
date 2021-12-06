function FilterFields({selectedRegion, setSelectedRegion, setSelectedType, setSelectedSet, setSelectedRarity}) {
    const defaultArray = ["Bandle City", "Bilgewater", "Demacia", "Freljord", "Ionia", "Noxus", "Piltover & Zaun", "Shadow Isles", "Shurima", "Targon"]
    
    function handleChange(newRegion) {
        if (selectedRegion.length === defaultArray.length) {
            setSelectedRegion([newRegion])
        }
        else if (selectedRegion.includes(newRegion)) {
            const newArray = selectedRegion.filter(region => region !== newRegion)
            if (newArray.length === 0) {
                setSelectedRegion(defaultArray)
            } else {
                setSelectedRegion(newArray)
            }
        }
        else {
            setSelectedRegion([...selectedRegion, newRegion])
        }
    }

    return(
            <div className="filters">
                <div className="drop-downs">
                    <div class="dropdown">
                        <select class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false" onChange={(e) => setSelectedType(e.target.value)}>
                            <option class="dropdown-item" value="">All Card Types</option>
                            <option class="dropdown-item" value="Unit">Unit</option>
                            <option class="dropdown-item" value="Spell">Spell</option>
                            <option class="dropdown-item" value="Landmark">Landmark</option>
                        </select>
                    </div>

                    <div class="dropdown">
                        <select class="btn btn-primary dropdown-toggle " type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false" onChange={(e) => setSelectedSet(e.target.value)}>
                            <option class="dropdown-item" value="">All Sets</option>
                            <option class="dropdown-item" value="Set1">Set1</option>
                            <option class="dropdown-item" value="Set2">Set2</option>
                            <option class="dropdown-item" value="Set3">Set3</option>
                            <option class="dropdown-item" value="Set4">Set4</option>
                        </select>
                    </div>

                    <div class="dropdown">
                        <select class="btn btn-primary dropdown-toggle " type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false" onChange={(e) => setSelectedRarity(e.target.value)}>
                            <option class="dropdown-item" value="">All Rarity</option>
                            <option class="dropdown-item" value="Common">Common</option>
                            <option class="dropdown-item" value="Rare">Rare</option>
                            <option class="dropdown-item" value="Epic">Epic</option>
                            <option class="dropdown-item" value="Champion">Champion</option>
                        </select>
                    </div>
                </div>
                    <div className="regions">
                        <div class="btn-group" role="group" aria-label="Basic checkbox toggle button group">
                            <input type="checkbox" class="btn-check" id="btncheck1" autocomplete="off" value="Bandle City" onChange={(e) => handleChange(e.target.value)} />
                            <label class="btn btn-outline-primary" for="btncheck1">Bandle City</label>

                            <input type="checkbox" class="btn-check" id="btncheck2" autocomplete="off" value="Bilgewater" onChange={(e) => handleChange(e.target.value)} />
                            <label class="btn btn-outline-primary" for="btncheck2">Bilgewater</label>

                            <input type="checkbox" class="btn-check" id="btncheck3" autocomplete="off" value="Demacia" onChange={(e) => handleChange(e.target.value)} />
                            <label class="btn btn-outline-primary" for="btncheck3">Demacia</label>

                            <input type="checkbox" class="btn-check" id="btncheck4" autocomplete="off" value="Freljord" onChange={(e) => handleChange(e.target.value)} />
                            <label class="btn btn-outline-primary" for="btncheck4">Freljord</label>

                            <input type="checkbox" class="btn-check" id="btncheck5" autocomplete="off" value="Ionia" onChange={(e) => handleChange(e.target.value)} />
                            <label class="btn btn-outline-primary" for="btncheck5">Ionia</label>

                            <input type="checkbox" class="btn-check" id="btncheck6" autocomplete="off" value="Noxus" onChange={(e) => handleChange(e.target.value)} />
                            <label class="btn btn-outline-primary" for="btncheck6">Noxus</label>

                            <input type="checkbox" class="btn-check" id="btncheck7" autocomplete="off" value="Piltover & Zaun" onChange={(e) => handleChange(e.target.value)} />
                            <label class="btn btn-outline-primary" for="btncheck7">Piltover & Zaun</label>

                            <input type="checkbox" class="btn-check" id="btncheck8" autocomplete="off" value="Shadow Isles" onChange={(e) => handleChange(e.target.value)} />
                            <label class="btn btn-outline-primary" for="btncheck8">Shadow Isles</label>

                            <input type="checkbox" class="btn-check" id="btncheck9" autocomplete="off" value="Shurima" onChange={(e) => handleChange(e.target.value)} />
                            <label class="btn btn-outline-primary" for="btncheck9">Shurima</label>

                            <input type="checkbox" class="btn-check" id="btncheck10" autocomplete="off" value="Targon" onChange={(e) => handleChange(e.target.value)} />
                            <label class="btn btn-outline-primary" for="btncheck10">Targon</label>
                        </div>
                    </div>
            </div>
    )
}

export default FilterFields