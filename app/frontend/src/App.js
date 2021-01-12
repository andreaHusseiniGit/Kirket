import React from 'react';
import Particles from 'react-particles-js';
import SignIn from './InitialFormComponents/SignIn.js';
import Register from './InitialFormComponents/Register.js';
import TeamPage from './TeamPageComponents/TeamPage.js';
import Dashboard from './DashboardComponents/Dashboard.js';
import particleParams from './Styles/ParticleParams.js'
import Welcome from './InitialFormComponents/Welcome.js';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";



class App extends React.Component {

    constructor () {
        super()
        this.state = {
            route: 'SignIn',
            user:{
            id: '',
            name: '',
            email: '',
            password: '', 
            entries: 0,
            joined: ''

            }

        }
    }

    loadUser = (data) => {
        this.setState({user: {
            id: data.id,
            name: data.name,
            email: data.email,
            password: data.password, 
            entries: data.entries,
            joined: data.joined
        }})
    }

    render () {
        return (<>
            <Particles className='particles' 
                params={particleParams} />
        <Router >
            <Switch>
                <Route exact path="/">
                    <SignIn history={this.props.history}/>
                </Route>
                <Route path="/register">
                    <Register 
                    loadUser = {this.loadUser}
                    history={this.props.history}/> 
                </Route>
                <Route path="/team">
                    <TeamPage history={this.props.history}/>
                </Route>
                <Route path="/dashboard">
                    <Dashboard history={this.props.history}/>
                </Route>
                <Route path="/welcome">
                    <Welcome history={this.props.history}/>
                </Route>
            </Switch>
        </Router>
        </>
           
        );
    }
}


export default App;