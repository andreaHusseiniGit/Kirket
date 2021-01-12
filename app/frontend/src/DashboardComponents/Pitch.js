import React, {useState} from 'react';
import { Button, Grid, ButtonGroup } from '@material-ui/core';



const Pitch = (props) => {

    const [row, setRow] = useState(0);
    const [column, setColumn] = useState(0);

    var i;
    const pitchElement = [...new Array(8)].map((i) => {
        return [...new Array(7)].map((j) => {
            return ( <Button className={`button button-pitch ${column===i&&row===j&&'active'}`}
                        variant='outlined'
                        color='inherit'
                        key={j}
                        onClick={() => {setRow(j); setColumn(i)}}>{i}</Button>
                    )
        })
        }
    )
    return (
        <Grid container
                className='img-wrapper-pitch center'
                justify = 'center'
                direction = 'row'
                alignItems = 'center'
                >
                <Grid item xs={12}
                    style={{width: '100%'}}>
                <Grid container
                    className=''
                    justify = 'center'
                    direction = 'row'
                    alignItems = 'center'>
                        <Grid item xs={3}></Grid>
                        <Grid item className='pitch-row'><h4 className='stump-text'>wide</h4></Grid>
                        <Grid item className='pitch-row'><h4 className='stump-text'>outside off</h4></Grid>
                        <Grid item className='pitch-row'><h4 className='stump-text'>off stump</h4></Grid>
                        <Grid item className='pitch-row'><h4 className='stump-text'>middle stump</h4></Grid>
                        <Grid item className='pitch-row'><h4 className='stump-text'>leg stump</h4></Grid>
                        <Grid item className='pitch-row'><h4 className='stump-text'>down leg</h4></Grid>
                        <Grid item className='pitch-row'><h4 className='stump-text'>wide down leg</h4></Grid>
                    </Grid>
                </Grid>
            <Grid item xs={2}>
                <Grid container
                    className=''
                    justify = 'center'
                    direction = 'column'
                    alignItems = 'center'>
                    <Grid item className='pitch-item'>beamer</Grid>
                    <Grid item className='pitch-item'>full toss</Grid>
                    <Grid item className='pitch-item'>yorker</Grid>
                    <Grid item className='pitch-item'>half volley</Grid>
                    <Grid item className='pitch-item'>length ball</Grid>
                    <Grid item className='pitch-item'>back of a length</Grid>
                    <Grid item className='pitch-item'>short</Grid>
                    <Grid item className='pitch-item'>half tracker</Grid>
                </Grid>
            </Grid>
            <Grid item>
                <ButtonGroup 
                color="primary" 
                style={{width: '100%'}}
                aria-label="large outlined primary button group">
                    <Grid container
                        className='pitch-grid'
                        justify = 'center'
                        direction = 'column'
                        alignItems = 'center'
                        > 
                        {pitchElement.map(row => {
                            return ( 
                                <Grid item
                                >
                                    <Grid container
                                        className='pitch-grid'
                                        justify = 'center'
                                        direction = 'row'
                                        alignItems = 'center'>

                                {row.map(column => {
                                return (
                                    <Grid item>
                                        {column}
                                    </Grid>
                                )
                                })}
                                        </Grid>

                                </Grid>
                            )
                        })}
                    </Grid>
                </ButtonGroup>
            </Grid>
        </Grid>
        
    )
}

export default Pitch;



                
               