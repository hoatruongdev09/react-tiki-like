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
import CustomerOverview from './components/customer/customer-overview.component';
import CustomerDetail from './components/customer/customer-detail.component';
import CustomerAddresses from './components/customer/customer-addresses.component';
import IndexPage from './components/index-page/index-page.component'
import ProductDetail from './components/product-detail/product-detail.component';
import UserCart from './components/user-cart/user-cart.component';
import CartPayment from './components/cart-payment/cart-payment.component';
import CustomerMyOrder from './components/customer/customer-my-order.component';
import CustomerOrderDetail from './components/customer/customer-order-detail.component';

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
    var url = `${BASE_URL}${API_ENDPOINTS.CUSTOMER_AUTH}`
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
        <Route index element={<IndexPage />} />
        <Route path='product-detail/:id' element={<ProductDetail />} />
        <Route path='login' element={<Login />} />
        <Route path='signup' element={<SignUp />} />
        <Route path='cart' element={<UserCart />} />
        <Route path='/cart-payment' element={<CartPayment />} />
        <Route path='customer' element={<Customer />}>
          <Route index element={<CustomerOverview />} />
          <Route path='settings' element={<CustomerDetail />} />
          <Route path='addresses' element={<CustomerAddresses />} />
          <Route path='my-orders' element={<CustomerMyOrder />} />
          <Route path='order-detail/:id' element={<CustomerOrderDetail />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
