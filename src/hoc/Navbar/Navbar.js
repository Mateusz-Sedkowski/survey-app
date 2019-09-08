import React from 'react';
import './Navbar.css';
import Account from './Account/Account';
import Logo from '../../assets/images/logo-placeholder.png';

const navbar = (props) => {
    return (
        <div className="Navbar">
            <img className="logo" src={Logo} alt="Application logo"/>
            <Account user={props.user} logoutHandler={props.logoutHandler}/>
        </div>
    );
};

export default navbar;