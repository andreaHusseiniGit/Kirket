import React from 'react';
import CardList from './CardList';
import Scroll from './Scroll';
import Team from './Team';
import AddPlayer from './AddPlayer';
import DoneToss from './DoneToss';
import {playersA}  from '../playersA';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {
    withRouter
  } from "react-router-dom";

class TeamPage extends React.Component {
    
    constructor () {
        super()
        this.state = {
            playersA,
            searchfieldA: '',
            selectedplayersA:[],
            clickedA: false,
            TeamAName: 'Team A',
            TeamBName: 'Team B',


            playersB :  [...new Array(12)].map((_,i) => ({"id": i, "name":"", "team":""})),
            searchfieldB: '',
            selectedplayersB:[],
            clickedB: false,


            showPopUp: false,
            route: '',

            toss: "",
            choice: "",
            overNumber: 0
            
        } 
        }


    componentDidMount(){

        const TeamANameStorage = localStorage.getItem('TeamANameStorage');
        if(TeamANameStorage){
            this.setState({
                TeamAName: JSON.parse(TeamANameStorage)
            })
        }

        const TeamBNameStorage = localStorage.getItem('TeamBNameStorage');
        if(TeamBNameStorage){
            this.setState({
                TeamBName: JSON.parse(TeamBNameStorage)
            })
        }

        const playersAstorage = localStorage.getItem('playersAstorage');
        if(playersAstorage){
            this.setState({
                playersA: JSON.parse(playersAstorage)
            })
        }

        const selectedplayersAstorage = localStorage.getItem('selectedplayersAstorage');
        if(selectedplayersAstorage){
            this.setState({
                selectedplayersA: JSON.parse(selectedplayersAstorage)
            })
        }


        const playersBstorage = localStorage.getItem('playersBstorage');
        if(playersBstorage){
            this.setState({
                playersB: JSON.parse(playersBstorage)
            })
        }

        const selectedplayersBstorage = localStorage.getItem('selectedplayersBstorage');
        if(selectedplayersBstorage){
            this.setState({
                selectedplayersB: JSON.parse(selectedplayersBstorage)
            })
        }
    }


    // componentDidMount() {
    //     this.setState({playersA});
    // }
    

    onSearchChangeA = (event) => {
        this.setState({searchfieldA: event.target.value})
    }

    onSearchChangeB = (event) => {
        this.setState({searchfieldB: event.target.value})
    }

    onClearClickA = (event) => {
        this.setState({selectedplayersA: []})
    }

    onClearClickB = (event) => {
        this.setState({selectedplayersB: []})
    }

    

    onClickA = (id) => {
        const player = this.state.playersA.filter((player) => player.id === id)[0]
        if(this.state.selectedplayersA.filter((player) => player.id === id).length === 0)
        { 
            this.setState(
                    { selectedplayersA: this.state.selectedplayersA.concat(player) }, 
                    () => {
                        localStorage.setItem('selectedplayersAstorage', JSON.stringify(this.state.selectedplayersA))

                    })
   
    }
    else {

        const filteredplayers = this.state.selectedplayersA.filter(player => player.id !== id)
        this.setState(
            { selectedplayersA: filteredplayers }, () => {
                localStorage.setItem('selectedplayersAstorage', JSON.stringify(this.state.selectedplayersA))

            })
    }
}

    onClickB = (id) => {
        const player = this.state.playersB.filter((player) => player.id === id)[0]
        if(this.state.selectedplayersB.filter((player) => player.id === id).length === 0)
        { 
            this.setState(
                    { selectedplayersB: this.state.selectedplayersB.concat(player)}, 
                    () => {
                        localStorage.setItem('selectedplayersBstorage', JSON.stringify(this.state.selectedplayersB))

                    })

    }
    else {

        const filteredplayers = this.state.selectedplayersB.filter(player => player.id !== id)
        this.setState(
            { selectedplayersB: filteredplayers }, 
            () => {
                localStorage.setItem('selectedplayersBstorage', JSON.stringify(this.state.selectedplayersB))

            })
    }
    }

    cardClickedA = (id) => {
        if(this.state.selectedplayersA.filter((player) => player.id === id).length === 0)
        { this.setState (
            {clickedA: !this.state.clicked}
        )
    }
}

    cardClickedB = (id) => {
        if(this.state.selectedplayersB.filter((player) => player.id === id).length === 0)
        { this.setState (
            {clickedB: !this.state.clicked}
        )
    }
}

    togglePopUp = () => {
        this.setState({showPopUp: !this.state.showPopUp})
    }
  

