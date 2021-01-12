import React, {useState} from 'react';
import Popup from "reactjs-popup";
import Button from '@material-ui/core/Button';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

const DeleteMatch = () => {

    const [open, setOpen] = useState(false);

    return ( <Button variant='outlined'
                className='button button-primary'
                color='inherit'
                onClick={() => setOpen(!open)}>
                Delete Match
                <Popup 
                    position="right center" 
                    open = {open}>
                    <div className = 'popup popup-delete center'>
                        <h3>Are you sure?</h3>
                        <Button className='button button-primary'
                        variant='outlined'
                        color='inherit'
                        component={Link}
                        to='/welcome'>Yes</Button>
                        <Button className='button button-primary button-cancel'
                        variant='outlined'
                        color='inherit'
                        onClick={() => setOpen(false)}>Cancel</Button>
                    </div>
                </Popup>
            </Button>

    )
}

export default DeleteMatch;