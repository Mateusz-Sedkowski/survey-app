import React, { Component } from 'react'
import { API } from "aws-amplify";
import { Formik, Field, Form } from 'formik'
import * as Yup from 'yup'
import { S3Image } from "aws-amplify-react";
import classes from './Survey.module.scss'
import InputFeedback from './InputFeedback'

const RadioButton = ({
    field: { name, value, onChange, onBlur },
    id,
    label,
    className,
    ...props
}) => {
    return (
        <div>
            <input
                name={name}
                id={id}
                type="radio"
                value={id} // could be something else for output?
                checked={id === value}
                onChange={onChange}
                onBlur={onBlur}
                {...props}
            />
            <label htmlFor={id}>{label}</label>
        </div>
    );
};

const RadioButtonGroup = ({
    value,
    error,
    touched,
    id,
    label,
    className,
    children
}) => {
    return (
        <div>
            <fieldset>
                <legend>{label}</legend>
                {children}
                <div className={classes.Error}>
                    {touched && <InputFeedback error={error} />}
                </div>
            </fieldset>
        </div>
    );
};

class Survey extends Component {
    state = {
        survey: null,
        answers: [],
        error: false,
        loading: true,
    }

    componentDidMount() {
        API.get('opinionPollApi', `${this.props.location.pathname}`)
            .then(response => {
                console.log("Surveys", response)
                this.setState({
                    survey: response.body,
                    loading: false
                })
                console.log(this.state)
            })
            .catch(error => {
                this.setState({ error: true })
                console.log(error)
            })
    }

    sendAnswerHandler = async values => {
        let myInit = {
            body: {
                answer: {
                    answers: values
                }
            }
        }
        this.setState({ isLoading: true });
        await API.post('opinionPollApi', `${this.props.location.pathname}/answers`, myInit)
            .then(_ => {
                this.setState({ isLoading: false });
                console.log("Done")
            }, rejected => {
                console.log("Rejected", rejected); //TODO REMOVE AT END
            })
    }

    render() {
        let survey = null
        if (this.state.survey) {
            let initialValue = {}
            let initialShape = {}
            this.state.survey.Questions.forEach(question => {
                initialValue[question['UUID']] = ''
                initialShape[question['UUID']] = Yup.string().required('Select an answer.')
            })
            survey = (<div>
                {this.state.survey.Icon ? <S3Image imgKey={this.state.survey.Icon} alt="Survey icon" /> : null}
                <h3 className={classes.Name}>{this.state.survey.Name}</h3>
                <div className={classes.Expiry}>Fill this survey until: <span>{new Date(this.state.survey.Expiry).toLocaleDateString()}</span></div>
                <p>{this.state.survey.Description}</p>
                <h4>Survey Questions</h4>
                <Formik
                    initialValues={initialValue}
                    validationSchema={Yup.object().shape(initialShape)}
                    onSubmit={values => {
                        const answers = Object.keys(values).map((key) => {
                            return {
                                question: key,
                                answer: values[key]
                            }
                        })
                        this.sendAnswerHandler(answers)
                    }}
                >
                    {({
                        handleSubmit,
                        setFieldValue,
                        setFieldTouched,
                        values,
                        errors,
                        touched,
                        isSubmitting
                    }) => (
                            <Form>
                                <div className='form-group'>
                                    {this.state.survey.Questions.map((question, questionIndex) => {
                                        return (
                                            <RadioButtonGroup
                                                id={question.UUID}
                                                label={`Question #${questionIndex + 1}: ${question.question}`}
                                                value={values.question}
                                                error={errors[question.UUID]}
                                                touched={touched[question.UUID]}
                                                key={questionIndex}
                                            >
                                                {question.answers.map((answer, answerIndex) => {
                                                    return (
                                                        <Field
                                                            component={RadioButton}
                                                            name={question.UUID}
                                                            id={answer.UUID}
                                                            label={answer.name}
                                                            key={answerIndex}
                                                        />
                                                    )
                                                })}
                                            </RadioButtonGroup>
                                        )
                                    })}
                                </div>
                                <div className={classes.SubmitButton}>
                                    <button type="submit" disabled={isSubmitting}>
                                        Submit
                                </button>
                                </div>
                            </Form>
                        )}
                </Formik>
            </div>)
        }

        return (
            <div>
                <h1>Survey Details</h1>
                {survey}
            </div>
        )
    }
}

export default Survey
