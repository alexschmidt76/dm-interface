import React, { useContext, useState } from "react";
import { ButtonGroup, ToggleButton } from 'react-bootstrap'
import { CurrentUser } from "../context/CurrentUser";
import LogIn from './user/LogIn'
import SignUp from './user/SignUp'

const Home = () => {
    const { currentUser } = useContext(CurrentUser)
    const [loginCardOn, setLoginCardOn] = useState(true)

    const toggleLoginCard = (e) => setLoginCardOn(!loginCardOn)

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
                    ? (
                        <div id="user-info-home">
                            <p><b>Welcome back {currentUser.name}!</b></p>
                        </div>
                    )
                    : (
                        <div id="login-actions">
                            {
                                loginCardOn
                                ? <LogIn />
                                : <SignUp />
                            }
                            <ButtonGroup>
                                <ToggleButton
                                    className="mb-2"
                                    type="checkbox"
                                    variant="outline-light"
                                    checked={loginCardOn}
                                    onChange={toggleLoginCard}
                                >
                                    Log In
                                </ToggleButton>
                                <ToggleButton
                                    className="mb-2"
                                    type="checkbox"
                                    variant="outline-light"
                                    checked={!loginCardOn}
                                    onChange={toggleLoginCard}
                                >
                                    Sign Up
                                </ToggleButton>
                            </ButtonGroup>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default Home