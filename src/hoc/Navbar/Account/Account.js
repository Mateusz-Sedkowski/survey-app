import React, {Component} from 'react';
import cssClasses from './Account.css';
import AvatarPlaceholder from '../../../assets/images/avatar-placeholder.png';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

class Account extends Component {
    state = {
        showMenu: false
    }

    toggleMenu = () => {
        this.setState({
            showMenu: !this.state.showMenu
        })
    }

    render() {
        let accountMenu = null
        if (this.state.showMenu) {
            accountMenu = <div className={cssClasses.AccountMenu}>
                <ul>
                    <li><FontAwesomeIcon icon="file-signature" className={cssClasses.itemIcon}/> <p> My Surveys </p>
                    </li>
                    <li><FontAwesomeIcon icon="cog" className={cssClasses.itemIcon}/> <p> Account Settings</p></li>
                    <li onClick={this.props.logoutHandler}><FontAwesomeIcon icon="sign-out-alt" className={cssClasses.itemIcon}/> <p> Log out</p></li>
                </ul>
            </div>
        }
        return (
            <div className={cssClasses.Account}>
                <div className={cssClasses.UserData} onClick={this.toggleMenu}>
                    <img className={cssClasses.avatar} src={AvatarPlaceholder}/>
                    <p className={cssClasses.name}> {this.props.user.first_name + ' ' + this.props.user.last_name} </p>
                    <FontAwesomeIcon icon="caret-down" className={cssClasses.icon}/>
                </div>

                {accountMenu}
            </div>
        );
    }
}

export default Account;
