import React, { useContext } from 'react'
import DesignContext from '../../../contexts/DesignContext'

function Modal({children}) {
  const {closeModal} = useContext(DesignContext)

  return (
      <div className='modal-background' onClick={closeModal}>
        <div className='modal' onClick={e => e.stopPropagation()}>
          {children}
        </div>
      </div>
  )
}

export default Modal