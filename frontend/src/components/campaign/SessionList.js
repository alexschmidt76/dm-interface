
const SessionList = (props) => {
    return (
        <div id="session-list">
            <ul>
                {
                    props.sessions.length > 0
                    ? props.sessions.map((session, i) => (
                        <li key={i}>
                            <a href={`/campaigns/${props.campaignId}/${session.session_id}`}><b>Session {i+1}</b></a>
                        </li>
                    ))
                    : <p>You don't have any saved sessions!</p>
                }
            </ul>
        </div>
    )
}

export default SessionList