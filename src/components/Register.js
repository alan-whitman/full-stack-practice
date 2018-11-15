import React, { Component } from 'react'

class Register extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
            password: ''
        }
    }
    render() {
        return(
            <div className="Register">
                <h1>Register</h1>
            </div>
        )
    }
}

export default Register;