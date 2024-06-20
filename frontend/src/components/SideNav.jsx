// src/components/SideNav.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/SideNav.css';

function SideNav() {
    return (
        <div className="sidenav">
            <h2>Menu</h2>
            <ul className="sidenav-list">
                <li className="sidenav-item">
                    <Link to="/">Home</Link>
                </li>
                <li className="sidenav-item">
                    <Link to="/addemployee">Add Employee</Link>
                </li>
                <li className="sidenav-item">
                    <Link to="/viewemployee">Employee List</Link>
                </li>
                <li className="sidenav-item">
                    <Link to="/attendance">Attendance</Link>
                </li>
                <li className="sidenav-item">
                    <Link to="/leavemanagement">LeaveRequests</Link>
                </li>
            </ul>
        </div>
    );
}

export default SideNav;
