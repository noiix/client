import React from "react";


function Search() {
  return (
    <div>
      <form>
        <label>
            SEARCH FOR ...
        </label>
        <input
            type="text"
            id="search"
            placeholder="Search for ..."
            name="search" 
        />
        <button type="submit">SEARCH</button>
    </form>
    </div>
  )
}

export default Search