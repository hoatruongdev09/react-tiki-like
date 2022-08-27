import { Route, useNavigate } from 'react-router-dom'
import Login from '../../components/login/login.component'
import SignUp from '../../components/signup/signup.component'

const AuthRoute = () => {
    <>
        <Route path='login' element={<Login />} />
        <Route path='signup' element={<SignUp />} />
    </>

}

export default AuthRoute