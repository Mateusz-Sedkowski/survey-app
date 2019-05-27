import React from 'react';
import cssClasses from "./ForgottenPasswordControls.css";

const forgottenPasswordControls = (props) => {
    return (
        <div className={cssClasses.ForgottenPassword}>
            <div className={cssClasses.Controls}>
                <h1> Reset password </h1>
                <h3> You will receive a password reset link on this email. </h3>
                <label>Email: </label>
                <input/>
                <div className={cssClasses.FormActions}>
                    <label
                        className={cssClasses.LogIn}
                        onClick={props.logIn}>Return to login</label>
                    <button>Reset password</button>
                </div>
            </div>
        </div>
    );
};

export default forgottenPasswordControls;