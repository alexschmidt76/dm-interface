import { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import { CurrentUser } from "../../context/CurrentUser";

const Campaigns = () => {
    const { currentUser } = useContext(CurrentUser)
    const [campaigns, setCampaigns] = useState([])
    const [fetchError, setFetchError] = useState(null)

    useEffect(() => {
        if (currentUser) {
            fetch(`${process.env.REACT_APP_BACKEND_URL}/users/${currentUser.user_id}/campaigns`)
            .then(res => res.json())
            .then(data => setCampaigns(data))
            .catch(error => setFetchError(e => !e))
        }
    }, [fetchError, currentUser])

    const handleClick = (e) => {
        e.preventDefault()

    }

    if (!currentUser) {
        return (
            <div id="campaigns-error">
                <p>Please <a href="/">log in/sign up</a> to view your saved campaigns.</p>
            </div>
        )
    }

    return (
        <div id="campaigns">
            <ul id="campaign-list">
                {
                    campaigns.map(campaign => (
                        <li key={campaign.campaign_id}>
                            <a href="#" onClick={e => Navigate(`/campaigns/${campaign.campaign_id}`)}><b>{campaign.name}</b></a>
                        </li>
                    ))
                }
            </ul>
            <Button onClick={handleClick}>New Campaign</Button>
        </div>
    )
}

export default Campaigns