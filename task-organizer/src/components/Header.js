import React from 'react';
import iconPlaceholder from '../logo.svg';

const Header = () => {
    return (
        <header>
            <nav>
                <ul>
                    <li>
                        <a href="/">
                            <img src={iconPlaceholder} alt="Icon" className="nav-icon" /> TaskOrganizer
                        </a>
                    </li>
                    <li><a href="/taskoverview">Task Overview</a></li>
                    <li><a href="/createtask">Create Task</a></li>
                    <li><a href="/about">About</a></li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
