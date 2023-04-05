import { useContext, useState } from 'react'
import { Alert, Button, Form } from 'react-bootstrap'
import { CurrentUser } from '../../context/CurrentUser'

const LogIn = () => {
    const { setCurrentUser } = useContext(CurrentUser)
    const [errorMessage, setErrorMessage] = useState(null)
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/authentication/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        })
        const data = await response.json()

        if (response.status === 200) {
            setErrorMessage(null)
            setCurrentUser(data.user)
            localStorage.setItem('token', data.token)
        } else {
            setErrorMessage(data.message)
        }
    }

    return (
        <div id="login-form">
            <h2>Log In</h2>
            {
                errorMessage
                ? <Alert variant='danger'>{errorMessage}</Alert>
                : null
            }
            <Form onSubmit={handleSubmit}>
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
                        placeholder='Enter Password...'
                        value={credentials.password}
                        onChange={e => setCredentials({ ...credentials, password: e.target.value })}
                    />
                </Form.Group>
                <Button variant='primary' type='submit'>Log In</Button>
            </Form>
        </div>
    )
}

export default LogIn