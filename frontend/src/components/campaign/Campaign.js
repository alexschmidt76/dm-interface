import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { CurrentUser } from "../../context/CurrentUser"
import PlayerNames from "./PlayerNames"

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
            fetch(`${process.env.REACT_APP_BACKEND_URL}/campaigns/${campaignId}`, {
                headers: { 
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
                .then(res => res.json())
                .then(data => setCampaign(data))
                .catch(error => setFetchError(e => !e))
        }
    }, [currentUser, campaignId, fetchError])

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
            <PlayerNames player_names={campaign.player_names} campaignId={campaignId}/>
            <div id="session-list">
                <ul>
                    {
                        campaign.sessions.length > 0
                        ? campaign.sessions.map((session, i) => (
                            <li key={i}>
                                <a href="" onClick={navigate(`/campaigns/${campaignId}/${session.session_id}`)}><b>Session {i+1}</b></a>
                            </li>
                        ))
                        : <p>You don't have any saved sessions!</p>
                    }
                </ul>
            </div>
        </div>
    )
}

export default Campaign