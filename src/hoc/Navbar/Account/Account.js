import React, {Component} from 'react'
import './Account.css'
import AvatarPlaceholder from '../../../assets/images/avatar-placeholder.png'
import IosCogOutline from 'react-ionicons/lib/IosCogOutline'
import IosLogOut from 'react-ionicons/lib/IosLogOut'
import IosClipboardOutline from 'react-ionicons/lib/IosClipboardOutline'
import IosArrowDown from 'react-ionicons/lib/IosArrowDown'

const USER_MENU_OPTIONS = [
    {
        name: 'My Surveys',
        icon: <IosClipboardOutline className="icon" color="#FFFFFF" fontSize="20px"/>
    },
    {
        name: 'Account Settings',
        icon: <IosCogOutline className="icon" color="#FFFFFF" fontSize="20px"/>
    }
]

class Account extends Component {
    state = {
        showMenu: false,
        user: this.props.user
    }

    componentDidMount() {
        if(this.state.user.role === 'pollster') {
            USER_MENU_OPTIONS.push(
                {
                    name: 'Create New Poll',
                    icon: <IosCogOutline className="icon" color="#FFFFFF" fontSize="20px"/>
                },
                {
                    name: 'Reports',
                    icon: <IosCogOutline className="icon" color="#FFFFFF" fontSize="20px"/>
                }
            )
        }
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
                    { USER_MENU_OPTIONS.map((option, i) => {
                        return <li key={i}>{option.icon}<span>{option.name}</span></li>
                    }) }
                    <li onClick={this.props.logoutHandler}><IosLogOut className="icon" color="#FFFFFF" fontSize="20px"/>
                        <span> Log out</span></li>
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
