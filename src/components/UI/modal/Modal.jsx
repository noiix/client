import React, { useContext } from 'react'
import DesignContext from '../../../contexts/DesignContext'

function Modal({children}) {
  const {closeModal, displayModal} = useContext(DesignContext)

  return (
    (displayModal &&
      <div className='modal-background' onClick={closeModal}>
        <div className='modal' onClick={e => e.stopPropagation()}>
          {children}
        </div>
      </div>
    )
  )
}

export default Modal