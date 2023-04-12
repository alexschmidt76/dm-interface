import { useState } from "react"
import { Alert, Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

const SessionList = (props) => {
    const navigate = useNavigate()
    const [fetchError, setFetchError] = useState(null)

    const createSession = async () => {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/sessions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: {
                campaign_id: props.campaignId
            }
        })
        const newSession = await response.json()

        if (response.status === 200) {
            setFetchError(null)
            navigate(`/sessions/${newSession.session_id}`)
        } else {
            setFetchError(newSession)
        }
    }

    return (
        <div id="session-list">
            <ul>
                {
                    props.sessions.length > 0
                    ? props.sessions.map((session, i) => (
                        <li key={i}>
                            <a href={`/sessions/${session.session_id}`}><b>Session {i+1}</b></a>
                        </li>
                    ))
                    : <p>You don't have any saved sessions!</p>
                }
            </ul>
            {
                fetchError
                    ? <Alert>{fetchError.message}</Alert>
                    : null
            }
            <Button onClick={createSession}>Start a new Session</Button>
        </div>
    )
}

export default SessionList