import React, {Component} from 'react';
import cssClasses from './Settings.css'

class Settings extends Component {
    state = {
        user: this.props.user
    }

    handleChange = event => {
        this.setState({
            user: {
                ...this.state.user,
                [event.target.name]: event.target.value
            }
        })
    }

    render() {
        return (
            <div className={cssClasses.Settings}>
                <h1>Edit Personal Data</h1>
                <label> First Name: </label><input name='first_name' onChange={this.handleChange}/>
                <label> Last Name: </label><input name='last_name' onChange={this.handleChange}/>
                <button className={cssClasses.SubmitButton}>Submit</button>
            </div>
        )
    }
}

export default Settings