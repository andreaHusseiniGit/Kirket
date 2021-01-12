import React from 'react';
import { Button, Grid } from '@material-ui/core';

const Ground = (props) => {

    

    return (
        <>
        <Grid container
        className='img-wrapper-ground center'
        justify = 'center'
        direction = 'row'
        alignItems = 'center'
        >
            <Grid item 
            xs={12}>
                <img 
                alt='ground' 
                src='/images/Ground.png' 
                className='img-ground'
                style={{transform: `rotate(${props.angle}deg)`}}
                onClick={props.onClick}/>
            </Grid>
            <Grid item xs={12}>
                <Button 
                className='button button-rotate' 
                onClick={props.rotate}>Rotate</Button>
            </Grid>
        </Grid>
            <img
            alt='pointer'
            src='/images/pointer.png'
            style={{position: 'absolute', left: `${props.xCoord}px`, top: `${props.yCoord}px`}}
            className='img-pointer'/>
        </>
        
        
    )
}

export default Ground;