import React, { Component } from 'react'
import Question from '../Question/NewQuestion'
import cssClasses from './NewSurvey.css'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

class NewSurvey extends Component {
    state = {
        name: null,
        description: null,
        icon: null,
        expiry: Date.now(),
        questions: []
    }

    handleDataChange = event => {
        this.setState({
            expiry: event
        })
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        return (
            <div className={cssClasses.NewSurvey}>
                <h1>Create new Survey</h1>
                <label> Survey name: </label><input name='name' onChange={this.handleChange}/>
                <label> Description: </label><input name='description' onChange={this.handleChange}/>
                <label> Icon: </label><input name='icon' onChange={this.handleChange}/>
                <label> Date of Expiry: </label>
                <DatePicker selected={this.state.expiry}
                            onChange={this.handleDataChange}
                            shouldCloseOnSelect={false}
                            todayButton={"Today"}
                            minDate={new Date()}/>
                <Question/>
                <Question/>
                <Question/>
                <button className={cssClasses.SubmitButton}>Submit</button>
            </div>
        )
    }
}

export default NewSurvey