    render() {
        const filteredPlayersA = this.state.playersA.filter(player => {
            return player.name.toLowerCase().includes(this.state.searchfieldA.toLowerCase());
        })

        const filteredPlayersB = this.state.playersB.filter(player => {
            return player.name.toLowerCase().includes(this.state.searchfieldB.toLowerCase());
        })


        return (
            <Container 
            maxWidth="false">
                <Grid container 
                spacing={2} 
                alignItems='center' 
                direction='row' 
                justify='center'>
                
                    {/* title row */}
                    <Grid item xs={12}>
                        <Typography 
                        variant='h1' 
                        align='center' 
                        color='text.primary' >Select Players</Typography>
                    </Grid>

                    {/* top row */}
                    <Grid item xs={6}>
                        <Grid container 
                        spacing={2} 
                        alignItems='center' 
                        direction='row' 
                        justify='space-between'
                        className='grid-item'>
                            <Grid item md={12} xs={12}>
                                <Grid container 
                                    justify='space-between' 
                                    alignItems='center'>
                                <Grid item>
                                    <Typography 
                                    variant='h3'
                                    color='text.primary'>{this.state.TeamAName}</Typography>
                                </Grid>
                                    <Grid item>
                                        <AddPlayer 
                                        teamName = {this.state.TeamAName} 
                                        onClick = {(addedPlayers, TeamAName) => this.setState({playersA: [ ...addedPlayers],TeamAName}, 
                                            () => {
                                                localStorage.setItem('playersAstorage', JSON.stringify(this.state.playersA));
                                                localStorage.setItem('TeamANameStorage', JSON.stringify(this.state.TeamAName));
                                
                                            })} 
                                        onToggle = {this.togglePopUp} players = {this.state.playersA}/>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item 
                            xs={12} >
                                <Scroll>
                                    <CardList 
                                    players = {filteredPlayersA} 
                                    className='df' 
                                    onClick = {this.onClickA} 
                                    clicked = {this.cardClickedA} 
                                    selectedPlayers={this.state.selectedplayersA} /> 
                                </Scroll>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item 
                    xs={6}>
                        <Grid container 
                        spacing={2} 
                        alignItems='center' 
                        direction='row' 
                        justify='space-between'
                        className='grid-item'>
                        <Grid item md={12} xs={12}>
                            <Grid container 
                            justify='space-between'
                            alignItems='center'>
                                <Grid item>
                                    <Typography 
                                        variant='h3'
                                        color='text.primary'>My Team</Typography>
                                </Grid>
                                <Grid item>
                                    <Button 
                                        variant='outlined' 
                                        className='button button-primary' 
                                        color='inherit'
                                        onClick = {this.onClearClickA}>Clear</Button>
                                </Grid>
                            </Grid> 
                        </Grid>
                        <Grid item 
                            xs={12}>
                            <Scroll>
                                <Team players = {this.state.selectedplayersA}/>
                            </Scroll>
                        </Grid>
                        </Grid>
                    </Grid>

                    {/* bottom row */}
                    <Grid item xs={6}>
                        <Grid container 
                        spacing={2} 
                        alignItems='center' 
                        direction='row' 
                        justify='space-between'
                        className='grid-item grid-item-bottom'>
                            <Grid item md={12} xs={12}>
                                <Grid container 
                                justify='space-between'
                                alignItems='center'>
                                <Grid item>
                                    <Typography 
                                    variant='h3'
                                    color='text.primary'>{this.state.TeamBName}</Typography>
                                </Grid>
                                    <Grid item>
                                        <AddPlayer 
                                        teamName = {this.state.TeamBName} 
                                        onClick = {(addedPlayers, TeamBName) => this.setState({playersB: [ ...addedPlayers],TeamBName}, 
                                            () => {
                                                localStorage.setItem('playersBstorage', JSON.stringify(this.state.playersB));
                                                localStorage.setItem('TeamBNameStorage', JSON.stringify(this.state.TeamBName));
                                
                                            })} 
                                        onToggle = {this.togglePopUp} 
                                        players = {this.state.playersB}/>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item 
                            xs={12} >
                                <Scroll>
                                    <CardList 
                                    players = {filteredPlayersB} 
                                    className='df' 
                                    onClick = {this.onClickB} 
                                    clicked = {this.cardClickedB} 
                                    selectedPlayers={this.state.selectedplayersB} /> 
                                </Scroll>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item 
                    xs={6}>
                        <Grid container 
                        spacing={2} 
                        alignItems='center' 
                        direction='row' 
                        justify='space-between'
                        className='grid-item grid-item-bottom'>
                        <Grid item md={12} xs={12}>
                            <Grid container 
                            justify='space-between'
                            alignItems='center'>
                                <Grid item>
                                    <Typography 
                                        variant='h3'
                                        color='text.primary'>My Team</Typography>
                                </Grid>
                                <Grid item>
                                    <Button 
                                        variant='outlined' 
                                        className='button button-primary' 
                                        color='inherit'
                                        onClick = {this.onClearClickB}>Clear</Button>
                                </Grid>
                            </Grid> 
                        </Grid>
                        <Grid item 
                            xs={12}>
                            <Scroll>
                                <Team players = {this.state.selectedplayersB}/>
                            </Scroll>
                        </Grid>
                        </Grid>
                    </Grid>

                    {/* bottom button row */}
                    <Grid item
                    xs={12}>
                        <Grid container 
                            direction='row' 
                            justify='space-between'
                            className='grid-item grid-item-last'>
                            <Grid item md={12} xs={12}>
                                <Grid container justify='flex-end'>
                                    <Grid item>
                                    <DoneToss 
                                    onClick = {this.onDoneClickA}
                                    onSubmit = {()=>{this.onRouteChange('Dashboard')}} 
                                    onToggle = {this.tossPopUp} 
                                    teamA={this.state.selectedplayersA} 
                                    teamB={this.state.selectedplayersB} 
                                    teamAname = {this.state.TeamAName} 
                                    teamBname = {this.state.TeamBName}
                                    toss = {this.state.toss}
                                    choice={this.state.choice}
                                    history={this.props.history}
                                    overNumber={this.state.overNumber}/>
                                    </Grid>
                                </Grid>
                            </Grid>
                                
                            </Grid>
                    </Grid>
                    

                </Grid>

            </Container>
            );
    }

}

export default withRouter(TeamPage);