import React, {useState} from "react";
import Popup from "reactjs-popup";
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
 
 
const AddPlayer = (props) => {
    // // const teamName = props.players[1].team;
    // console.log(props.players);
    let playerdetails;
    // creating a new array cloned - not referencing props
    const [players, setPlayers] = useState(props.players);
    const [open, setOpen] = useState(false);
    const [teamName, setTeamName] = useState(props.teamName);
  

    if (props.players.length >0)
    {
      playerdetails = players.map((player,i) => {

        return  <div className='center' key={i}>
                  <input 
                    className = 'text input-player' 
                    placeholder ='Player Name' id = {`Player${i}`} 
                    value= {`${player.name}`} 
                    onChange={(e) => { 
                      const newPlayers = Object.assign([], players); 
                      newPlayers[i].name=e.target.value;
                      players[i].role = e.target.value;
                      setPlayers(newPlayers)}}></input>
                  <input 
                    type="radio" 
                    id={`playertype${i}`} 
                    name={`playertype${i}`} 
                    value="BATSMAN" 
                    checked = {player.role === 'BATSMAN'} 
                    onClick={(e) => { 
                      if (player.name.length > 0) {
                        const newPlayers = Object.assign([], players); 
                        newPlayers[i].role=e.target.value;
                        players[i].role = e.target.value;
                        setPlayers(newPlayers)
                      }
                    }}></input>
                  <label 
                    className = 'popup-label' 
                    for="Batsmen">Batsman</label>
                  <input 
                    type="radio" id={`playertype${i}`} 
                    name={`playertype${i}`} 
                    value="BOWLER" 
                    checked = {player.role === 'BOWLER'} 
                    onClick={(e) => { 
                      if (player.name.length >0){
                        const newPlayers = Object.assign([], players); 
                        newPlayers[i].role=e.target.value;
                        players[i].role = e.target.value;
                        setPlayers(newPlayers)
                      }
                    }}></input>
                  <label 
                    className = 'popup-label' 
                    for="Bowler">Bowler</label>
                  <input 
                    type="radio" 
                    id={`playertype${i}`} 
                    name={`playertype${i}`} 
                    value="ALLROUNDER" 
                    checked = {player.role === 'ALLROUNDER'} 
                    onClick={(e) => { 
                      if (player.name.length>0) {
                        const newPlayers = Object.assign([], players); 
                        newPlayers[i].role=e.target.value;
                        players[i].role = e.target.value;
                        setPlayers(newPlayers)
                      }
                    }}></input>
                  <label 
                    className = 'popup-label' 
                    for="Allrounder">All Rounder</label>
                </div>
      }
      
        )
    }
    else {
      playerdetails = players.map((_,i) => {
        return  <div className='center' key={i}>
                  <input 
                    className = 'text input-player' 
                    placeholder ='Player Name' 
                    id = {`Player${i}`}></input>
                  <input 
                    ype="radio" 
                    id={`playertype${i}`} 
                    name={`playertype${i}`} 
                    value="BATSMAN" 
                    checked = {players.role === 'BATSMAN'} 
                    onClick={(e) => { 
                      // if (player.name.length>0) {
                        const newPlayers = Object.assign([], players); 
                        newPlayers[i].role=e.target.value;
                        setPlayers(newPlayers)
                      
                    }}></input>
                  <label 
                    className = 'popup-label' 
                    for="batsmen">Batsman</label>
                  <input 
                    type="radio" id={`playertype${i}`} 
                    name={`playertype${i}`} 
                    value="BOWLER" 
                    checked = {players.role === 'BOWLER'} 
                    onClick={(e) => { 
                      // if (player.name.length>0) {
                        const newPlayers = Object.assign([], players); 
                        newPlayers[i].role=e.target.value;
                        setPlayers(newPlayers)
                      
                    }}></input>
                  <label 
                    className = 'popup-label' 
                    for="bowler popupLabel">Bowler</label>
                  <input 
                    type="radio" 
                    id={`playertype${i}`} 
                    name={`playertype${i}`} 
                    value="ALLROUNDER" 
                    checked = {players.role === 'ALLROUNDER'} 
                    onClick={(e) => { 
                      // if (player.name.length>0) {
                        const newPlayers = Object.assign([], players); 
                        newPlayers[i].role=e.target.value;
                        setPlayers(newPlayers)
                      
                    }}></input>
                  <label 
                    className = 'popup-label' 
                    for="allrounder">All Rounder</label>
                </div>
      }
      
        )
    }
  return(
    <> <Button 
        variant='outlined' 
        className='button button-secondary' 
        color='inherit' onClick={() => setOpen(!open)}>Add Players</Button>
    <Popup 
    position="right center" 
    open = {open}>
        <div className = 'popup popup-scroll center'>
            <button 
            className='button button-close' 
            onClick={() => setOpen(false)}>x</button>
            <Grid container 
            direction="row" 
            justify='center' 
            alignItems="center">
              <input 
              className = 'text popup-input center' 
              placeholder ='Team Name' 
              value = {teamName} 
              id = 'TeamName' 
              onChange= {(e) => {setTeamName(e.target.value)}} ></input>
            </Grid>
            <div className='center'>
                {playerdetails}
            </div>
            <Grid container 
            direction="row" 
            justify='center' 
            alignItems='center'>
              <Button 
              variant='outlined' 
              color='inherit' 
              className = 'button button-primary button-popup' 
              onClick = {() => {setOpen(false); props.onClick(players, teamName)}} >Save Changes</Button>
              <Button 
              variant='outlined' 
              color='inherit' 
              className = 'button button-secondary button-popup' 
              onClick = {() => {
                setPlayers([...players,{"id": players.length, "name":"", "role":""}])
                }} >Add Another Player</Button>
            </Grid>
                
        </div>
    </Popup>
    </>
  )
};

export default AddPlayer;