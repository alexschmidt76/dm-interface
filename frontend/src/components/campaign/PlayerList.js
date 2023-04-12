import { useState } from "react"
import { Button, Form } from "react-bootstrap"

const PlayerList = (props) => {
    const [playerFormOn, setPlayerFormOn] = useState(false)
    const [newName, setNewName] = useState('')

    const putNewName = async (e) => {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/campaigns/${props.campaignId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ player_names: [...props.player_names, newName] })
        })

        if (response.status === 200) {
            setPlayerFormOn(false)
        }
    }

    return (
        <div id="player-list">
            <h3>Player Names</h3>
            <ul>
                {
                    props.player_names.map((name, i) => (
                        <li key={i}>{name}</li>
                    ))
                }
            </ul>
            {
                playerFormOn
                ? (
                    <Form onSubmit={putNewName}>
                        <Form.Group>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Enter Player Name..."
                                value={newName}
                                onChange={e => setNewName(e.target.value)}
                            />
                        </Form.Group>
                        <Button type="submit">Add Player</Button>
                        <Button onClick={e => setPlayerFormOn(false)}>Cancel</Button>
                    </Form>
                )
                : <Button onClick={e => setPlayerFormOn(true)}>Add Player</Button>
            }
        </div>
    )
}

export default PlayerList