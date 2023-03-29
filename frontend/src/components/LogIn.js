import { useContext, useState } from 'react'
import { Button } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import { CurrentUser } from '../context/CurrentUser'

const LogIn = () => {
    const { setCurrentUser } = useContext(CurrentUser)
    const [errorMessage, setErrorMessage] = useState(null)
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await fetch(`${process.env.REACT_APP_BACKENDURL}/authentication/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        })
        const data = await response.json()

        if (response.status === 200) {
            setCurrentUser(data.user)
        } else {
            setErrorMessage(data.message)
        }
    }

    return (
        <div id="login-form">
            <h2>Log In</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control 
                        required
                        type='text'
                        placeholder='Enter Email...' 
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        required
                        type='password'
                        placeholder='Enter Password...'
                    />
                </Form.Group>
                <Button variant='primary' type='submit'>Log In</Button>
            </Form>
        </div>
    )
}

export default LogIn