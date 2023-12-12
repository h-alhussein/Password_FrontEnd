import React from 'react'
import { Route, Routes } from 'react-router-dom'
import './scss/style.scss';
import './app.css';
import RequireAuth from './components/RequireAuth';



// Containers
import DefaultLayout from './layout/DefaultLayout';
import Login from './views/login/Login';
import Register from './views/register/register';
import RegisterSuccess from './views/register/register-success';
import VerifyEmail from './views/register/verify-email';
import ForgetPassword from './views/forget_password/forget_password';
import ResetPassword from './views/reset_password/reset_password';
import Tools from './views/tool/tools';




const App = () => {

  return (

    <Routes>


      <Route element={<RequireAuth />}>
        <Route exact path="*" name="Home" element={<DefaultLayout />} />
      </Route>
      <Route path="login" name="Login" element={<Login />} />
      <Route path="register" name="Register" element={<Register />} />
      <Route path="register-success" name="RegisterSuccess" element={<RegisterSuccess />} />
      <Route path="verify-email/*" name="VerifyEmail" element={<VerifyEmail />} />
      <Route path="forget-password" name="Forget Password" element={<ForgetPassword />} />
      <Route path="reset-password" name="Reset Password" element={<ResetPassword />} />
    </Routes>

  )
}


export default App
