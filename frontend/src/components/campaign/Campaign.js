import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { CurrentUser } from "../../context/CurrentUser"
import { Button, Form } from "react-bootstrap"

const Campaign = () => {
    const navigate = useNavigate()

    const { campaignId } = useParams()
    const { currentUser } = useContext(CurrentUser)
    const [campaign, setCampaign] = useState(null)
    const [fetchError, setFetchError] = useState(false)
    const [playerFormOn, setPlayerFormOn] = useState(false)
    const [newName, setNewName] = useState('')

    useEffect(() => {
        if (currentUser) {
            fetch(`${process.env.REACT_APP_BACKEND_URL}/users/${currentUser.user_id}/campaigns/${campaignId}`)
                .then(res => res.json())
                .then(data => setCampaign(data))
                .catch(error => setFetchError(e => !e))
        }
    }, [currentUser, campaignId, fetchError])

    const handleSubmit = (e) => {
        e.preventDefault()


    }

    if (!currentUser) {
        return (
            <div id="campaign-error">
                <p>Please <a href="/">log in/sign up</a> to view your saved campaigns.</p>
            </div>
        )
    }

    if (!campaign) {
        return (
            <div id="error">
                <p>ERROR</p>
            </div>
        )
    }

    return (
        <div id="campaign">
            <h1>{campaign.name}</h1>
            <hr />
            <div id="player-list">
                <h3>Player Names</h3>
                <ul>
                    {
                        campaign.player_names.map((name, i) => (
                            <li key={i}>{name}</li>
                        ))
                    }
                </ul>
                {
                    playerFormOn
                    ? (
                        <Form onSubmit={handleSubmit}>
                            <Form.Group>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Enter Player Name..."
                                    value={newName}
                                    onChange={e => setNewName(e.target.value)}
                                />
                            </Form.Group>
                            <Button type="submit">Add Player</Button>
                            <Button onClick={e => setPlayerFormOn(false)}>Cancel</Button>
                        </Form>
                    )
                    : <Button onClick={e => setPlayerFormOn(true)}>Add Player</Button>
                }
            </div>
            <div id="session-list">
                <ul>
                    {
                        campaign.sessions.map((session, i) => (
                            <li key={i}>
                                <a href="" onClick={navigate(`/campaigns/${campaignId}/${session.session_id}`)}><b>Session {i+1}</b></a>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}

export default Campaign