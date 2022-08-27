import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { setShowNavBar } from '../../store/general/general.action'
import { BASE_URL, API_ENDPOINTS } from '../../utils/api-requesting/api-requesting.util'
import { saveDataToLocalStorage, STORAGE_KEYS } from '../../utils/local-storage/local-storage.util'
import { setAccessToken } from '../../store/general/general.action'
import { selectAuthorized } from '../../store/general/general.selector'
import './login.styles.scss'

const loginFormDefault = {
    email: '',
    password: '',
    remember: true,
}

const Login = () => {
    const [loginForm, setLoginForm] = useState(loginFormDefault)
    const authorized = useSelector(selectAuthorized)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    if (authorized) {
        navigate('/')
    }
    useEffect(() => {
        dispatch(setShowNavBar(false))

        return () => {
            console.log("on unmount")
            dispatch(setShowNavBar(true))
        }
    }, [dispatch])

    const handleOnChanged = (e) => {
        setLoginForm({
            ...loginForm,
            [e.target.name]: e.target.value
        })
    }
    const onTickRemember = (e) => {
        setLoginForm({
            ...loginForm,
            remember: !loginForm.remember
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const url = `${BASE_URL}${API_ENDPOINTS.LOGIN}`
        const { email, password, remember } = loginForm
        fetch(url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            method: 'post',
            body: JSON.stringify({ email, password, remember }),
            credentials: 'include'
        })
            .then(res => {
                if (res.status == 200) {
                    res.json()
                        .then(data => {
                            console.log('login data: ', data)
                            dispatch(setAccessToken(data))
                            saveDataToLocalStorage(STORAGE_KEYS.ACCESS_TOKEN, data)
                            navigate('/')
                        })
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <section className="section-conten padding-y" style={{ minHeight: "84vh" }}>


            <div className="card mx-auto" style={{ maxWidth: "380px", marginTop: "100px" }}>
                <div className="card-body">
                    <h4 className="card-title mb-4">Sign in</h4>
                    <form onSubmit={e => handleSubmit(e)}>
                        <Link to="#" className="btn btn-facebook btn-block mb-2"> <i className="fab fa-facebook-f"></i> {'\u00A0'}  Sign in with Facebook</Link>
                        <Link to="#" className="btn btn-google btn-block mb-4"> <i className="fab fa-google"></i> {'\u00A0'}  Sign in with Google</Link>
                        <div className="form-group">
                            <input name="email" value={loginForm.email} onChange={e => handleOnChanged(e)} className="form-control" placeholder="Email" type="email" />
                        </div>
                        <div className="form-group">
                            <input name="password" value={loginForm.password} onChange={e => handleOnChanged(e)} className="form-control" placeholder="Password" type="password" />
                        </div>

                        <div className="form-group">
                            <Link to="#" className="float-right">Forgot password?</Link>
                            <label className="float-left custom-control custom-checkbox">
                                <input name='remember' value={loginForm.remember} onChange={e => onTickRemember(e)} type="checkbox" className="custom-control-input" />
                                <div className="custom-control-label"> Remember </div> </label>
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary btn-block"> Login  </button>
                        </div>
                    </form>
                </div>
            </div>

            <p className="text-center mt-4">
                Don't have account? <Link to="/signup">Sign up</Link>
            </p>
            <br />



        </section>
    )
}

export default Login