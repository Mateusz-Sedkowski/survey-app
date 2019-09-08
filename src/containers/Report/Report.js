import React, {Component} from 'react'
import {API} from "aws-amplify";
import {S3Image} from "aws-amplify-react";
import classes from './Report.module.scss'

const colors = [
    '#E5BC75',
    '#DB9195',
    '#9AC3BD',
    '#95B6D2',
    '#E8A57A',
    '#9B97C7',
    '#A2A2B1'
]

class Report extends Component {
    state = {
        report: null,
        survey: null,
        error: false,
        loading: true
    }

    handleGetReport = async () => {
        await API.get('opinionPollApi', `${this.props.location.pathname}`)
            .then(response => {
                console.log("Report from API", response.body.poll)
                this.setState({
                    report: {
                        ...response.body.report[0]
                    },
                    survey: response.body.poll,
                    loading: false
                })
            })
            .catch(error => {
                this.setState({error: true})
                console.log(error)
            })
    }

    componentDidMount() {
        this.handleGetReport()
    }

    render() {
        console.log('Survey', this.state.survey)
        console.log('Report', this.state.report)
        let survey = null
        if (this.state.survey && this.state.report) {
            survey = (<div>
                <h3> {this.state.survey.Name} </h3>
                {this.state.survey.Icon ? <S3Image imgKey={this.state.survey.Icon} alt="Survey icon"/> : null}
                <p> {this.state.survey.Description} </p>
                <p> Expiration date: {new Date(this.state.survey.Expiry).toLocaleDateString()} </p>
                <p> Total answers: {Number(this.state.report.Answer_Count)} </p>
                <h4>Questions</h4>
                <div className={classes.Questions}>
                    {this.state.report.Questions.map((question, questionIndex) => {
                        return (
                            <div className={classes.Question}>
                                <span
                                    className={classes.header}> {`Question #${questionIndex + 1}: ${question.value}`} </span>
                                <div className={classes.Answers}>
                                    {question.answers.map((answer, answerIndex) => {
                                        return (
                                            <div className={classes.Answer}>
                                                <div className={classes.UserCount}>
                                                    <span> {Number(answer.count)} </span>
                                                    <span> USERS </span>
                                                </div>
                                                <div className={classes.AnswerField}>
                                                    <div className={classes.AnswerFieldBackground}
                                                         style={
                                                             {
                                                                 backgroundColor: colors[answerIndex],
                                                                 width: `${answer.count / this.state.report.Answer_Count * 100}%`
                                                             }}>
                                                    </div>
                                                    <span className={classes.AnswerFieldValue}> {answer.value} </span>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>)
        }

        return (
            <div>
                {survey}
            </div>
        )
    }
}

export default Report