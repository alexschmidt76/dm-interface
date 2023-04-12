import { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { CurrentUser } from "../../context/CurrentUser";

const Campaigns = () => {
    const navigate = useNavigate()

    const { currentUser } = useContext(CurrentUser)
    const [campaigns, setCampaigns] = useState([])
    const [fetchError, setFetchError] = useState(false)

    useEffect(() => {
        if (currentUser) {
            fetch(`${process.env.REACT_APP_BACKEND_URL}/users/${currentUser.user_id}/campaigns`)
                .then(res => res.json())
                .then(data => setCampaigns(data.campaigns))
                .catch(error => setFetchError(e => !e))
        }
    }, [fetchError, currentUser])

    if (!currentUser) {
        return <p>Loading...</p>
    }

    return (
        <div id="campaigns">
            <ul id="campaign-list">
                {
                    campaigns === null
                        ? <p>Loading...</p>
                        : campaigns.length > 0
                            ? campaigns.map(campaign => (
                                <li key={campaign.campaign_id}>
                                    <a href="" onClick={e => navigate(`/campaigns/${campaign.campaign_id}`)}><b>{campaign.name}</b></a>
                                </li>
                            ))
                            : <p>You have no saved campaigns!</p>
                }
            </ul>
            <Button onClick={() => navigate('/campaigns/new')}>New Campaign</Button>
        </div>
    )
}

export default Campaigns