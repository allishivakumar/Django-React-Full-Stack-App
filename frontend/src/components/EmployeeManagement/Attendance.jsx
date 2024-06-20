import React, { useEffect, useState } from 'react';
import Layout from '../Layout';
import api from '../../api';
import '../../styles/Attendance.css';
function Attendance() {
    const [employees, setEmployees] = useState([]);
    const [attendance, setAttendance] = useState([]);
    const [selectedEmployees, setSelectedEmployees] = useState([]);
    const [status, setStatus] = useState('');
    const [date, setDate] = useState('');
    const [search, setSearch] = useState('');
    const [filterDate, setFilterDate] = useState('');
    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await api.get('/api/viewemployees/');
                const data = Array.isArray(response.data) ? response.data : [response.data];
                setEmployees(data);
            } catch (error) {
                console.log('Error fetching employees:', error);
            }
        };

        const fetchAttendance = async (filterDate = '') => {
            try {
                const response = await api.get(`/api/attendance/view/?date=${filterDate}`);
                const data = Array.isArray(response.data) ? response.data : [response.data];
                setAttendance(data);
            } catch (error) {
                console.log('Error fetching attendance:', error);
            }
        };

        fetchEmployees();
        fetchAttendance();
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

    const handleMarkAttendance = async () => {
        try {
            const response = await api.post('/api/attendance/mark/', {
                employee_ids: selectedEmployees,
                status: status,
                date: date
            });
            console.log(date)
            console.log('Attendance marked:', response.data);
            const data = Array.isArray(response.data) ? response.data : [response.data];
            setAttendance(data);
        } catch (error) {
            console.log('Error marking attendance:', error);
        }
    };

    const handleCheckboxChange = (employeeId) => {
        setSelectedEmployees((prevSelected) => {
            if (prevSelected.includes(employeeId)) {
                return prevSelected.filter(id => id !== employeeId);
            } else {
                return [...prevSelected, employeeId];
            }
        });
    };

    const handleDateChange = async (e) => {
        const newDate = e.target.value;
        setDate(newDate);
        try {
            const response = await api.get(`/api/attendance/view/?date=${newDate}`);
            console.log('Filtered attendance:', response.data);
            const data = Array.isArray(response.data) ? response.data : [response.data];
            setAttendance(data);
        } catch (error) {
            console.log('Error filtering attendance:', error);
        }
    };

    const handleFilterAttendance = async () => {
        if (!filterDate) {
          return; // Prevent unnecessary API calls if no filter date is set
        }
    
        try {
          const response = await api.get(`/api/attendance/view/?date=${filterDate}`);
          console.log('Filtered attendance:', response.data);
          const data = Array.isArray(response.data) ? response.data : [response.data];
          setAttendance(data);
        } catch (error) {
          console.log('Error filtering attendance:', error);
        }
      };

    return (
         <Layout>
            <div className="attendance-container">
                <h1>Attendance</h1>

                <div className="section">
    
    <div className="section">
    <h2>Select Employees</h2>
    <table className="employee-table">
        <thead>
            <tr>
               
                <th>Employee ID</th>
                <th>Name</th>
                <th>Department</th>
                <th>Select</th>
            </tr>
        </thead>
        <tbody>
            {employees.map(employee => (
                <tr key={employee.id}>
                    <td>{employee.id}</td>
                    <td>{employee.full_name}</td>
                    <td>{employee.department}</td>
                    <td>
                        <input
                            type="checkbox"
                            checked={selectedEmployees.includes(employee.id)}
                            onChange={() => handleCheckboxChange(employee.id)}
                        />
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
</div>
x
</div>

                <div className="section">
                    <h2>Mark Attendance</h2>
                    <div className='containt'>
                    <div className="mark-attendance">
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                        <select value={status} onChange={(e) => setStatus(e.target.value)}>
                            <option value="">Select Status</option>
                            <option value="Present">Present</option>
                            <option value="Absent">Absent</option>
                        </select>
                        <button onClick={handleMarkAttendance}>Mark Attendance</button>
                    </div>
                </div>
                </div>
                <div className="section ">
                    <label>Filter Attendance By </label>
          <input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
          />
          <button onClick={handleFilterAttendance}>Filter</button>
        </div>

                <div className="section">
                    <h2>Attendance Records</h2>
                    <table className="attendance-table">
                        <thead>
                            <tr>
                                <th>Employee ID</th>
                                <th>Employee Name</th>
                                <th>Status</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {attendance.map(record => (
                                <tr key={record.id}>
                                    <td>{record.employee.id}</td>
                                    <td>{record.employee.full_name}</td>
                                    <td>{record.status}</td>
                                    <td>{record.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </Layout>
    );
}

export default Attendance;
