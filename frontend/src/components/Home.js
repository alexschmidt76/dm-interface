import React, { useContext, useState } from "react";
import { CurrentUser } from "../context/CurrentUser";
import LogIn from './LogIn'
import SignUp from './SignUp'

const Home = () => {
    const { currentUser } = useContext(CurrentUser)
    const [loginFormOn, setLoginFormOn] = useState(true)

    return (
        <div id='home'>
            <div id="info-home">
                <h1>Welcome to the DM Interface!</h1>
                <p><b>With the DM Interface, you can easily track multiple campaigns for DnD 5e</b></p>
                <p>Use our simple interface to create sesssions, track initiative, import monter stats from 5e, and more!</p>
            </div>
            <div id="user-home">
                {
                    currentUser
                    ? <div id="user-info-home"></div>
                    : loginFormOn ? <LogIn /> : <SignUp />
                }
            </div>
        </div>
    )
}

export default Home