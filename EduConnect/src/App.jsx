import './App.css'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import LandingPage from './pages/LandingPage'
import Login from './pages/Login'
import Footer from './components/Footer'

import Dashboard from './pages/Student/StudentDasboard'
import TeacherDashboard from './pages/Teacher/TeacherDashboard'
import StudentsAttendance from './pages/Teacher/StudentAttendance'

const App = () => {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/welcome" element={<LandingPage />} /> 
          <Route path="/auth/login" element={<Login />} />  

          {/* APP SIDE ROUTERS */}
          <Route path="/student/dashboard" element={<Dashboard />} />
          <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
          <Route path="/teacher/students" element={<StudentsAttendance />} />
          {/* Add more routes as needed */}
        </Routes>
        <Footer/>
      </Router>
    </>
  )
}

export default App;