import React from 'react';
import logo from '../logo.svg';

const Header: React.FC = () => {
    return (
        <div className="header">
            <img src={logo} />
            <h4>ReactJS Test Assignment</h4>
        </div>
    )
}

export default Header;