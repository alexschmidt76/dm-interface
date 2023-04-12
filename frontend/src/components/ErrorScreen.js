
const ErrorScreen = (props) => {
    return (
        <div id="error-screen">
            <h1>ERROR {props.status}</h1>
            <p>{props.message}</p>
        </div>
    )
}

export default ErrorScreen