// src/components/ViewEmployees.js
import React, { useState, useEffect } from 'react';
import api from '../../api';
import Layout from '../Layout'; // Import the Layout component
import '../../styles/ViewEmployees.css'; // Import the CSS file for styling

const ViewEmployees = () => {
    const [employees, setEmployees] = useState([]);
    const [filteredEmployees, setFilteredEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState('');

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const res = await api.get('/api/viewemployees/');
                if (res.status === 200) {
                    setEmployees(res.data); // Set employees data
                    setFilteredEmployees(res.data); // Initially, all employees are displayed
                    console.log(res.data)
                } else {
                    setError('Failed to get the employees.');
                }
            } catch (err) {
                setError('Error fetching employee data.');
            } finally {
                setLoading(false); // Set loading to false after the request completes
            }
        };

        fetchEmployees();
    }, []);

    const handleSearchChange = (e) => {
        const searchValue = e.target.value.toLowerCase();
        setSearch(searchValue);
        const filtered = employees.filter(employee =>
            employee.full_name.toLowerCase().includes(searchValue) ||
            employee.id.toString().includes(searchValue)
        );
        setFilteredEmployees(filtered);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this employee?')) {
            try {
                const res = await api.delete(`/api/${id}/delete/`);
                if (res.status === 204) {
                    setEmployees(employees.filter(employee => employee.id !== id));
                    setFilteredEmployees(filteredEmployees.filter(employee => employee.id !== id));
                } else {
                    alert('Failed to delete the employee.');
                }
            } catch (err) {
                alert('Error deleting employee.');
            }
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <Layout>
            <h1>Employee List</h1>
            <input 
                type="text" 
                placeholder="Search by ID or Name" 
                value={search}
                onChange={handleSearchChange}
                className="search-input"
            />
            {filteredEmployees.length > 0 ? (
                <table className="employee-table">
                    <thead>
                        <tr>
                            <th>E.ID</th>
                            <th>Full_Name</th>
                            <th>Experience</th>
                            <th>Department</th>
                            <th>Email</th>
                            <th>Phone Number</th>
                            <th>Address</th>
                            <th>Salary</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredEmployees.map(employee => (
                            <tr key={employee.id}>
                                <td>{employee.id}</td>
                                <td>{employee.full_name}</td>
                                <td>{employee.experience} years</td>
                                <td>{employee.department}</td>
                                <td>{employee.email}</td>
                                <td>{employee.phone_number}</td>
                                <td>{employee.address}</td>
                                <td>${employee.salary}</td>
                                <td>
                                    <button 
                                        className="delete-button" 
                                        onClick={() => handleDelete(employee.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No employees found.</p>
            )}
        </Layout>
    );
};

export default ViewEmployees;
