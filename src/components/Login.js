import React, { Component } from 'react'

class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: ''
        }
    }
    render() {
        return(
            <div className="Register">
                <h1>Login</h1>
            </div>
        )
    }

}

export default Login;