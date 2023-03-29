import { createContext, useEffect, useState } from "react";

export const CurrentUser = createContext()

function CurrentUserProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null)

    // check if there is a user currently logged in
    useEffect(() => {
        fetch()
    })

    return (
        <CurrentUser.Provider value={{ currentUser, setCurrentUser }}>
            {children}
        </CurrentUser.Provider>
    )
}

export default CurrentUserProvider