import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { CurrentUser } from "../../context/CurrentUser"
import InitiativeTracker from "./InitiativeTracker"

const Session = () => {
    const { sessionId } = useParams()
    const { currentUser } = useContext(CurrentUser)
    const [fetchError, setFetchError] = useState(null)
    const [session, setSession] = useState(null)

    useEffect(() => {
        const getSession = async () => {
            if (currentUser) {
                // find session
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/sessions/${sessionId}`, {
                    headers: { 
                        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                    }
                })
                let data = await response.json()

                // check errors
                if (response.status === 200) {
                    setFetchError(null)
                    // get initiatives object
                    data.initiatives = JSON.parse(data.initiatives)
                    setSession(data)
                } else {
                    data.status = response.status
                    setFetchError(data)
                }
            }
        }
        getSession()
    }, [currentUser, sessionId])

    if (!session) {
        return <p>Loading...</p>
    }

    return (
        <div id='session'>
            <InitiativeTracker initiatives={session.initiatives} />
        </div>
    )
}

export default Session