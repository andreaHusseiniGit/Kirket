import React from 'react';
import { Grid } from '@material-ui/core';
import Pitch from './Pitch.js';
import Ground from './Ground.js';
import Score from './Score.js';
import ButtonGrid from './ButtonGrid.js';
import {
    withRouter
  } from "react-router-dom";


// onStrike = name of player currently on strike
// offStrike = name of player currently off strike
// currentScore = value of button that was just clicked
// bowlers = bowling team
// batsmen = batting team
// teamAName = name of team A
// teamBName = name of team B
// category = specials, extras, out, runs --- which was clicked
// howOut = bowled,...
// whoOut = id
// fielder = id
// extras = which extra was clicked: legbyes, wides, byes, noballs
// specialRuns = how many runs were scored for a given extra event



class Dashboard extends React.Component {

    constructor () {
        super()
        this.state = {
            score:0,
            currentScore: 0,
            wickets: 0, 
            overs: 0,
            balls: 0,
            category: '',
            target: '-',

            onStrike: {},
            strikerScore: 0,
            strikerBalls: 0,
            strikerId: 0,

            offStrike: {},
            offStrikerScore: 0,
            offStrikerBalls: 0,
            offStrikerId: 0,

            bowler: {},
            freeBowlers: {},
            bowlerRuns: 0,
            bowlerOvers: 0,
            bowlerWickets: 0,

            scoreRuns: 0,
            scoreOvers: 0,
            scoreBalls: 0,
            scoreWickets: 0,

            open: false,
            extras: "",
            howOut: '',
            specialRuns: 0,

            dot_highlighted:false,
            one_highlighted:false,
            two_highlighted:false,
            three_highlighted:false,
            four_highlighted:false,
            six_highlighted:false,
            out_highlighted: false,
            special_highlighted: false,
            extra_highlighted: false,

            dot_disabled: false,
            one_disabled: false,
            two_disabled: false,
            three_disabled: false,
            four_disabled: false,
            six_disabled: false,
            out_disabled: false,
            special_disabled: false,
            extra_disabled: false,

            showPopUpHowOut: false,
            showPopUpExtras: false, 
            showPopUpSpecials: false,
            remain_disabled_out: false, 
            remain_disable_extra: false, 
            remain_disable_special:false,
            rotation: 0,
            xCoordGround: 0,
            yCoordGround: 0,
            xCoordPitch: 0,
            yCoordPitch: 0,

            
            // bowlingTeam,
            // battingTeam
        }  
    }
    
    stateSum = () => {
        return this.state.dot_disabled 
        + this.state.one_disabled 
        + this.state.two_disabled 
        + this.state.three_disabled 
        + this.state.four_disabled 
        + this.state.six_disabled 
        + this.state.out_disabled 
        + this.state.special_disabled 
        + this.state.extra_disabled
    }

    disabling = (button) => {
        // if (!this.state[`${button}_disabled`]) {
        if (this,this.stateSum()===0) {
            this.setState ({
                dot_disabled: !(button === 'dot'),
                one_disabled: !(button === 'one'),
                two_disabled: !(button === 'two'),
                three_disabled: !(button === 'three'),
                four_disabled: !(button === 'four'),
                six_disabled: !(button === 'six'),
                out_disabled: !(button === 'out'),
                special_disabled: !(button === 'special'),
                extra_disabled: !(button === 'extra'),
            })
        } else if (this.stateSum()===8){
            this.setState ({
                dot_disabled: false,
                one_disabled: false,
                two_disabled: false,
                three_disabled: false,
                four_disabled: false,
                six_disabled: false,
                out_disabled: false,
                special_disabled: false,
                extra_disabled: false
            })
        }
        
    }

    fixOvers = () => {
        let ball = this.state.balls +1
        if (ball ===6){
            this.setState({balls: 0})
            this.setState({overs: this.state.overs +1})
        }
        else {
            this.setState({balls: ball})
        }
    };

    togglePopUpHowOut = () => {
        this.setState({showPopUpHowOut: !this.state.showPopUpHowOut})
    };

