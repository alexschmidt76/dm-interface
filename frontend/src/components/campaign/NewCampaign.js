import { useState, useContext } from "react"
import { CurrentUser } from "../../context/CurrentUser"
import { Form, Alert, Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

const NewCampaign = () => {
    const navigate = useNavigate()

    const { currentUser } = useContext(CurrentUser)
    const [errorMessage, setErrorMessage] = useState(null)
    const [newCampaign, setNewCampaign] = useState({
        user_id: currentUser.user_id,
        name: '',
        description: ''
    })
    const [playerNames, setPlayerNames] = useState([''])

    const handleSubmit = async (e) => {
        e.preventDefault()
        // make fetch request
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/campaigns`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            },
            body: JSON.stringify({
                ...newCampaign,
                player_names: playerNames
            })
        })
        const data = await response.json()

        // redirect user to new campaign if successfull
        if (response.status === 200) {
            setErrorMessage(null)
            navigate(`/campaigns/${data.campaign_id}`)
        } else {
            setErrorMessage(data.message)
            console.log(data.error)
        }
    }

    const playerNameSlots = () => (
        // have a slot for each player name
        playerNames.map((name, idx) => (
            <Form.Control
                required
                key={idx}
                type="text"
                placeholder="Enter Player Name..."
                value={playerNames[idx]}
                onChange={ e =>
                    setPlayerNames(
                        // change correct name on change leaving others unchanged
                        playerNames.map((n, i) => {
                            if (i === idx) return e.target.value
                            else return n
                        })
                    )
                }
            />
        ))
    )

    return (
        <div id="new-campaign">
            <h2>New Campaign</h2>
            {
                errorMessage
                ? <Alert variant='danger'>{errorMessage}</Alert>
                : null
            }
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Enter Campaign Name..."
                        value={newCampaign.name}
                        onChange={e => setNewCampaign({...newCampaign, name: e.target.value})}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Enter a Description of the Campaign..."
                        value={newCampaign.description}
                        onChange={e => setNewCampaign({...newCampaign, description: e.target.value})}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Player Names</Form.Label>
                    {playerNameSlots()}
                    <Button onClick={e => {
                        if (playerNames[playerNames.length-1] !== '') setPlayerNames([...playerNames, ''])
                    }}>+</Button>
                    <Button onClick={e=> {
                        if (playerNames.length > 1) setPlayerNames(playerNames.slice(0, playerNames.length-1))
                    }}>-</Button>
                </Form.Group>
                <Button type="submit">Create Campaign</Button>
            </Form>
        </div>
    )
}

export default NewCampaign