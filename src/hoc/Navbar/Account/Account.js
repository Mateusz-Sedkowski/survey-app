import React, {Component} from 'react'
import './Account.css'
import AvatarPlaceholder from '../../../assets/images/avatar-placeholder.png'
import IosCogOutline from 'react-ionicons/lib/IosCogOutline'
import IosLogOut from 'react-ionicons/lib/IosLogOut'
import IosClipboardOutline from 'react-ionicons/lib/IosClipboardOutline'
import IosArrowDown from 'react-ionicons/lib/IosArrowDown'

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
            accountMenu = <div className="AccountMenu">
                <ul>
                    <li><IosClipboardOutline className="icon" color="#FFFFFF" fontSize="20px"/> <span> My Surveys </span> </li>
                    <li><IosCogOutline className="icon" color="#FFFFFF" fontSize="20px"/> <span> Account Settings</span></li>
                    <li onClick={this.props.logoutHandler}><IosLogOut className="icon" color="#FFFFFF" fontSize="20px"/> <span> Log out</span></li>
                </ul>
            </div>
        }
        return (
            <div className="Account">
                <div className="UserData" onClick={this.toggleMenu}>
                    <img className="avatar" src={AvatarPlaceholder}/>
                    <span className="name"> {this.props.user.first_name + ' ' + this.props.user.last_name} </span>
                    <IosArrowDown className="icon" color="#FFFFFF" fontSize="20px"/>
                </div>

                {accountMenu}
            </div>
        );
    }
}

export default Account;
