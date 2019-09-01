import React, {Component} from 'react'
import cssClasses from './Survey.css'
import {API} from "aws-amplify";
import {Formik, Field, Form} from 'formik'
import classNames from "classnames"

const InputFeedback = ({error}) =>
    error ? <div className={classNames("input-feedback")}>{error}</div> : null;

const RadioButton = ({
                         field: {name, value, onChange, onBlur},
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
                className={classNames("radio-button")}
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
    const classes = classNames(
        "input-field",
        {
            "is-success": value || (!error && touched), // handle prefilled or user-filled
            "is-error": !!error && touched
        },
        className
    );
    return (
        <div className={classes}>
            <fieldset>
                <legend>{label}</legend>
                {children}
                <InputFeedback error={error}/>
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
                this.setState({error: true})
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
        this.setState({isLoading: true});
        await API.post('opinionPollApi', `${this.props.location.pathname}/answers`, myInit)
            .then(_ => {
            this.setState({isLoading: false});
            console.log("Done")
        }, rejected => {
            console.log("Rejected", rejected); //TODO REMOVE AT END
        })
    }

    render() {
        let survey = null
        if (this.state.survey) {
            console.log("Survey?")
            survey = (<div>
                <h3> {this.state.survey.Name} </h3>
                {this.state.survey.Icon ? <img src={this.state.survey.Icon} width="40px" height="40px"/> : null}
                <p> {this.state.survey.Description} </p>
                <p> Fill this survey until: {new Date(this.state.survey.Expiry * 1000).toLocaleString()} </p>
                <h4>Survey Questions</h4>
                <Formik
                    initialValues={{}}
                    validateOnChange={false}
                    validateOnBlur={false}
                    validate={values => {
                        let errors = {};
                        this.state.survey.Questions.map((question) => {
                            if (!values[question.UUID] || values[question.UUID] === '') {
                                errors[question.UUID] = 'This field is required.'
                            }
                        })
                        return errors;
                    }}
                    onSubmit={(values) => {
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
                                {this.state.survey.Questions.map(question => {
                                    return (
                                        <RadioButtonGroup
                                            id={question.UUID}
                                            label={question.question}
                                            value={values.question}
                                            error={errors[question.UUID]}
                                            touched={touched.radioGroup}
                                        >
                                            {question.answers.map(answer => {
                                                return (
                                                    <Field
                                                        component={RadioButton}
                                                        name={question.UUID}
                                                        id={answer.UUID}
                                                        label={answer.value}
                                                    />
                                                )
                                            })}
                                        </RadioButtonGroup>
                                    )
                                })}
                            </div>
                            <div className="FormActions">
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
