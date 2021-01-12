import React, {useState} from 'react';
import { Grid} from '@material-ui/core';
import SetStriker from './SetStriker.js';
import SetBowler from './SetBowler.js';

const Score = (props) => {

    const [batsman1, setBatsman1] = useState({});
    const [batsman2, setBatsman2] = useState({});
    const [bowler, setBowler] = useState({});
    const [battingTeam] = useState(props.teamAName);
    const [batsmen] = useState(props.teamA);
    const [bowlers] = useState(props.teamB);
    const [setPlayer1] = useState({});
    const [overDone, setOverDone] = useState(false);
    
    const chooseBowlers = () => {
        if (props.balls === 6) {
            setOverDone(true)
        }
    }

    return (
            <Grid container
                justify = 'center'
                direction = 'row'
                alignItems = 'center'
                spacing={2}
                >
                    <SetStriker 
                    batsmen = {batsmen}
                    bowlers = {bowlers}
                    onChangeBatsman = {(name)=>{setPlayer1(name)}}
                    onStrike = {(batsman1)=>{setBatsman1(batsman1); props.onStrike(batsman1)}}
                    offStrike = {(batsman2)=>{setBatsman2(batsman2); props.offStrike(batsman2)}}
                    bowler = {(firstBowler)=>{setBowler(firstBowler); props.bowler(firstBowler)}}/>

                    <SetBowler 
                    bowlers = {props.freeBowlers}
                    balls = {props.balls}
                    bowler = {(firstBowler)=>{setBowler(firstBowler); props.bowler(firstBowler)}}/>

                    <Grid container
                    justify = 'center'
                    direction = 'row'
                    alignItems = 'center'
                    className = 'score-banner'>
                        <Grid item xs={4}>
                            <h1 className='score'>{props.score + "/" + props.wickets + " (" + props.overs + '.' + props.balls+ ")" }</h1>
                        </Grid>
                        <Grid item xs={4}>
                            <h1 className='score'>
                                {battingTeam}
                                </h1>
                        </Grid>
                        <Grid item xs={4}>
                            <h2 className='innings'>1st Innings <br/> target: {props.target}</h2>
                        </Grid>
                    </Grid>

                    <Grid item xs={6}>
                        <h2 className='description description-smaller'>Players</h2>
                    </Grid>
                    <Grid item xs={3}>
                        <h2 className='description description-smaller'>Runs</h2>
                    </Grid>
                    <Grid item xs={3}>
                        <h2 className='description description-smaller'>Balls</h2>
                    </Grid>

                    
                    <Grid item xs={6}>
                        <h2 className='description player'>
                        {batsman1.name}
                        <img 
                        alt='striker' 
                        src='/images/batsman.png' 
                        className={`img-striker ${(props.strikerId===batsman1.id)&&'active'}`}/>
                        </h2>
                    </Grid>

                    <Grid item xs={3}>
                        <h2 className='description'>
                        {props.strikerId===batsman1.id ? props.strikerScore : props.offStrikerScore}</h2>
                    </Grid>
                    <Grid item xs={3}>
                        <h2 className='description'>
                        {props.strikerId===batsman1.id ? props.strikerBalls : props.offStrikerBalls}</h2>
                    </Grid>

                    <Grid item xs={6}>
                        <h2 className='description player'>
                        {batsman2.name}
                        <img 
                        alt='striker' 
                        src='/images/batsman.png' 
                        className={`img-striker ${(props.strikerId===batsman2.id)&&'active'}`}/>
                        </h2>
                    </Grid>

                    <Grid item xs={3}>
                        <h2 className='description'>
                        {props.strikerId===batsman2.id ? props.strikerScore : props.offStrikerScore}</h2>
                    </Grid>
                    <Grid item xs={3}>
                        <h2 className='description'>
                        {props.strikerId===batsman2.id ? props.strikerBalls : props.offStrikerBalls}</h2>
                    </Grid>


                    <Grid item xs={6}>
                    </Grid>
                    <Grid item xs={2}>
                        <p className='description description-smaller'>Overs</p>
                    </Grid>
                    <Grid item xs={2}>
                        <p className='description description-smaller'>Runs</p>
                    </Grid>
                    <Grid item xs={2}>
                        <p className='description description-smaller'>Wickets</p>
                    </Grid>
                    <Grid item xs={6}>
                        {/* <BowlerMenu 
                        className='description'
                        bowlers={bowlers}
                        onChangeBowler = {(name)=>{setBowlerName(name)}}/> */}
                        <h2 className='description'>{bowler.name}</h2>
                    </Grid>
                    <Grid item xs={2}>
                        <h2 className='description'>{props.bowlerOvers}</h2>
                    </Grid>
                    <Grid item xs={2}>
                        <h2 className='description'>{props.bowlerRuns}</h2>
                    </Grid>
                    <Grid item xs={2}>
                        <h2 className='description'>{props.bowlerWickets}</h2>
                    </Grid>

                    <Grid item xs={6}>
                        <h2 className='description description-smaller'>Previous Bowler</h2>
                    </Grid>
                    <Grid item xs={2}>
                        <h3 className='description'>0</h3>
                    </Grid>
                    <Grid item xs={2}>
                        <h3 className='description'>0</h3>
                    </Grid>
                    <Grid item xs={2}>
                        <h3 className='description'>0</h3>
                    </Grid>

                </Grid>
    )
}

export default Score;