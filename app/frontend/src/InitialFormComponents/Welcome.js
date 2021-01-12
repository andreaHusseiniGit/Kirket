import React from 'react';
import Button from '@material-ui/core/Button';
import jwt from 'jsonwebtoken';
import {
    Link,
    withRouter
  } from "react-router-dom";

class Welcome extends React.Component {

    constructor(props) {
        super(); 
        this.state = {
            signInEmail: '',
            signInPassword: ''
        }

    }


    onSubmitSignIn = () => {
        this.props.history.push({
            pathname:'/Team'
        });
        console.log(this.state);
    }
render() {
    const user = jwt.decode(localStorage.getItem('token')).user;
    console.log('here is teh suer');
    console.log(user);
    return(
        <>
        <h1>Hello how are you {user.name}</h1>
        <h1> This is ur x entry {user.entries}</h1>
        <Button
            variant='outline'
            color='inherit'
            onClick = {this.onSubmitSignIn}
            className = "button button-primary">Start New Game</Button>
        <Button 
            variant='outline'
            color='inherit'
            component={Link}
            to='/'
            className = "button button-primary">Log out</Button>
        </>
    );

}

}

export default withRouter(Welcome);