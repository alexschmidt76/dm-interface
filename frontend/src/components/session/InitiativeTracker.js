import { useEffect } from "react"

const InitiativeTracker = (props) => {

    useEffect(() => {
        sortInitiatives()
    }, [props.initiatives])

    const sortInitiatives = () => {
        for (let i = 1; i < props.initiatives.length; i++) {
            const cur = props.initiatives[i]
            let j = i - 1
            while (j >= 0 && props.initiatives[j].roll < cur.roll) {
                props.initiatives[j+1] = props.initiatives[j]
                j--
            }
            props.initiatives[j+1] = cur
        }
    }
    
    return (
        <div id="inititatives">
            <ul>
                {
                    props.initiatives.map((player, idx) => {
                        return (
                            <li key={`init-name-${idx}`}>{player.name} roll:{player.roll}</li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default InitiativeTracker