import React, {useState} from "react";
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Grid } from '@material-ui/core';
import Popup from "reactjs-popup";
import NativeSelect from '@material-ui/core/NativeSelect';
import FormHelperText from '@material-ui/core/FormHelperText';
import BatsmanMenu from "./BatsmanMenu";
 
 
const Out = (props) => {

    const [open, setOpen] = useState(false);
    const [eventValue, setEventValue] = useState('');
    const [runsValue, setRunsValue] = useState('');
    const [display, setDisplay] = useState('Out');
    const [out, setOut] = useState('');

    const eventChange = (event) => {
        setEventValue(event.target.value)
        
    };

    const runsChange = (event) => {
        setRunsValue(event.target.value)
    }

    const handleChange = () => {
        // props.onChangeExtras(eventValue, runsValue)
        const penaltyRuns = eventValue === "Wide" || eventValue === "Noball" ? "1" : "0"
        setDisplay(out + " " + eventValue  + " " + runsValue)
        props.onChangeOut(eventValue, runsValue)
    }

return (<>
<Button className={`button button-grid ${props.highlighted==='out'&&'active'}`}
style={{border: '1px solid white'}}
  disabled = {props.disabled}
  onClick = {()=> {
    props.onClick();
    setOpen(true)}
    }>{display}</Button>   

    <Popup
        position="top center"
        open = {open}>
         <div className = 'popup-scroll-toss center toss-wrapper extras-wrapper'>
            <button 
                className='button button-close'
                style={{marginBottom: '10px'}} 
                onClick={props.close}>x</button>

        <Grid
        container
        direction="row"
        justify="center"
        alignItems="stretch"
        style={{marginLeft:'20px'}}>
        <Grid item xs={5}>
            <BatsmanMenu 
            className='description'
            batsmen={props.batsmen}
            onChangeBatsman = {(name)=>{}}
            Batter = {(selectedBatter) => {setOut(selectedBatter.name)}}
            strike = "Striker"
            />
        </Grid>
        <Grid item xs={5}>
                <FormControl 
                className='multiple-select extras-select' 
                variant="outlined"
                style={{width: '150px !important'}}>
                    <InputLabel 
                    htmlFor="outlined-age-native-simple" 
                    style={{color: 'white'}}>
                        Out
                    </InputLabel>
                    <NativeSelect
                    value={eventValue}
                    onChange={eventChange}
                    label="Extra"
                    inputProps={{
                        name: 'extra',
                        id: 'age-native-label-placeholder',
                    }}
                    >
                        <option aria-label="None" value="" />
                        <option value={'BOWLED'}>Bowled</option>
                        <option value={'LBW'}>LBW</option>
                        <option value={'Stumped Fair'}>Stumped off fair ball</option>
                        <option value={'Stumped Wide'}>Stumped off wide</option>
                        <option value={'Caught'}>Caught</option>
                        <option value={'Run out'}>Run out</option>
                        <option value={'Obstructing the field'}>Obstructing the field</option>
                        <option value={'Hit wicket'}>Hit wicket</option>
                        <option value={'Hit ball twice'}>Hit ball twice</option>
                        <option value={'Timed out'}>Timed out</option>
                        <option value={'Handled ball'}>Handled ball</option>
                        <option value={'Mankad'}>Mankad</option>
                    </NativeSelect>
                    <FormHelperText
                        style={{color:'rgba(255, 226, 3)'}}>
                        {eventValue === "Wide" || eventValue === "Noball" ? "1 penalty run awarded" : 'No penalty runs'}
                    </FormHelperText>
                </FormControl>
            </Grid>

            <Grid item xs={2}>
                <FormControl 
                className='multiple-select' 
                variant="outlined"
                style={{width: '150px !important'}}>
                    <InputLabel 
                    htmlFor="outlined-age-native-simple" 
                    style={{color: 'white'}}>
                        Runs scored
                    </InputLabel>
                    <NativeSelect
                    value={runsValue}
                    onChange={runsChange}
                    label="runs"
                    inputProps={{
                        name: 'extra',
                        id: 'age-native-label-placeholder',
                    }}
                    >
                    <option aria-label="None" value="" />
                    <option value={'0'}>0</option>
                    <option value={'1'}>1</option>
                    <option value={'2'}>2</option>
                    <option value={'3'}>3</option>
                    <option value={'4'}>4</option>
                    <option value={'5'}>5</option>
                    <option value={'6'}>6</option>
                    <option value={'7'}>7</option>
                    </NativeSelect>
                </FormControl>
            </Grid>
            
            <Grid item xs={12}>
                <Button
                className='button button-secondary'
                variant='outlined'
                onClick={() =>{
                    handleChange()
                    setOpen(false)
                }}>Confirm</Button>
            </Grid>

      </Grid>

    </div>
    </Popup>


    </>
)
};

export default Out;

// Things that need to be added to the this page, 
// - list of all the players for both caught and run out 
// - change of strike button 
// - 