import React from "react";
import { useContext, useState } from 'react';
import {FaLongArrowAltRight} from 'react-icons/fa'
import DataContext from "../../contexts/DataContext";
import DesignContext from "../../contexts/DesignContext";

function Search() {

  const {inputSearchHandler} = useContext(DataContext);
  const {displaySearch, setDisplaySearch} = useContext(DataContext);
  
  const toggleSearch = () => {
    setDisplaySearch(false);
  }


  return (
<div className='search-background' onClick={toggleSearch}>
    <div className="search-bar" onClick={e => e.stopPropagation()}>
      <form>
        <label>
            SEARCH FOR ...
        </label>
        <input
            type="text"
            id="search"
            placeholder="anything"
            name="search" 
            onChange={inputSearchHandler}
        />
        {/* <span type="submit"><FaLongArrowAltRight /></span> */}
    </form>
    </div>
  </div>
  )
}

export default Search