import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Routes, Route } from 'react-router-dom'
import NavigationBar from './routes/navigation-bar/navigation-bar.component'

import AuthRoute from './routes/auth/auth-route.component'

import Login from './components/login/login.component'
import SignUp from './components/signup/signup.component';

import { BASE_URL, API_ENDPOINTS } from './utils/api-requesting/api-requesting.util';
import { selectAccessToken, selectAuthorized } from './store/general/general.selector'
import { setUserData } from './store/user/user.action'
import './App.scss';
import { setAuthorize } from './store/general/general.action';
import Customer from './routes/customer/customer.component';
import UserDetail from './components/user-detail/user-detail.component';

function App() {
  const accessToken = useSelector(selectAccessToken)
  const dispatch = useDispatch()
  useEffect(() => {
    getAuthorizationData(accessToken)

  }, [accessToken, dispatch])

  const getAuthorizationData = (token) => {
    if (!token) {
      dispatch(setAuthorize(false))
      return
    }
    var url = `${BASE_URL}${API_ENDPOINTS.AUTH}`
    fetch(url, {
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      }
    })
      .then(res => {
        if (res.status == 200) {
          res.json().then(data => {
            console.log('data: ', data)
            dispatch(setUserData(data))
          })
          dispatch(setAuthorize(true))
        } else {
          dispatch(setAuthorize(false))
        }
      })
      .catch(err => { console.log(err) })
  }

  return (
    <Routes>
      <Route path='/' element={<NavigationBar />}>
        <Route path='login' element={<Login />} />
        <Route path='signup' element={<SignUp />} />
        <Route path='customer' element={<Customer />}>
          <Route index element={<UserDetail />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
