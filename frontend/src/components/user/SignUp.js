// context
import { useContext, useState } from "react"
import { CurrentUser } from "../../context/CurrentUser"
// components
import { Form, Button, Alert } from "react-bootstrap"

const SignUp = () => {
    const { setCurrentUser } = useContext(CurrentUser)
    const [errorMessage, setErrorMessage] = useState(null)
    const [confirmPassword, setConfirmPassword] = useState('')
    const [credentials, setCredentials] = useState({
        name: '',
        email: '',
        password: ''
    })
    const [stayLogged, setStayLogged] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()

        // confirm password matches
        if (credentials.password === confirmPassword) {
            // attempt to create a user with provided credentials
            const response = await fetch (`${process.env.REACT_APP_BACKEND_URL}/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credentials)
            })
            const data = await response.json()
            // log user into new account if successfull
            if (response.status === 200) {
                setErrorMessage(null)
                setCurrentUser(data.user)
                sessionStorage.setItem('token', data.token)
                if (stayLogged) {
                    localStorage.setItem('token', data.token)
                }
            } else {
                setErrorMessage(data.message)
            }
        } else {
            setErrorMessage('Passwords don\'t match.')
        }

        
    }

    return (
        <div id='signup-form'>
            <h2>Sign Up</h2>
            {
                errorMessage
                ? <Alert variant='danger'>{errorMessage}</Alert>
                : null
            }
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control 
                        required
                        type='text'
                        placeholder='Create Username...' 
                        value={credentials.name}
                        onChange={e => setCredentials({ ...credentials, name: e.target.value })}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control 
                        required
                        type='text'
                        placeholder='Enter Email...' 
                        value={credentials.email}
                        onChange={e => setCredentials({ ...credentials, email: e.target.value })}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        required
                        type='password'
                        placeholder='Create Password...'
                        value={credentials.password}
                        onChange={e => setCredentials({ ...credentials, password: e.target.value })}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        required
                        type='password'
                        placeholder='Confirm Password...'
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                    />
                </Form.Group>
                <Form.Check
                    type='checkbox'
                    value={stayLogged}
                    label='Stay Logged In'
                    onChange={e => setStayLogged(!stayLogged)}
                />
                <Button variant='primary' type='submit'>Sign Up and Log In</Button>
            </Form>
        </div>
    )
}

export default SignUp