    togglePopUpExtras = () => {
        this.setState({showPopUpExtras: !this.state.showPopUpExtras})
    };

    togglePopUpSpecials = () => {
        this.setState({showPopUpSpecials: !this.state.showPopUpSpecials})
    };

    rotate = () => {
        let newRotation = this.state.rotation + 45;
        if(newRotation >= 360){
            newRotation =- 360;
        }
        this.setState({
          rotation: newRotation,
        })
    }

    onMouseClickGround = (e) => {
        
        this.setState({ 
            xCoordGround: e.pageX - e.nativeEvent.offsetX + e.nativeEvent.layerX, 
            yCoordGround: e.pageY - e.nativeEvent.offsetY + e.nativeEvent.layerY});
    }
    
    onMouseClickPitch = (e) => {
        
        this.setState({ 
            xCoordPitch: e.pageX - e.nativeEvent.offsetX + e.nativeEvent.layerX, 
            yCoordPitch: e.pageY - e.nativeEvent.offsetY + e.nativeEvent.layerY });
    }

    onStrikeClick = (striker) => {
        striker === 1 ?
        this.setState({onStrike1: !this.onStrike1})
        : this.setState({onStrike2: !this.onStrike2})
    }

    setScore = () => {
        this.setState({
            score: this.state.score + this.state.currentScore
        })
        this.setState({
            dot_disabled: false,
            one_disabled: false,
            two_disabled: false,
            three_disabled: false,
            four_disabled: false,
            six_disabled: false,
            out_disabled: false,
            special_disabled: false,
            extra_disabled: false,

            dot_highlighted: false,
            one_highlighted: false,
            two_highlighted: false,
            three_highlighted: false,
            four_highlighted: false,
            six_highlighted: false,
            out_highlighted: false,
            special_highlighted: false,
            extra_highlighted: false,
        })
        // there is where I need to do the fetch call

        let data = {

            matchid: localStorage.getItem('matchid'),
            //these values will be provided by the person I think 
            striker: this.state.strikerId,
            nonstriker: this.state.offStrikerId,
            bowler: this.state.bowler.id,
            legal: true,
            extras: "NONE",
            runs:0
        }

        if (this.state.category === "runs"){
            console.log('Normal circumstances');
            data['runs'] = this.state.currentScore
        }
        else if (this.state.category === "extras"){
            console.log('the extras value was clciked');
            console.log('number of runs ');
            console.log(this.state.currentScore);
            console.log("numebr of runs scored from the extras")
            console.log(this.state.specialRuns);
            console.log("extrass valye")
            console.log(this.state.extras);
            data['runs'] = parseInt(this.state.specialRuns);
            data['extras'] = this.state.extras
            if(this.state.extras.indexOf("NO") != -1 || this.state.extras === "WIDE"){
                data['legal'] = false;
                data['runs'] = data['runs'] +1;

                console.log('wide');
                console.log(data['runs']);


            }
        }
        else if (this.state.category === "out"){
            console.log("HOw did the person get out?")
            data['explanation'] = this.state.extras
            data['wickets'] =1
        }



        fetch('http://localhost:4000/ball', {
            method: 'post',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            console.log('data is here');
            console.log(data);
            console.log('the ball is created');
            if (data.oldvalues) {
                this.setState({
                    scoreOvers: data.overindex -1,
                    scoreBalls: data.oldvalues.legalballindex,
                    scoreRuns: data.runs,
                    scoreWickets: data.wickets,

                    freeBowlers: data.newbowlers.teamBowling.players
                })

            } else {
                this.setState({
                    strikerScore: data.striker.runs,
                    strikerBalls: data.striker.ballsfaced,
                    strikerId: data.striker.id,
    
                    offStrikerId: data.nonstriker.id,
                    offStrikerBalls: data.nonstriker.ballsfaced,
                    offStrikerScore: data.nonstriker.runs,
    
                    bowlerRuns: data.bowler.runsconceded,
                    bowlerWickets: data.bowler.wickets,
                    bowlerOvers: data.bowler.oversbowled.toFixed(1),
    
                    scoreOvers: data.over.overindex -1,
                    scoreBalls: data.legalballindex,
                    scoreRuns: data.over.runs,
                    scoreWickets: data.over.wickets
                })
            }
            
        })
    }

