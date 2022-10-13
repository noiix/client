import React from "react";
import { useContext, useState } from 'react';
import {FaLongArrowAltRight} from 'react-icons/fa'
import DataContext from "../../contexts/DataContext";
import DesignContext from '../../contexts/DesignContext';

function Search({action}) {

  const {closeModal} = useContext(DesignContext)
  const {inputSearchHandler} = useContext(DataContext);


  const toggleSearch = () => {
    action(false);
  }

  return (
<div className="search-background" onClick={closeModal}>
    <div className="search-bar">
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