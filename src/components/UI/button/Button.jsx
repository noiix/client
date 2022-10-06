import React from 'react'

function Button({type="btn", name, onClick={}}) {
  return (
    <button className={`${type}`} onClick={onClick}>{name}</button>
  )
}

export default Button