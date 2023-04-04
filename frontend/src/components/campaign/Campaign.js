import { useContext, useEffect } from "react"
import { useParams } from "react-router-dom"
import { CurrentUser } from "../../context/CurrentUser"

const Campaign = () => {
    const { campaignId } = useParams()
    const { currentUser } = useContext(CurrentUser)

    useEffect({
        if (currentUser) {
            fetch(`${process.env.REACT_APP_BACKEND_URL}/`)
        }
    }, [currentUser, campaignId])
}