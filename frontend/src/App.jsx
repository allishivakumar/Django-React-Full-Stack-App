import react from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home"
import NotFound from "./pages/NotFound"
import ViewEmployees from "./components/EmployeeManagement/ViewEmpolyees"
import ProtectedRoute from "./components/ProtectedRoute"
import AddEmployee from "./components/EmployeeManagement/AddEmployee"
import LeaveRequestList from "./components/EmployeeManagement/LeaveRequestList"
import Attendance from "./components/EmployeeManagement/Attendance"
function Logout() {
  localStorage.clear()
  return <Navigate to="/login" />
}

function RegisterAndLogout() {
  localStorage.clear()
  return <Register />
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/addemployee"
          element={
            <ProtectedRoute>
              <AddEmployee/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/viewemployee"
          element={
            <ProtectedRoute>
              <ViewEmployees/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/attendance"
          element={
            <ProtectedRoute>
            <Attendance/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/leavemanagement"
          element={
            <ProtectedRoute>
            <LeaveRequestList/>
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<RegisterAndLogout />} />
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App