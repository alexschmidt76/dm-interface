import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { CurrentUser } from "../../context/CurrentUser"

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
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                })
                const data = await response.json()

                // check errors
                if (response.status === 200) {
                    setFetchError(null)
                    setSession(data)
                } else {
                    data.status = response.status
                    setFetchError(data)
                }
            }
        }
        getSession()
    }, [currentUser, sessionId])

    return (
        <div id='session'>
            <p>example</p>
        </div>
    )
}

export default Session