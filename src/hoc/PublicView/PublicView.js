import React, {Component} from 'react'
import "./PublicView.css"
import Authorization from "../../components/Authorization/Authorization"

class PublicView extends Component {
    render() {
        return (
            <div className="PublicView">
                <Authorization userLoginHandler={this.props.userLoginHandler}/>
                <div className="Image"/>
            </div>
        )
    }
}

export default PublicView;
