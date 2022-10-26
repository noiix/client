import React, { useContext } from 'react'
import DesignContext from '../../../contexts/DesignContext';


function Button({ type = "btn", name, onClick = {} }) {

  const { darkMode } = useContext(DesignContext)

  return (
    <div className={ darkMode }>
      <button className={ `${type}` } onClick={ onClick }>{ name }</button>
    </div>
  )
}

export default Button