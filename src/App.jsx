import Error from './pages/Error/Error'
import Home from './pages/home/Home'
import LoginPage from './pages/login/LoginPage'
import Registration from './pages/registration/registration'
import './App.css'
import { Route, Routes } from 'react-router-dom';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword'


function App() {
  

  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/home" element={<Home />} />
        <Route path="/forgotpassword" element={<ForgotPassword/>} />
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
}

export default App
