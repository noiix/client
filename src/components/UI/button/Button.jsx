import React, { useContext } from 'react'
import DesignContext from '../../../contexts/DesignContext';


function Button({ type = "btn", name, onClick = {}, path }) {

  const { darkMode } = useContext(DesignContext)

  return (
    <div className={ `${darkMode} btn-container`  }>
      <button className={ `${type}` } onClick={ onClick } path={path}>{ name }</button>
    </div>
  )
}

export default Button