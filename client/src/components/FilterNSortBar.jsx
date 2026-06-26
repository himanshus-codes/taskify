
export default function FilterNSortBar({selectedSort, setSort,selectedPriority, setPriority}){

    function handleSort(e){
        setSort(e.target.value)
    }
    function handlePriority(e){
        setPriority(e.target.value)
    }

    return<>
       <div id="topBar">
        
            <div className="topDiv">
                <label htmlFor="sort">Sort</label>
                <select id="sort" value={selectedSort} onChange={handleSort}>
                    <option value="newest">Newest</option>
                    <option value="oldest">Oldest</option>
                </select>
            </div>

            <div className='topDiv'>
                <label htmlFor="filter">Priority</label>

                <select id="filter" value={selectedPriority} onChange={handlePriority}>
                    <option value="none">ALL</option>
                    <option value="low">Only Low</option>
                    <option value="medium">Only Medium</option>
                    <option value="high">Only High</option>
                </select>
            </div>
  
        </div>
    </>
}


