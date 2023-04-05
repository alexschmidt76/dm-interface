import { createContext, useEffect, useState } from "react";

export const CurrentUser = createContext()

function CurrentUserProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null)

    // check if there is a user currently logged in
    useEffect(() => {
        const getLoggedInUser = async () => {
            let res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/authentication/profile`, {
                headers: { 
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            let user = await res.json()
            setCurrentUser(user)
        }
        getLoggedInUser()
    }, [])

    return (
        <CurrentUser.Provider value={{ currentUser, setCurrentUser }}>
            {children}
        </CurrentUser.Provider>
    )
}

export default CurrentUserProvider