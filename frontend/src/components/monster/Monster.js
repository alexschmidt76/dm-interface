import React, { useEffect, useState } from 'react'

const Monster = (props) => {

    const [monster, setMonster] = useState(null)
    const [fetchError, setFetchError] = useState(false)

    useEffect(() => {
        // get monster info from api
        console.log(props.monsterIndex)
        fetch(`https://www.dnd5eapi.co/api/monsters/${props.monsterIndex}`)
            .then(res => res.json())
            .then(resData => setMonster(resData))
            .catch(error => setFetchError(e => !e))
    }, [fetchError, props.monsterIndex])

    // build armor type string
    const armorTypes = (ac) => {
        let armorString = ''
        // build armor type string based on type provided
        switch (ac.type) {
            case 'dex':
                armorString = 'Dex'
                break
            case 'natural':
                armorString = 'Natural'
                break
            case 'armor':
                // armor type can have multiple sources of ac
                for (let i = 0; i < ac.armor.length; i++) {
                    armorString += ac.armor[i].name
                    if (i !== ac.armor.length - 1) armorString += ', '
                }
                break
            case 'spell':
                armorString = ac.spell.name
                break
            case 'condition':
                armorString = ac.condition.name
                break
            default:
                return ''
            }
        return '(' + armorString + ')'
    }

    // build speed string
    const speed = (speed) => {
        let speedString = ''
        // walking speed should always be first
        if (speed.walk) {
        speedString += speed.walk
        } else {
            speedString += '0 ft.'
        }
        for (const key in speed) {
            if (key !== 'walk') {
                speedString += `, ${key} ${speed[key]}`
            }
        }
        return speedString
    }

    // generate ability modifier from score
    const abilityModifier = (score) => {
        let modifier = Math.floor((score - 10) / 2)
        return (
            modifier >= 0 
            ? '+' + modifier
            : modifier
        )
    }

    // generate save and skill proficiencies
    const proficiencies = (profs) => {
        let saveString = ''
        let skillString = ''
        profs.forEach((prof) => {
            if (prof.proficiency.index.split('-')[0] === 'saving') {
                if (saveString !== '') {
                    saveString += ', '
                }
                saveString += `${prof.proficiency.name.slice(-3)} ${(prof.value > 0 ? '+' : null)}${prof.value}`
            } else {
                if (skillString !== '') {
                    skillString += ', '
                }
                skillString += `${prof.proficiency.name.slice(7)} ${(prof.value > 0 ? '+' : null)}${prof.value}`
            }
        })
        return (
            <div>
                {saveString === '' ? null : <p><b>Saves</b> {saveString}</p>}
                {skillString === '' ? null : <p><b>Skils</b> {skillString}</p>}
            </div>
        )
    }

    // build list of senses
    const senses = (s) => {
        let senseString = ''
        for (const key in s) {
            if (senseString !== '') {
                senseString += ', '
            }
            if (key === 'passive_perception') {
                senseString += `passive perception ${s[key]}`
            } else {
                senseString += `${key} ${s[key]}`
            }
        }
        return senseString
    }

    return (
        monster === undefined || monster === null || monster.error ? <h1>ERROR</h1> :
        (
            <div>
                <h1>{monster.name}</h1>
                <p>{monster.size} {monster.type} {monster.alignment}</p>
                <hr />
                <p><b>Armor Class</b> {monster.armor_class[0].value} {armorTypes(monster.armor_class[0])}</p>
                <p><b>Hit Points</b> {monster.hit_points} ({monster.hit_points_roll})</p>
                <p><b>Speed</b> {speed(monster.speed)}</p>
                <hr />
                <p><b>STR</b> {monster.strength} ({abilityModifier(monster.strength)})</p>
                <p><b>DEX</b> {monster.dexterity} ({abilityModifier(monster.dexterity)})</p>
                <p><b>CON</b> {monster.constitution} ({abilityModifier(monster.constitution)})</p>
                <p><b>WIS</b> {monster.wisdom} ({abilityModifier(monster.wisdom)})</p>
                <p><b>INT</b> {monster.intelligence} ({abilityModifier(monster.intelligence)})</p>
                <p><b>CHA</b> {monster.charisma} ({abilityModifier(monster.charisma)})</p>
                <hr />
                {monster.proficiencies ? proficiencies(monster.proficiencies) : null}
                {
                    monster.damage_resistances && monster.damage_resistances.length > 0 
                    ? <p><b>Damage Resistances</b> {monster.damage_resistances.map((e, i) => i === 0 ? e : `, ${e}`)}</p> 
                    : null
                }
                {
                    monster.damage_immunities && monster.damage_immunities.length > 0 
                    ? <p><b>Damage Immunities</b> {monster.damage_immunities.map((e, i) => i === 0 ? e : `, ${e}`)}</p> 
                    : null
                }                
                {
                    monster.damage_vulnerabilities && monster.damage_vulnerabilities.length > 0 
                    ? <p><b>Damage Vulnerabilities</b> {monster.damage_vulnerabilities.map((e, i) => i === 0 ? e : `, ${e}`)}</p> 
                    : null
                }
                {
                    monster.condition_immunities && monster.condition_immunities.length > 0
                    ? <p><b>Condition Immunities</b> {monster.condition_immunities.map((e, i) => i === 0 ? e.name : `, ${e.name}`)}</p>
                    : null
                }
                <p><b>Senses</b> {senses(monster.senses)}</p>
                <p><b>Languages</b> {monster.languages}</p>
                <p><b>Challenge</b> {monster.challenge_rating} ({monster.xp} XP)</p>
                <hr />
                {
                    monster.special_abilities.map((el, idx) => {
                        return <p key={idx}><b>{el.name}{el.usage ? (` (${el.usage.times}/${el.usage.type[4].toUpperCase() + el.usage.type.slice(5)})`) : null}</b> {el.desc}</p>
                    })
                }
                <h2>Actions</h2>
                <hr />
                {monster.actions.map(action => <p><b>{action.name}</b> {action.desc}</p>)}
                {
                    monster.legendary_actions.length > 0 
                    ? (
                        <div>
                            <h2>Legendary Actions</h2>
                            <hr />
                            {monster.legendary_actions.map(action => <p><b>{action.name}</b> {action.desc}</p>)}
                        </div>
                    )
                    : null
                }
            </div>
        )
    )
}

export default Monster