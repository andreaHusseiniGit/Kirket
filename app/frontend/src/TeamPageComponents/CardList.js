import React from 'react';
import Card from './Card';
import Grid from '@material-ui/core/Grid';

const CardList = ({players, onClick, clicked, ...props}) => {

    const cardComponent = players.map((player,i) => {
        if (player.name.length ===0) {
            return <></>
        }
        return <Card 
        key = {i} 
        id = {players[i].id} 
        name = {players[i].name} 
        role = {players[i].role}
        onClick = {(id) => onClick(id)}
        clicked = {(id) => clicked(id)}
        active = {props.selectedPlayers.filter(p => p.id === player.id).length !== 0}
        />

    })
    return(
    <Grid container 
        direction='row' 
        justify='center' 
        alignItems='center' 
        spacing={1}>
        {cardComponent.map(Card => {
            return (
                <Grid item xs={3}>
                    {Card}
                </Grid>
            )
            })}
  </Grid>
    )
}

export default CardList;