import React from 'react';
import cssClasses from './Navbar.css';
import Account from './Account/Account';
import Logo from '../../assets/images/logo-placeholder.png';

const navbar = (props) => {
    return (
        <div className={cssClasses.Navbar}>
            <img className={cssClasses.logo} src={Logo}/>
            <Account/>
        </div>
    );
};

export default navbar;