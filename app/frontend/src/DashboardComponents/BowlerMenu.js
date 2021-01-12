import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


const BowlerMenu = (props) => {
    const [state, setState] = React.useState({
        bowler: ''
      });
    

    const handleChange = (event) => {
        const name = event.target.name;
        // props.onChangeBowler(event.target.value)
        props.Bowler(props.bowlers[event.target.value])
        setState({
          ...state,
          [name]: event.target.value,
        });
        
      };

    const menuItem = props.bowlers&&props.bowlers.length>0&&props.bowlers.map((player, i) => {
        if (props.bowlers&&props.bowlers.length>0) {
          return <option 
            value={i}
            key={i}>
            {props.bowlers[i].name}
            </option>
        } else if (props.bowlers&&props.bowlers.length===0) {
          return <option key={i}>No Players</option>
        }
      })

    return (
        <FormControl variant="outlined">
        <InputLabel htmlFor="outlined-age-native-simple" style={{color: 'white'}}>First bowler</InputLabel>
        <Select
          native
          value={state.bowler}
          onChange={handleChange}
          label="Batsman"
          inputProps={{
            name: 'bowler',
            id: 'outlined-age-native-simple',
          }}
        >
          <option aria-label="None" value="" />
          {menuItem}
        </Select>
      </FormControl>
    )
}

export default BowlerMenu;