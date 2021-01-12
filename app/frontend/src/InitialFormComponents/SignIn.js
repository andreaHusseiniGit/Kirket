import React from 'react';
import {
    Link,
    withRouter
  } from "react-router-dom";
  import Button from '@material-ui/core/Button';

class SignIn extends React.Component{

    constructor(props) {
        super(); 
        this.state = {
            signInEmail: '',
            signInPassword: ''
        }

    }

    componentDidMount() {
        //if the token exists - stay on that page 
        if (localStorage.getItem('token')){
            this.props.history.push({
                pathname:'/Welcome'
            });

        }
    }

    onEmailChange = (event) =>
    {
        this.setState({signInEmail: event.target.value})
    }

    onPasswordChange = (event) =>
    {
        this.setState({signInPassword: event.target.value})
    }

    onSubmitSignIn = () => {

        fetch('http://localhost:4000/auth/login', {
            method: 'post',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({
                email: this.state.signInEmail,
                password: this.state.signInPassword
            })
        })
        .then(response => response.json())
        .then(data => {
            
        if(data.token){
            localStorage.setItem('token', data.token);
            this.props.history.push({
                pathname:'/Welcome'
            });
        }
        })

    }
    render(){
        return (
            <article 
            className="br2 ba dark-gray-10 mv4 w-100 w-50-m w-25-l mw5 center shadow-5 signin">
                <main 
                className="pa4 black-80">
                    {/* <form>
                    className="measure"> */}
                        <fieldset 
                        id="sign_up" 
                        className="ba b--transparent ph0 mh0">
                        <legend 
                        className="f2 fw6 ph0 mh0 white">Sign In</legend>
                        <div 
                        className="mt3">
                            <label 
                            className="db fw6 lh-copy f6 white" 
                            for="email-address">Email</label>
                            <input 
                            className="pa2 input-reset ba bg-white w-100" 
                            type="text" 
                            name="email-address"  
                            id="email-address"
                            onChange = {this.onEmailChange}/>
                            
                        </div>
                        <div 
                        className="mv3">
                            <label 
                            className="db fw6 lh-copy f6 white" 
                            for="password">Password</label>
                            <input 
                            className="b pa2 input-reset ba bg-white w-100" 
                            type="password" 
                            name="password"  
                            id="password"
                            onChange = {this.onPasswordChange}
                            />
                        </div>
                        </fieldset>
                        <div>
                            <Button 
                            // component={Link}
                            // to={'/team'}
                            className="button button-primary" 
                            type="submit"
                            color='inherit'
                            variant='outlined'
                            onClick={this.onSubmitSignIn}
                            value="Sign in"> Sign in</Button>
                        </div>
                        <div className="lh-copy mt3">
                            <Button className="button button-secondary" 
                            color='inherit'
                            variant='outlined'
                            component={Link}
                            to={'/register'}
                            // onClick={()=> this.props.onRouteChange('Register')}
                            >Register</Button>
                        </div>
                    {/* </form> */}
                </main>
            </article>
    );

    }

}



export default withRouter(SignIn);

 
//     constructor (props) {
//          super()
    //     this.state = {
    //         username: '',
    //         usernameRegister: '',
    //         name: '',
    //         password:'',
    //         email: '',
    //         registerShow: false,
    //     }
    // }

    // onNameChange= (e) => {
    //     this.setState({name: e.target.value})
    // }

    // onPasswordChange = (e) => {
    //     this.setState({password: e.target.value})
    // }

    // onEmailChange = (e) => {
    //     this.setState({email: e.target.value})
    // }

    // onUsernameChange = (e) => {
    //     this.setState({username: e.target.value})
    // }

    // onUsernameChange2 = (e) => {
    //     this.setState({usernameRegister: e.target.value})
    // }

    // onRegisterClick = () => {
    //     this.setState({registerShow: true});
    //     console.log(this.state.registerShow);
    // }

    // render () {
    //     return (<>
    //             <h1>Sign In</h1>
    //             <div>
    //                 <input 
    //                 type='username'
    //                 placeholder='username'
    //                 onChange={this.onUsernameChange}></input>
    //             </div>
    //             <div>
    //                 <input 
    //                 type='password'
    //                 placeholder='password'
    //                 onChange={this.onPasswordChange}></input>
    //             </div>
    //             <div>
    //                 <button>Sign in</button>
    //             </div>
    //             <div>
    //                 <button onClick={this.onRegisterClick}>Register</button>
    //             </div>
    //             <div className={`register ${this.registerShow&&`active`}`}>
    //                 <h1>Register</h1>
    //                 <div>
    //                     <input 
    //                     type='username'
    //                     placeholder='username'
    //                     onChange={this.onUsernameChange2}></input>
    //                 </div>
    //                 <div>
    //                     <input 
    //                     type='name'
    //                     placeholder='Name'
    //                     onChange={this.onNameChange}></input>
    //                 </div>
    //                 <div>
    //                     <input 
    //                     type='email'
    //                     placeholder='Email'
    //                     onChange={this.onEmailChange}></input>
    //                 </div>
    //                 <div>
    //                     <input 
    //                     type='password'
    //                     placeholder='password'
    //                     onChange={this.onPasswordChange}></input>
    //                 </div>
    //             </div>
                
    //         </>