import React, { useContext } from 'react'
import DesignContext from '../../../contexts/DesignContext'

function Modal({ children }) {
  const { closeModal, darkMode } = useContext(DesignContext)

  return (
    <div className={ darkMode }>
      <div className='modal-background' onClick={ closeModal }>
        <div className='modal' onClick={ e => e.stopPropagation() }>
          { children }
        </div>
      </div>
    </div>
  )
}

export default Modal