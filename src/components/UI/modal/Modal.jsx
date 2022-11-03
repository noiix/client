import React, { useContext } from 'react'
import DesignContext from '../../../contexts/DesignContext'
import { IoMdClose } from 'react-icons/io';

function Modal({ children }) {
  const { closeModal, darkMode } = useContext(DesignContext)

  return (
    <div className={ darkMode }>
      <div className='modal-background' onClick={ closeModal }>
        <div className='modal' onClick={ e => e.stopPropagation() }>
             <span className='close icon' onClick={ closeModal }><IoMdClose/></span>
          { children }
        </div>
      </div>
    </div>
  )
}

export default Modal