import React, {Component} from 'react';
import Navbar from '../Navbar/Navbar'
import AvailableSurveys from '../../containers/Surveys/AvailableSurveys'
import NewSurvey from '../../forms/Survey/NewSurvey'
import Settings from '../../containers/Settings/Settings'
import Survey from '../../containers/Surveys/Survey/Survey'
import Report from '../../containers/Report/Report'
import './PrivateView.css'
import {Route, Switch} from "react-router";

// Amplify.Logger.LOG_LEVEL = 'DEBUG';

class PrivateView extends Component {
    render() {
        return (
            <div>
                <Navbar user={this.props.user} logoutHandler={this.props.logoutHandler}/>
                <div className="mainContent">
                    <Switch>
                        <Route path="/" exact component={AvailableSurveys}/>
                        <Route path="/settings" exact render={() => <Settings user={this.props.user}/>}/>
                        <Route path="/polls/new" exact component={NewSurvey} />
                        <Route path="/polls/:id" exact component={Survey} />
                        <Route path="/polls/:id/raport" exact component={Report} />
                        <Route render={() => <h1>404 Not Found</h1>} />
                    </Switch>
                </div>
            </div>
        );
    }
}

export default PrivateView;
