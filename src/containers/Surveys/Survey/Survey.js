import React from 'react';
// import Questions from '../../Questions/Questions';
import cssClasses from './Survey.css';

const survey = (props) => {
    const date = new Date(Number(props.created) * 1000);

    return (
        <tr>
            <td> {props.icon ? <img src={props.icon} width="40px" height="40px"/> : null} </td>
            <td> {props.name} </td>
            <td> {props.description} </td>
            <td> {props.questions ? props.questions.length : 0} </td>
            <td> {date.toLocaleString()} </td>
            {/*<div className={cssClasses.Title}>*/}
            {/*    <p>Survey Name: {props.name}</p>*/}
            {/*    <p>Created: {date.toLocaleString()}</p>*/}
            {/*</div>*/}
            {/*<Questions questionsList={props.questions}/>*/}
        </tr>
    );
};

export default survey;
