import React, {Component} from 'react';
import classes from './NewQuestions.module.scss'

class NewQuestions extends Component {
    state = {
        questions: [
            {
                question: null,
                answers: [
                    {
                        name: null
                    },
                    {
                        name: null
                    }
                ]
            }
        ]
    }

    handleNameChange = (event, index) => {
        let changedQuestions = this.state.questions.map((question, i) => {
            if (i === index) return {question: event.target.value, answers: question.answers}
            return question
        })
        this.setState({
            questions: changedQuestions
        })

        this.props.setFieldValue("questions", this.state.questions)
    }

    handleAnswerChange = async (event, questionIndex, answerIndex) => {
        let updatedQuestions = await this.state.questions.map((question, index) => {
            if (index === questionIndex) {
                let changedAnswers = question.answers.map((answer, index) => {
                    if (index === answerIndex) return {name: event.target.value}
                    return answer
                })
                return {...question, answers: changedAnswers}
            }
            return question
        })
        await this.setState({
            questions: updatedQuestions
        })
        await this.props.setFieldValue("questions", this.state.questions)
    }

    handleAddAnswer = (questionIndex) => {
        let updatedQuestions = this.state.questions.map((question, index) => {
            if (index === questionIndex) return {...question, answers: [...question.answers, {name: null}]}
            return question
        })
        this.setState({
            questions: updatedQuestions
        })
        this.props.setFieldValue("questions", this.state.questions)
    }

    handleAddQuestion = () => {
        this.setState({
            questions: [
                ...this.state.questions,
                {
                    question: null,
                    answers: [
                        {
                            name: null
                        },
                        {
                            name: null
                        }
                    ]
                }
            ]
        })
        this.props.setFieldValue("questions", this.state.questions)
    }

    handleDeleteAnswer = (questionIndex, answerIndex) => {
        let updatedQuestions = this.state.questions.map((question, index) => {
            if (index === questionIndex) question.answers.splice(answerIndex, 1)
            return question
        })
        this.setState({
            questions: updatedQuestions
        })
        this.props.setFieldValue("questions", this.state.questions)
    }

    handleDeleteQuestion = (questionIndex) => {
        this.state.questions.splice(questionIndex, 1)
        this.setState({
            questions: [
                ...this.state.questions
            ]
        })
        this.props.setFieldValue("questions", this.state.questions)
    }

    render() {
        let questions = this.state.questions.map((question, questionIndex) => {
            let deleteQuestionButton = <svg
                viewBox="0 0 16 16"
                xmlns="http://www.w3.org/2000/svg"
                onClick={() => {
                    this.handleDeleteQuestion(questionIndex)
                }}
            >
                <path d="M4.02252 11.9775L11.9775 4.02252"/>
                <path d="M4.02252 4.02252L11.9775 11.9775"/>
            </svg>

            let answers = question.answers.map((_, answerIndex) => {
                let deleteAnswerButton = <div className={classes.closeIcon}>
                    <svg
                        viewBox="0 0 16 16"
                        xmlns="http://www.w3.org/2000/svg"
                        onClick={() => {
                            this.handleDeleteAnswer(questionIndex, answerIndex)
                        }}
                    >
                        <path d="M4.02252 11.9775L11.9775 4.02252"/>
                        <path d="M4.02252 4.02252L11.9775 11.9775"/>
                    </svg>
                </div>

                return <div className={classes.AnswerInput} key={answerIndex}>
                    <input onChange={event => {
                        this.handleAnswerChange(event, questionIndex, answerIndex)
                    }}
                           placeholder={`Insert #${answerIndex + 1} answer`}
                    />
                    {answerIndex > 1 ? deleteAnswerButton : null}
                </div>
            })
            return <div className={classes.Question} key={questionIndex}>
                <div className={classes.closeIcon}>
                    {questionIndex > 0 ? deleteQuestionButton : null}
                </div>
                <div className={classes.header}>
                    <span> Question #{questionIndex + 1} </span>
                </div>
                <div className={classes.QuestionInput}>
                    <input onChange={event => {
                        this.handleNameChange(event, questionIndex)
                    }} placeholder="Insert your question"/>
                </div>
                <div className={classes.AnswerHeader}>
                    <span> Answers </span>
                </div>
                {answers}
                <button type="button" onClick={() => {
                    this.handleAddAnswer(questionIndex)
                }}
                        className={classes.AddAnswerButton}
                >Add Answer
                </button>
            </div>
        })
        console.log("Answers", this.state.questions)

        return (
            <>
                <div className={classes.QuestionsHeader}>
                    <h3>Questions: </h3>
                    <button type="button" className={classes.AddQuestionButton} onClick={() => this.handleAddQuestion()}>
                        Add Question
                    </button>
                </div>
                <div className={classes.Questions}>
                    {questions}
                </div>
            </>
        )
    }
}

export default NewQuestions
