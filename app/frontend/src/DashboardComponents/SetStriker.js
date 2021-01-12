import React, {useState} from 'react';
import { Button } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import Popup from "reactjs-popup";
import BatsmanMenu from './BatsmanMenu';
import BowlerMenu from './BowlerMenu';


const SetStriker = (props) => {
    
    const [open, setOpen] = useState(true)
    const [setValue] = React.useState('batsman 1');

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    const [onStrike, setOnStrike] = useState({});
    const [onStriker, setOnStriker] = useState({});
    const [offStriker, setOffStriker] = useState({});
    const [bowler, setBowler] = useState({});

    return (
        <>
        {/* <Button 
            className = 'button button-confirm button_striker' 
            color='inherit' 
            variant='outlined' 
            onClick={() => {setOpen(!open)}}>Set Striker</Button> */}
        <Popup
            position="top center"
            open = {open}>
            <Grid container
                justify = 'center'
                direction = 'row'
                className = 'popup-scroll-choice center'>
                <Grid item xs={3}>
                    <button 
                    className='button button-close' 
                    onClick={() => setOpen(false)}>x</button>
                </Grid>
                <Grid item xs={9}>
                    <h2>Select Players</h2>
                </Grid>

                <Grid item xs={6}>
                    <Grid container
                    direction='column'
                    spacing={2}
                    justify='center'
                    alignContent='stretch'>
                        <Grid item>
                        <BatsmanMenu 
                            className='description'
                            batsmen={props.batsmen}
                            onChangeBatsman = {(name)=>{setOnStriker(name)}}
                            Batter = {(selectedBatter) => {setOnStriker(selectedBatter)}}
                            strike = "Striker"
                            />
                        </Grid>
                        <Grid item>
                            <BatsmanMenu 
                                className='description'
                                batsmen={props.batsmen}
                                onChangeBatsman = {(name)=>{setOffStriker(name)}}
                                Batter = {(selectedBatter) => {setOffStriker(selectedBatter)}}
                                strike = "Non-striker"
                                />
                        </Grid>
                        <Grid item>
                            <BowlerMenu 
                                className='description'
                                bowlers={props.bowlers}
                                // onChangeBowler = {(name)=>{setBowler(name)}}
                                Bowler = {(selectedBowler)=>{setBowler(selectedBowler); props.bowler(selectedBowler)}}/>
                                
                        </Grid>
                    </Grid>
                </Grid>
                
                <Grid item xs={12}
                style={{paddingBottom: '15px', marginTop:'5px'}}>
                        <Grid container
                        direction="row" 
                        justify='center' 
                        alignItems="flex-end"
                        className = 'continue-wrapper toss-content-wrapper'>
                            <Button 
                                className = "button button-primary" 
                                color='inherit'
                                variant='outlined'
                                onClick={()=>{
                                    if(onStriker && offStriker){
                                        setOnStrike('1');
                                        const firstbatsmen = onStriker;
                                        const secondbatsmen = offStriker;
                                        setOnStriker(firstbatsmen);
                                        setOffStriker(secondbatsmen);
                                        props.onStrike(firstbatsmen);
                                        props.offStrike(secondbatsmen);
                                        setOpen(false);
                                    } else {
                                        alert('Select the batsmen and the batter on strike');
                                    }
                                    
                                }}>
                                   Confirm
                            </Button>
                        </Grid>
                         
                    </Grid>
            </Grid>
        </Popup>
        </>

    )
}

export default SetStriker;