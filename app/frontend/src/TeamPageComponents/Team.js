import React from 'react';
import SmallPlayer from './SmallPlayer';

const Team = ({players}) => {
    const playerComponent = players.map((player,i) => {
        return <SmallPlayer 
        key = {i} 
        name = {player.name} 
        role = {player.role}
        />

    })
    return (
    <div>
        {playerComponent}
    </div>)
    
}

export default Team;