    saveScore = (value) => {
        this.setState({
            currentScore: value
        })
    }



    render () {

        
        return (
        <Grid container
        justify = 'center'
        direction = 'space-between'
        alignItems = 'center'
        spacing={2}
        className='score-wrapper'>

            {/* Grid item for showcaseing the score */}
            <Grid item xs = {6}>
                <Score 
                score={this.state.scoreRuns} 
                wickets={this.state.scoreWickets} 
                overs={this.state.scoreOvers} 
                balls={this.state.scoreBalls}
                target={this.state.target}

                onStrike={(batsman1)=>{this.setState({onStrike: batsman1, strikerId: batsman1.id})}}
                strikerScore={this.state.strikerScore}
                strikerBalls={this.state.strikerBalls}
                strikerId={this.state.strikerId}

                offStrike={(batsman2)=>{this.setState({offStrike: batsman2, offStrikerId: batsman2.id})}}
                offStrikerScore={this.state.offStrikerScore}
                offStrikerBalls={this.state.offStrikerBalls}

                bowler={(firstBowler)=>{this.setState({bowler: firstBowler})}}
                freeBowlers={this.state.freeBowlers}
                bowlerRuns={this.state.bowlerRuns}
                bowlerWickets={this.state.bowlerWickets}
                bowlerOvers={this.state.bowlerOvers}

                teamA = {this.props.location.state.teamA}
                teamB = {this.props.location.state.teamB}
                teamAName = {this.props.location.state.teamAName}
                teamBName = {this.props.location.state.teamBName}
                bowlers = {this.props.location.state.toss}
                batsman = {this.props.location.state.choice}
                currentScore = {this.state.currentScore}
                className='score-wrapper'
                chooseStriker = {this.props.location.state.chooseStriker}
                // onStrikeClick={this.onStrikeClick}
                />
            </Grid>
            {/* {console.log(this.state.onStrike && Object.keys(this.state.onStrike))}
            {console.log(typeof(this.state.onStrike))}
            {console.log(this.state.onStrike && typeof(this.state.onStrike)==='string' && JSON.parse(this.state.onStrike).id)} */}
            {/* {console.log('bowler')}
            {console.log(this.state.bowler.id)} */}

            <Grid item xs = {6}>
                <Pitch 
                rotate={this.rotate} 
                angle={this.state.rotation}
                onClick={this.onMouseClickPitch}
                xCoord={this.state.xCoordPitch}
                yCoord={this.state.yCoordPitch}/>
            </Grid>

            {/* scoring buttons */}
            <Grid item xs = {6}>
                
                <ButtonGrid 
                    setScore={this.setScore}
                    fixOvers={this.fixOvers}
                    disabling={(value)=>{this.disabling(value)}}
                    saveScore={(value)=>{this.saveScore(value)}}
                    teamA={this.props.location.state.teamA}
                    teamB={this.props.location.state.teamB}
                    onChangeExtras={(type, runs)=>{this.setState({extras: type, specialRuns: runs})}}
                    onClickCategory={(category)=>{this.setState({category: category})}}
                    onChangeOut={(type, runs)=>{this.setState({howOut: type, specialRuns: runs})}}/>
                    

            {/* end of buttons grid item */}
            </Grid>

            {/* Grid item for showcaseing the pitchmap */}
            <Grid item xs = {6}>
                <Ground 
                rotate={this.rotate} 
                angle={this.state.rotation}
                onClick={this.onMouseClickGround}
                xCoord={this.state.xCoordGround}
                yCoord={this.state.yCoordGround}/>
            </Grid>
            <Grid item xs={12}>
                <h4>Footer here</h4>
            </Grid>
        </Grid>

    )


}}

export default withRouter(Dashboard);