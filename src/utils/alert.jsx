import "../styles/alert-style.scss";


export const Alert = ({ message, type = "info" }) => {
    return (
        <div className={`custom-alert ${type}`} >
            {message}

        </div>
    );
};

export default Alert;