import React, {PropTypes, Component} from 'react';
import './LoginForm.css'
class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: '',
            username: ''
        }
    }

    onSubmit(e) {
        e.preventDefault();
        this.props.performLogin(
            this.state.username,
            this.state.password
        )
    }

    render() {
        return (
                <form  onSubmit={this.onSubmit.bind(this)}>
                    <input placeholder="Username" type="text" value={this.state.username}
                           onChange={(event) => {
                               this.setState({...this.state, username: event.target.value})
                           }}/>
                    <input placeholder="Password" type="password" value={this.state.password}
                           onChange={(event) => {
                               this.setState({...this.state, password: event.target.value})
                           }}/>
                    <input id="login" type="submit" value="Войти"/>
                </form>

        );
    }
}

LoginForm.propTypes = {
    performLogin: PropTypes.func.isRequired
};

export default LoginForm;
