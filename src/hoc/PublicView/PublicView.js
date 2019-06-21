import React, {Component} from 'react'
import cssClasses from "./PublicView.css"
import Authorization from "../../components/Authorization/Authorization"

class PublicView extends Component {
    componentWillUpdate(prevProps, prevState, snapshot) {

    }

    render() {
        return (
            <div className={cssClasses.PublicView}>
                <Authorization userLoginHandler={this.props.userLoginHandler}/>
                <div className={cssClasses.Image}/>
            </div>
        )
    }
}

export default PublicView;
