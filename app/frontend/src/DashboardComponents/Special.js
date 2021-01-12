import React from "react";
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
 
  const Special = (props) => 
  {
  
  
  return (<Button className={`button button-grid ${props.highlighted==='special'&&'active'}`}
  style={{border: '1px solid white'}}
  disabled = {props.disabled}
  onClick = {props.onClick}
  >      
    <FormControl className='multiple-select'>
        <InputLabel htmlFor="grouped-select">Specials</InputLabel>
            <Select defaultValue="Specials" id="grouped-select">
            <MenuItem value="Specials">
                <em>Specials</em>
            </MenuItem>
            <ListSubheader>Runs Scored</ListSubheader>
                <MenuItem value={'5 runs'}>5 runs</MenuItem>
                <MenuItem value={'7 runs'}>7 runs</MenuItem>
                <MenuItem value={'Custom'}><input placeholder='number of runs'></input></MenuItem>
            <ListSubheader>Others</ListSubheader>
                <MenuItem value={'Batsman injured'}>Batsman injured</MenuItem>
                <MenuItem value={'Batsman retired'}>Batsman retired</MenuItem>
                <MenuItem value={'Bowler injured'}>Bowler injured</MenuItem>
                <MenuItem value={'Rain'}>Rain</MenuItem>
                <MenuItem value={'End game'}>End game</MenuItem>
            </Select>
      </FormControl>

  </Button>
  )
  };
  
  export default Special;