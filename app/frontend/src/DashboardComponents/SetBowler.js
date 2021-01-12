import React, {useState} from 'react';
import { Button } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import Popup from "reactjs-popup";
import BowlerMenu from './BowlerMenu';

const SetBowler = (props) => {

    const overDone = props.balls===6 ? true : false;

    const [open, setOpen] = useState(true)
    const [bowler, setBowler] = useState({});

    return (
        <Popup
            position="top center"
            open = {open&&overDone}>
            <Grid container
                justify = 'center'
                direction = 'row'
                className = 'popup-scroll-choice center'>
                <Grid item xs={12}>
                    <BowlerMenu 
                        className='description'
                        bowlers={props.bowlers}
                        Bowler = {(selectedBowler)=>{setBowler(selectedBowler); props.bowler(selectedBowler)}}/>
                </Grid>
                <Grid item xs={12}>
                    <Button className='button button-primary'
                    onClick={() => {if (bowler) {
                        setOpen(false)
                    }}}>
                    Confirm</Button>
                </Grid>
            </Grid>
        </Popup>
    )

}

export default SetBowler;