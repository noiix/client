import Alert from './Alert'

const AlertContainer = ({type, title}) => {
    return (
        <div className='alert-container'>
            <Alert type={type} title={title}/>    
        </div>
    )
}

export default AlertContainer;