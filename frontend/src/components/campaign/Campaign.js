import { useContext, useEffect, useState } from "react"
import { Navigate, useParams } from "react-router-dom"
import { CurrentUser } from "../../context/CurrentUser"
import { Button } from "react-bootstrap"

const Campaign = () => {
    const { campaignId } = useParams()
    const { currentUser } = useContext(CurrentUser)
    const [campaign, setCampaign] = useState(null)
    const [fetchError, setFetchError] = useState(false)

    useEffect(() => {
        if (currentUser) {
            fetch(`${process.env.REACT_APP_BACKEND_URL}/users/${currentUser.user_id}/campaigns/${campaignId}`)
                .then(res => res.json())
                .then(data => setCampaign(data))
                .catch(error => setFetchError(e => !e))
        }
        console.log(campaign)
    }, [currentUser, campaignId, fetchError])

    if (!currentUser) {
        return (
            <div id="campaign-error">
                <p>Please <a href="/">log in/sign up</a> to view your saved campaigns.</p>
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
                <Button onClick={null}>Add Player</Button>
            </div>
            <div id="session-list">
                <ul>
                    {
                        campaign.sessions.map((session, i) => (
                            <li key={i}>
                                <a href="#" onClick={Navigate(`/campaigns/${campaignId}/${session.session_id}`)}><b>Session {i+1}</b></a>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}

export default Campaign