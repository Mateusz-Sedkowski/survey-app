import React, {Component} from 'react'
import "./PublicView.css"
import {Route, Switch} from "react-router";
import Login from "../../components/Authorization/Login/Login/Login";
import SignUp from "../../components/Authorization/Login/SignUp/SignUp";
import ForgottenPassword from "../../components/Authorization/Login/ForgottenPassword/ForgottenPassword";

class PublicView extends Component {
    render() {
        return (
            <div className="PublicView">
                <Switch>
                    <Route path="/" exact render={ () => <Login userLoginHandler={this.props.userLoginHandler}/> } />
                    <Route path="/register" exact component={SignUp} />
                    <Route path="/remindPassword" exact component={ForgottenPassword} />
                </Switch>
                <div className="Image"/>
            </div>
        )
    }
}

export default PublicView;
