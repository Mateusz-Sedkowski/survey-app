import React from 'react';
import cssClasses from './Navbar.css';
import Account from './Account/Account';
import Logo from '../../assets/images/logo-placeholder.png';

const navbar = (props) => {
    return (
        <div className={cssClasses.Navbar}>
            <img className={cssClasses.logo} src={Logo}/>
            <Account user={props.user} logoutHandler={props.logoutHandler}/>
        </div>
    );
};

export default navbar;