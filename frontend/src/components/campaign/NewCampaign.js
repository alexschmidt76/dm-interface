import { useState, useContext } from "react"
import { CurrentUser } from "../../context/CurrentUser"
import { Form, Alert, Button } from "react-bootstrap"

const NewCampaign = () => {
    const currentUser = useContext(CurrentUser)
    const [errorMessage, setErrorMessage] = useState(null)
    const [newCampaign, setNewCampaign] = useState({
        user_id: currentUser.user_id,
        name: '',
        description: ''
    })
    const [playerNames, setPlayerNames] = useState([''])

    const handleSubmit = async (e) => {
        e.preventDefault()
        /**
         * @TODO
         * check that there are no empty player names
         * filter out empty names
         * add names to newCampaign object
         * fetch request to make new campaign
         * redirect to campaigns view
         */
    }

    const playerNameSlots = () => (
        // have a slot for each player name
        playerNames.map((name, idx) => (
            <Form.Control
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
                        value={newCampaign.name}
                        onChange={e => setNewCampaign({...newCampaign, description: e.target.value})}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Player Names</Form.Label>
                    {playerNameSlots()}
                    <Button onClick={e => {
                        if (playerNames[playerNames.length-1] !== '') setPlayerNames([...playerNames, ''])
                    }}>+</Button>
                </Form.Group>
            </Form>
        </div>
    )
}

export default NewCampaign