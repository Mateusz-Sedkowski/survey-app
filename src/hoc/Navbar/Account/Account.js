import React, {Component} from 'react'
import './Account.css'
import AvatarPlaceholder from '../../../assets/images/avatar-placeholder.png'
import IosCogOutline from 'react-ionicons/lib/IosCogOutline'
import IosLogOut from 'react-ionicons/lib/IosLogOut'
import IosClipboardOutline from 'react-ionicons/lib/IosClipboardOutline'
import IosArrowDown from 'react-ionicons/lib/IosArrowDown'
import { Link } from 'react-router-dom'

const USER_MENU_OPTIONS = [
    {
        name: 'Available Surveys',
        icon: <IosClipboardOutline className="icon" color="#FFFFFF" fontSize="20px"/>,
        path: '/'
    },
    {
        name: 'Account Settings',
        icon: <IosCogOutline className="icon" color="#FFFFFF" fontSize="20px"/>,
        path: '/settings'
    }
]

class Account extends Component {
    state = {
        showMenu: false,
        user: this.props.user
    }

    componentDidMount() {
        // if(this.state.user.role === 'pollster') { TODO Uncomment after creating all and styling all components
        if(this.state.user.role === 'interviewee') {
            USER_MENU_OPTIONS.push(
                {
                    name: 'Create New Poll',
                    icon: <IosCogOutline className="icon" color="#FFFFFF" fontSize="20px"/>,
                    path: '/polls/new'
                },
                {
                    name: 'Reports',
                    icon: <IosCogOutline className="icon" color="#FFFFFF" fontSize="20px"/>,
                    path: '/reports'
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
                        return <li key={i}>{option.icon}<Link to={option.path}>{option.name}</Link></li>
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
