import React, {useState} from "react";
import Popup from "reactjs-popup";
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { ButtonGroup } from "@material-ui/core";
import jwt from 'jsonwebtoken';
import {
    withRouter
  } from "react-router-dom";
import TextField from '@material-ui/core/TextField';

const DoneToss = (props) => {

    const [open, setOpen] = useState(false);
    const [wrongOpen, setWrongOpen] = useState(false);
    const [DisableTeamA, setDisableA] = useState(false);
    const [DisableTeamB, setDisableB] = useState(false);

    const [DisableBowling, setDisableBowling] = useState(false);
    const [DisableBatting, setDisableBatting] = useState(false);

    const [toss, setToss] = useState(props.toss);
    const [choice, setChoice] = useState(props.choice);
    const [overNumber, setOverNumber] = useState(props.overNumber)

    const [chooseStriker, setChooseStriker] = useState(false);

    const onSubmit= () => {
        const user = jwt.decode(localStorage.getItem('token')).user;
        fetch('http://localhost:4000/team', {
            method: 'post',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({
                name: JSON.parse(localStorage.getItem('TeamANameStorage')),
                players: JSON.parse(localStorage.getItem('selectedplayersAstorage'))
            })
        })
        .then(response => response.json())
        .then(data => {
            
        if(data){
            console.log('firstteam');
            console.log(data);
            const firstteamvalues = data[0].players;
            const firstteam = data[0].id;

            console.log(firstteamvalues);
            console.log(firstteam);
            fetch('http://localhost:4000/team', {
            method: 'post',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({
                name: JSON.parse(localStorage.getItem('TeamBNameStorage')),
                players: JSON.parse(localStorage.getItem('selectedplayersBstorage'))
            })
        })
        .then(response => response.json())
        .then(data => {
            
        if(data){
            console.log(data);
            const secondteam = data[0].id;
            const secondteamvalues = data[0].players;

            console.log(secondteamvalues);
            console.log(secondteam);

            console.log('here')
            console.log(user.id);
            console.log(firstteam);
            console.log(secondteam);

        

            fetch('http://localhost:4000/match', {
            method: 'post',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({
                user: user.id,
                teamone: firstteam,
                teamtwo: secondteam, 
                overs: parseInt(overNumber)
            })
        })
        .then(response => response.json())
        .then(data => {
            
        if(data){
            console.log("match");
            console.log(data);
            const matchid = data.id;
            //this is where I store the matchid in the local storage and use that to help me with the backend 
            //stuff
            localStorage.setItem('matchid', JSON.stringify(matchid));
            var teambat = null;
            var teambowl = null;

            console.log("TOSS SITUATION")
            if(toss ==='teamA' ) {
                if(choice === 'Bat'){
                    console.log("First team batting first")
                    console.log(firstteam);


                    teambat = firstteam;
                    teambowl = secondteam;
                }
                else{
                    console.log("First team bowling first")
                    teambat = secondteam;
                    teambowl = firstteam;
                }
            }
            else{
                if(choice === 'Bat'){
                    console.log("second team batting first")
                    teambat = secondteam;
                    teambowl = firstteam;
                    
                }
                else{
                    console.log("second team bowling first")
                    teambat = firstteam;
                    teambowl = secondteam;
                }

            }

            fetch('http://localhost:4000/innings', {
            method: 'post',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({
                matchid: matchid,
                teambatting: teambat,
                teambowling: teambowl
            })
        })
        .then(response => response.json())
        .then(data => {
            if(data) {
                console.log(data);
                console.log('the innings is crated');

                const inningsid = data.id;
                console.log(inningsid);
                fetch('http://localhost:4000/over', {
            method: 'post',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({
                innings: inningsid,
                overindex:1
            })
        })
        .then(response => response.json())
        .then(data => {
            if(data){
                console.log(data);
                console.log('over is also created');
            }
        })

                props.history.push({
                    pathname: '/dashboard',
                    state: {teamA: firstteamvalues,
                            teamB: secondteamvalues,
                            choice: choice,
                            toss: toss,
                            teamAName: props.teamAname,
                            teamBName: props.teamBname,
                            chooseStriker: chooseStriker
                        }
                })
            }
            
        })


        }
        })
        }
        })

        }
        })

    }


    return(
        <>
        <Button 
        className = 'button button-primary' 
        color='inherit' 
        variant='outlined' 
        onClick={() => {props.teamA.length===2 && props.teamB.length===2 ? setOpen(!open) : setWrongOpen(!wrongOpen)}}>Done</Button>
        <Popup
        position="top center"
        open = {open}>
         <div className = 'popup-scroll-toss center toss-wrapper'>
            <button 
                className='button button-close' 
                onClick={() => setOpen(false)}>x</button>

            <Grid container 
                direction="row" 
                justify='center' 
                alignItems="center"
                className='toss-content-wrapper'>
                <Grid item xs={6}>
                    <h2 className='center toss'>Who won the toss</h2>
                </Grid>
                <Grid item xs={6}>
                    <ButtonGroup
                        aria-label="outlined primary button group">
                        <Button 
                            className = {`"button button-toss ${DisableTeamB&&!DisableTeamA&&'disabled'&&'active'}`}
                            color='inherit' 
                            variant='outlined'  
                            onClick = {() => {setDisableB(!DisableTeamB); setToss("teamA")}} 
                            disabled = {DisableTeamA} >{props.teamAname}
                            </Button>
                        <Button 
                            className = {`"button button-toss ${DisableTeamA&&!DisableTeamB&&'disabled'&&'active'}`}
                            color='inherit' 
                            variant='outlined'  
                            onClick = {() => {setDisableA(!DisableTeamA); setToss("teamB")}} 
                            disabled = {DisableTeamB} >{props.teamBname}</Button>
                    </ButtonGroup>
                </Grid>
                <Grid item xs={6}>
                    <h2 className='center choice'>Chose to</h2>
                </Grid>
                <Grid item xs={6}>
                    <ButtonGroup
                        aria-label="outlined primary button group">
                        <Button 
                            className = {`"button button-toss ${DisableBatting&&!DisableBowling&&'disabled'&&'active'}`}
                            color='inherit' 
                            variant='outlined'  
                            onClick = {() => {setDisableBatting(!DisableBatting); setChoice(`Bowl`)}} 
                            disabled = {DisableBowling} >Bowl</Button>
                        <Button 
                            className = {`"button button-toss ${DisableBowling&&!DisableBatting&&'disabled'&&'active'}`} 
                            color='inherit'
                            variant='outlined'  
                            onClick = {() => {setDisableBowling(!DisableBowling); setChoice(`Bat`)}} 
                            disabled = {DisableBatting} >Bat</Button>
                    </ButtonGroup>
                </Grid>
                <Grid xs={6}>
                    <h2 className='center choice'>Overs</h2>
                </Grid>
                <Grid xs={6}>
                <div 
                    className="mt3">
                    <TextField
                        style={{color: 'white'}}
                        id="overs"
                        variant="outlined"
                        label="overs"
                        type="number"
                        onChange = {(event)=>{
                                setOverNumber(event.target.value)}}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        />
                        
                </div>
                </Grid>
                <Grid container
                direction="row" 
                justify='flex-end' 
                alignItems="center"
                className = 'continue-wrapper toss-content-wrapper'>
                    <Grid item>
                        <Button 
                            className = "button button-primary" 
                            color='inherit'
                            variant='outlined'
                            style={{marginRight:'30px !important'}}
                            onClick={()=>{ if (toss.length>0 && choice.length>0 && overNumber.length>0) {
                                setChooseStriker(true);
                                onSubmit()}}}>
                            Continue
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
            </div>
        </Popup>
        
        <Popup 
        style={{width: '50px'}} 
        position="center" 
        open = {wrongOpen}>
            <div className = 'popup popup-scroll center wrong-popup'>
                <h3>Wrong number of players</h3>
                <Button 
                className = "button button-primary" 
                color='inherit'
                variant='outlined' 
                onClick={() => setWrongOpen(false)}>Go Back</Button>
            </div>
        </Popup>
        </>
      )
    };

export default withRouter(DoneToss);