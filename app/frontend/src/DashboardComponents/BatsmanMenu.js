import React, {useState} from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


const BatsmanMenu = (props) => {

    const [state, setState] = useState({
      batsman: ''
    });
  
  const handleChange = (event) => {
      const name = event.target.name;
      // const selectedIndex = event.target.options.selectedIndex
      props.onChangeBatsman(event.target.value)
      props.Batter(props.batsmen[event.target.value])
      setState({
        ...state,
        [name]: event.target.value,
      });
    };

    const menuItem = props.batsmen&&props.batsmen.length>0&&props.batsmen.map((player, i) => {
      // const batter = JSON.stringify(props.batsmen[i])
      if (props.batsmen&&props.batsmen.length>0) {
        return <option 
          value={i}
          key={i}>
        {props.batsmen[i].name}
          </option>
      } else if (props.batsmen&&props.batsmen.length===0) {
        return <option key={i}>No Players</option>
      }
    })

    return (
        <FormControl variant="outlined">
        <InputLabel htmlFor="outlined-age-native-simple" style={{color: 'white'}}>{props.strike}</InputLabel>
        <Select
          native
          value={state.batsman}
          onChange={handleChange}
          label="Batsman"
          inputProps={{
            name: 'batsman',
            id: 'outlined-age-native-simple',
          }}
        >
          <option aria-label="None" value="" />
          {menuItem}
        </Select>
      </FormControl>
    )
}

export default BatsmanMenu;