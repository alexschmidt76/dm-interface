// npm imports
import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { CurrentUser } from "../../context/CurrentUser"

// react component imports
import PlayerNames from "./PlayerNames"
import SessionList from "./SessionList"

const Campaign = () => {
    const { campaignId } = useParams()
    const { currentUser } = useContext(CurrentUser)
    const [campaign, setCampaign] = useState(null)
    const [fetchError, setFetchError] = useState(false)

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
            <SessionList sessions={campaign.sessions} campaignId={campaignId} />
        </div>
    )
}

export default Campaign