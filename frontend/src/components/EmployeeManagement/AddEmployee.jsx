import { useState } from "react";
import api from "../../api";
import Layout from "../Layout";
function AddEmployee() {
    const[full_name, setFullname] = useState();
    const[experience,setExperience]=useState();
    const[department,setDepartment]=useState();
    const[email,setEmail]=useState();
    const[phone_number,setPhnum]=useState();
    const[address,setAddress]=useState();
    const[salary,setSalary]=useState();
   
    const addEmployee = (e) => {
        e.preventDefault();
        api
            .post("/api/addemployee/", { full_name,experience,department,email,phone_number,address,salary })
            .then((res) => {
                if (res.status === 201) alert("Employee created.");
                else alert("Failed to Create the Employee.");
                
            })
            .catch((err) => alert(err));
    };

    return (
        <Layout>
        <div className='contentadd'>
            <center> <h2>Add Employee</h2></center>

            <form onSubmit={addEmployee}>
                <label htmlFor="name">Full Name:</label>
                <br />
                <input
                    type="text"
                    id="full_name"
                    name="full_name"
                    required
                    onChange={(e) => setFullname(e.target.value)}
                    value={full_name}
                />
                <label htmlFor="email">Email:</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
                <label htmlFor="experience">Experience:</label>
                <input
                    type="text"
                    id="experience"
                    name="experience"
                    required
                    onChange={(e) => setExperience(e.target.value)}
                    value={experience}
                />
                <label htmlFor="department">Department:</label>
                <input
                    type="text"
                    id="department"
                    name="department"
                    required
                    onChange={(e) => setDepartment(e.target.value)}
                    value={department}
                />
                
                <label htmlFor="phone_number">Phone Number:</label>
                               <input
                    type="number"
                    id="phone_number"
                    name="phone_number"
                    required
                    onChange={(e) => setPhnum(e.target.value)}
                    value={phone_number}
                />
                <label htmlFor="salary">Salary:</label>
                                <input
                    type="number"
                    id="salary"
                    name="  salary"
                    required
                    onChange={(e) => setSalary(e.target.value)}
                    value={salary}
                />
                <label htmlFor="address">Address:</label>
                                <input
                    type="text"
                    id="address"
                    name="address"
                    required
                    onChange={(e) => setAddress(e.target.value)}
                    value={address}
                />
                <br />
                <input type="submit" value="Submit"></input>
            </form>
        </div>
        </Layout>
    );
}

export default AddEmployee;
