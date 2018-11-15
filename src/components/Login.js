import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { userLoggedIn } from '../redux/reducer';
import { Redirect } from 'react-router-dom';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: ''
        }
        this.handleClick = this.handleClick.bind(this);
    }
    handleInput(e) {
        const { name, value } = e.target;
        this.setState({[name]: value});
    }
    handleClick() {
        const { email, password } = this.state;
        axios.post('/auth/login', { email, password}).then(res => {
            const user = res.data;
            this.props.userLoggedIn(user);
        }).catch(err => console.log(err.response.data));
    }
    render() {
        return(
            <div className="Login">
                <h1>Login</h1>
                {!this.props.isAuthenticated ?
                    <div>
                        <input type="text" name="email" placeholder="email" value={this.state.email} onChange={e => this.handleInput(e)} />
                        <input type="password" name="password" placeholder="password" value={this.state.password} onChange={e => this.handleInput(e)} />
                        <button onClick={this.handleClick}>Submit</button>
                    </div>
                :
                    <Redirect to="/" />
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.isAuthenticated
    }
}

export default connect(mapStateToProps, {userLoggedIn})(Login);