import React, { useEffect, useState } from 'react';
import api from '../../api';
import '../../styles/LeaveRequestList.css';
import Layout from '../Layout';
const LeaveRequestList = () => {
    const [leaveRequests, setLeaveRequests] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLeaveRequests = async () => {
            try {
                const res = await api.get('/api/leave_requests/');
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

        fetchLeaveRequests();
    }, []);

    const handleApprove = async (id) => {
        try {
            const res = await api.post(`/api/leave_requests/${id}/approve/`);
            if (res.status === 200) {
                setLeaveRequests(leaveRequests.map(lr => lr.id === id ? { ...lr, status: 'approved' } : lr));
            } else {
                setError('Failed to approve the leave request.');
            }
        } catch (err) {
            setError('Error approving the leave request.');
        }
    };

    const handleReject = async (id) => {
        try {
            const res = await api.post(`/api/leave_requests/${id}/reject/`);
            if (res.status === 200) {
                setLeaveRequests(leaveRequests.map(lr => lr.id === id ? { ...lr, status: 'rejected' } : lr));
            } else {
                setError('Failed to reject the leave request.');
            }
        } catch (err) {
            setError('Error rejecting the leave request.');
        }
    };

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <Layout>
        <div >
            <h1>Leave Requests</h1>
            <table className="employee-table">
                <thead>
                    <tr>
                        <th>EmployeeID</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Reason</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {leaveRequests.map(request => (
                        <tr key={request.id}>
                            <td>{request.employee}</td>
                            <td>{request.start_date}</td>
                            <td>{request.end_date}</td>
                            <td>{request.reason}</td>
                            <td>{request.status}</td>
                            <td>
                                {request.status === 'pending' && (
                                    <div className="actions">
                                        <button className="approve-button" onClick={() => handleApprove(request.id)}>Approve</button>
                                        <button className="reject-button" onClick={() => handleReject(request.id)}>Reject</button>
                                    </div>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </Layout>
    );
};

export default LeaveRequestList;
