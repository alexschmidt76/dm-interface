// npm imports
import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { CurrentUser } from "../../context/CurrentUser"

// react component imports
import PlayerList from "./PlayerList"
import SessionList from "./SessionList"
import ErrorScreen from "../ErrorScreen"

const Campaign = () => {
    const { campaignId } = useParams()
    const { currentUser } = useContext(CurrentUser)
    const [campaign, setCampaign] = useState(null)
    const [fetchError, setFetchError] = useState(null)

    useEffect(() => {
        const getCampaign = async () => {
            if (currentUser) {
                // find campaign
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/campaigns/${campaignId}`, {
                    headers: { 
                        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                    }
                })
                const data = await response.json()

                // check errors
                if (response.status === 200) {
                    setFetchError(null)
                    setCampaign(data)
                } else {
                    data.status = response.status
                    setFetchError(data)
                }
            }
        }
        getCampaign()
    }, [currentUser, campaignId])

    if (fetchError) {
        return <ErrorScreen status={fetchError.status} message={fetchError.message} />
    }

    if (!currentUser || !campaign) {
        return <p>Loading...</p>
    }

    return (
        <div id="campaign">
            <h1>{campaign.name}</h1>
            <hr />
            <PlayerList player_names={campaign.player_names} campaignId={campaignId}/>
            <SessionList sessions={campaign.sessions} player_names={campaign.player_names} campaignId={campaignId} />
        </div>
    )
}

export default Campaign