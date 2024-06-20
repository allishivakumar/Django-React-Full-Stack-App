// src/components/Layout.js
import React from 'react';
import '../styles/Layout.css'; 
import '../styles/SideNav.css';
import SideNav from './SideNav';
import UserProfile from './HomeFeatures/UserProfile';
// Import the CSS file for styling

const Layout = ({ children }) => {
    return (
        <div className="layout">
            <header className="header">
                
                <h1>Company Dashboard</h1>
                <UserProfile />
            </header>
            <div className="main-content">
                <SideNav />
                <div className="content">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Layout;
