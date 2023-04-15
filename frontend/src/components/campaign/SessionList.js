import { useContext, useState } from "react"
import { Alert, Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { CurrentUser } from "../../context/CurrentUser"

const SessionList = (props) => {
    const navigate = useNavigate()
    const { currentUser } = useContext(CurrentUser)
    const [fetchError, setFetchError] = useState(null)

    const createSession = async () => {
        console.log(props)
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/sessions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            },
            body: JSON.stringify({
                campaign_id: Number(props.campaignId),
                user_id: currentUser.user_id,
                api_monsters: [],
                notes: '',
                initiatives: props.player_names.map(player => (
                    {
                        name: player,
                        roll: 0
                    }
                ))
            })
        })
        const data = await response.json()
        console.log(data)

        if (response.status === 200) {
            setFetchError(null)
            navigate(`/sessions/${data.session_id}`)
        } else {
            setFetchError(data)
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