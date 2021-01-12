import React, {useState} from "react";
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { runInThisContext } from "vm";
import { Grid } from '@material-ui/core';
import Popup from "reactjs-popup";
import NativeSelect from '@material-ui/core/NativeSelect';
import FormHelperText from '@material-ui/core/FormHelperText';
 

  const Extra = (props) => 
  {
    
    // const [state, setState] = useState({
    //     extraEvent: ''
    // })

    const [open, setOpen] = useState(props.open);
    const [eventValue, setEventValue] = useState('');
    const [runsValue, setRunsValue] = useState('');
    const [display, setDisplay] = useState('Extras');
    const [penaltyRuns, setPenaltyRuns] = useState('');

    const eventChange = (event) => {
        // console.log('event: ', event.target.value)
        setEventValue(event.target.value)
    };

    const runsChange = (event) => {
        // console.log('runs: ', event.target.value)
        setRunsValue(event.target.value)
    }

    const handleChange = () => {
        props.onChangeExtras(eventValue, runsValue)
        setPenaltyRuns(eventValue === "Wide" || eventValue === "Noball" ? "1" : "0")
        setDisplay(eventValue + ": " + penaltyRuns + " + " + runsValue)
    }

  
  return (<>
    <Button className={`button button-grid ${props.highlighted==='extra'&&'active'}`}
    style={{border: '1px solid white'}}
    disabled = {props.disabled}
    onClick = {props.onClick}>
        {display}
    </Button>

    <Popup
        position="top center"
        open = {props.open}>
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
            <Grid item xs={4}>
                <FormControl 
                className='multiple-select extras-select' 
                variant="outlined"
                style={{width: '150px !important'}}>
                    <InputLabel 
                    htmlFor="outlined-age-native-simple" 
                    style={{color: 'white'}}>
                        Extras
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
                    <option value={'WIDE'}>Wide</option>
                    <option value={'NOBALLBYES'}>Noball with byes</option>
                    <option value={'NOBALLLEGBYES'}>Noball with legbyes</option>
                    <option value={'NOBALL'}>Noball with runs</option>
                    <option value={'BYES'}>Bye</option>
                    <option value={'LEGBYES'}>Legbye</option>
                    </NativeSelect>
                    <FormHelperText
                        style={{color:'rgba(255, 226, 3)'}}>
                        {eventValue === "WIDE" || eventValue.indexOf("NO") != -1 ? "1 penalty run awarded" : 'No penalty runs'}
                    </FormHelperText>
                </FormControl>
            </Grid>
                
            <Grid item xs={4}>
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

            <Grid item xs={4}>
                <Button
                className='button button-secondary'
                variant='outlined'
                onClick={() =>{
                    handleChange()
                    props.close()
                }}>Confirm</Button>
            </Grid>
        </Grid>

        </div>
      </Popup>

      
      </>
  )
  };
  
  export default Extra;


    {/* <FormControl className='multiple-select' variant="outlined" style={{minWidth:'150px'}}>
        <InputLabel htmlFor="grouped-select" style={{color: 'white'}}>Extras</InputLabel>
            <Select id="grouped-select"
                className='menu-inputs-main'
                value={clickedValue}>
                <MenuItem value="Extras">
                    <em>Extras</em>
                </MenuItem>
            <InputLabel htmlFor="grouped-select" style={{color: 'white'}}>Wide: 1 run penalty</InputLabel>
            <Select
                className='menu-inputs'
                label='wides'
                id="grouped-select"
                variant="outlined" 
                onChange={handleChange}>
                <MenuItem value={'WIDE - 0'}>0 additional runs</MenuItem>
                <MenuItem value={'WIDE - 1'}>1 additional run</MenuItem>
                <MenuItem value={'WIDE - 2'}>2 additional runs</MenuItem>
                <MenuItem value={'WIDE - 3'}>3 additional runs</MenuItem>
                <MenuItem value={'WIDE - 4'}>4 additional runs</MenuItem>
                <MenuItem value={'WIDE - 6'}>6 additional runs</MenuItem>
                {
                    // there might need ot be another input that manually does it 
                }
                </Select>

            <InputLabel htmlFor="grouped-select" style={{color: 'white'}}>Legbyes</InputLabel>
                <Select 
                className='menu-inputs'
                id="grouped-select"
                variant="outlined" 
                onChange={handleChange}>
                    <MenuItem value={'LEGBYES - 1'}>1 run</MenuItem>
                    <MenuItem value={'LEGBYES - 2'}>2 runs</MenuItem>
                    <MenuItem value={'LEGBYES - 3'}>3 runs</MenuItem>
                    <MenuItem value={'LEGBYES - 4'}>4 runs</MenuItem>
                    <MenuItem value={'LEGBYES - 6'}>6 runs</MenuItem>
                </Select>
            
            <InputLabel htmlFor="grouped-select" style={{color: 'white'}}>Byes</InputLabel>
                <Select 
                    className='menu-inputs'
                    id="grouped-select"
                    variant="outlined" 
                    onChange={handleChange}>
                    <MenuItem value={'BYES - 1'}>1 run</MenuItem>
                    <MenuItem value={'BYES - 2'}>2 runs</MenuItem>
                    <MenuItem value={'BYES - 3'}>3 runs</MenuItem>
                    <MenuItem value={'BYES - 4'}>4 runs</MenuItem>
                    <MenuItem value={'BYES - 6'}>6 runs</MenuItem>
                </Select>

            <InputLabel htmlFor="grouped-select" style={{color: 'white'}}>Noball: 1 run penalty (with runs)</InputLabel>
                <Select
                    className='menu-inputs'
                    id="grouped-select"
                    variant="outlined" 
                    onChange={handleChange}>
                    <MenuItem value={'NOBALL - 0'}>0 runs</MenuItem>
                    <MenuItem value={'NOBALL - 1'}>1 run</MenuItem>
                    <MenuItem value={'NOBALL - 2'}>2 runs</MenuItem>
                    <MenuItem value={'NOBALL - 3'}>3 runs</MenuItem>
                    <MenuItem value={'NOBALL - 4'}>4 runs</MenuItem>
                    <MenuItem value={'NOBALL - 6'}>6 runs</MenuItem>
                </Select>
                <InputLabel htmlFor="grouped-select" style={{color: 'white'}}>Noball: 1 run penalty (with byes)</InputLabel>
                <Select
                    className='menu-inputs'
                    id="grouped-select"
                    variant="outlined" 
                    onChange={handleChange}>
                    <MenuItem value={'NOBALLBYES - 1'}>1 run</MenuItem>
                    <MenuItem value={'NOBALLBYES - 2'}>2 runs</MenuItem>
                    <MenuItem value={'NOBALLBYES - 3'}>3 runs</MenuItem>
                    <MenuItem value={'NOBALLBYES - 4'}>4 runs</MenuItem>
                    <MenuItem value={'NOBALLBYES - 6'}>6 runs</MenuItem>
                </Select>
                <InputLabel htmlFor="grouped-select" style={{color: 'white'}}>Noball: 1 run penalty (with legbyes)</InputLabel>
                <Select
                    className='menu-inputs'
                    id="grouped-select"
                    variant="outlined" 
                    onChange={handleChange}>
                    <MenuItem value={'NOBALLLEGBYES - 1'}>1 run</MenuItem>
                    <MenuItem value={'NOBALLLEGBYES - 2'}>2 runs</MenuItem>
                    <MenuItem value={'NOBALLLEGBYES - 3'}>3 runs</MenuItem>
                    <MenuItem value={'NOBALLLEGBYES - 4'}>4 runs</MenuItem>
                    <MenuItem value={'NOBALLLEGBYES - 6'}>6 runs</MenuItem>
                </Select>

            </Select>
      </FormControl> */}

  