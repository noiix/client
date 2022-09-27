const SuccessAlert = ({title, type}) => {

    return (
        <div className={`alert ${type}`}>
            <p>{title}</p>
        </div>
    )
}

export default SuccessAlert