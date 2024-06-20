import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Clock from 'react-clock';
import 'react-clock/dist/Clock.css';
import Layout from '../components/Layout';
import '../styles/Home.css';
import api from '../api';
import { Link } from 'react-router-dom';

function Home() {
    const username = "Shiva kumar";  // Replace with dynamic username

    const [stats, setStats] = useState({ total_employees: 0, total_attendance: 0, pending_leave_requests: 0 });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [leaveRequests, setLeaveRequests] = useState([]);
    const [clockValue, setClockValue] = useState(new Date());

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await api.get('/api/stats/');
                if (res.status === 200) {
                    console.log(res.data);
                    setStats(res.data);
                } else {
                    setError('Failed to fetch stats.');
                }
            } catch (err) {
                setError('Error fetching stats data.');
            }
        };

        const fetchLeaveRequests = async () => {
            try {
                const res = await api.get('/api/leave_requests/?limit=3');
                if (res.status === 200) {
                    setLeaveRequests(res.data);
                } else {
                    setError('Failed to get the leave requests.');
                }
            } catch (err) {
                setError('Error fetching leave requests data.');
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
        fetchLeaveRequests();

        // Update clock every second
        const interval = setInterval(() => setClockValue(new Date()), 1000);
        return () => clearInterval(interval);
    }, []);

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <Layout>
            <div className="home">
                <h2>Welcome, {username}</h2>
                
                <div className="stats">
                    <div className="stat-item1">
                        <h3>Total Employees</h3>
                        <p>{stats.total_employees}</p>
                        <button className='view-button' ><Link to="/attendance" >ViewEmployees</Link></button>
                    </div>
                    <div className="stat-item2">
                        <h3>Present Today</h3>
                        <p>{stats.total_attendance}</p>
                        <button className='view-button' ><Link to="/attendance" >Attendance</Link></button>
                    </div>
                    <div className="stat-item3">
                        <h3>Pending Leave Requests</h3>
                        <p>{stats.pending_leave_requests}</p>
                        <button className='view-button' ><Link to="/attendance" >Respond</Link></button>
                    </div>
                </div>

                <div className="recent-requests">
                    <h3>Recent Leave Requests</h3>
                    <table className="employee-table">
                        <thead>
                            <tr>
                                <th>EmployeeID</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {leaveRequests.map(request => (
                                <tr key={request.id}>
                                    <td>{request.employee}</td>
                                    <td>{request.start_date}</td>
                                    <td>{request.end_date}</td>
                                    <td>{request.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                
            </div>
        </Layout>
    );
}

export default Home;
