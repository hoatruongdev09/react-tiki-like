import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setShowNavBar } from '../../store/general/general.action'
import { BASE_URL, API_ENDPOINTS } from '../../utils/api-requesting/api-requesting.util'

import { saveDataToLocalStorage, STORAGE_KEYS } from '../../utils/local-storage/local-storage.util'
import { setAccessToken } from '../../store/general/general.action'
import { selectAuthorized } from '../../store/general/general.selector'



const registerFormDefault = {
    firstName: '',
    lastName: '',
    email: '',
    gender: true,
    password: '',
    repeatPassword: '',
    agreePolicy: true
}


const SignUp = () => {
    const [registerForm, setRegisterForm] = useState(registerFormDefault)
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
        setRegisterForm({
            ...registerForm,
            [e.target.name]: e.target.value
        })
    }
    const handleOnChangeGender = (e, gender) => {
        setRegisterForm({
            ...registerForm,
            gender: gender
        })
    }
    const handleTickPolicy = (e) => {
        setRegisterForm({
            ...registerForm,
            agreePolicy: !e.target.value
        })
    }

    const handleOnSubmit = (e) => {
        e.preventDefault()
        var url = `${BASE_URL}${API_ENDPOINTS.REGISTER}`

        const { email, password, repeatPassword, firstName, lastName, gender } = registerForm

        fetch(url,
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                method: 'POST',
                body: JSON.stringify({
                    email,
                    password,
                    firstName,
                    lastName,
                    gender
                })
            })
            .then(res => {
                if (res.status == 200) {
                    res.json().then(data => {
                        dispatch(setAccessToken(data))
                        saveDataToLocalStorage(STORAGE_KEYS.ACCESS_TOKEN, data)
                        navigate('/')
                    })
                }
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <section className="section-content padding-y">


            <div className="card mx-auto" style={{ maxWidth: "520px", marginTop: "40px" }}>
                <article className="card-body">
                    <header className="mb-4"><h4 className="card-title">Sign up</h4></header>
                    <form onSubmit={e => handleOnSubmit(e)}>
                        <div className="form-row">
                            <div className="col form-group">
                                <label>First name</label>
                                <input type="text" name='firstName' className="form-control" placeholder="" value={registerForm.firstName} onChange={e => handleOnChanged(e)} />
                            </div>
                            <div className="col form-group">
                                <label>Last name</label>
                                <input type="text" name='lastName' className="form-control" placeholder="" value={registerForm.lastName} onChange={e => handleOnChanged(e)} />
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input type="email" name='email' className="form-control" placeholder="" value={registerForm.email} onChange={e => handleOnChanged(e)} />
                            <small className="form-text text-muted">We'll never share your email with anyone else.</small>
                        </div>
                        <div className="form-group">
                            <label className="custom-control custom-radio custom-control-inline">
                                <input className="custom-control-input" defaultChecked type="radio" name="gender" value={registerForm.gender} onChange={e => handleOnChangeGender(e, true)} />
                                <span className="custom-control-label"> Male </span>
                            </label>
                            <label className="custom-control custom-radio custom-control-inline">
                                <input className="custom-control-input" type="radio" name="gender" value={!registerForm.gender} onChange={e => handleOnChangeGender(e, false)} />
                                <span className="custom-control-label"> Female </span>
                            </label>
                        </div>
                        {/* <div className="form-row">
                            <div className="form-group col-md-6">
                                <label>City</label>
                                <input type="text" className="form-control" />
                            </div>
                            <div className="form-group col-md-6">
                                <label>Country</label>
                                <select id="inputState" className="form-control" defaultValue={3}>
                                    <option value={0}> Choose...</option>
                                    <option value={1}>Uzbekistan</option>
                                    <option value={2}>Russia</option>
                                    <option value={3}>United States</option>
                                    <option value={4}>India</option>
                                    <option value={5}>Afganistan</option>
                                </select>
                            </div>
                        </div> */}
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label>Create password</label>
                                <input className="form-control" name='password' type="password" value={registerForm.password} onChange={e => handleOnChanged(e)} />
                            </div>
                            <div className="form-group col-md-6">
                                <label>Repeat password</label>
                                <input className="form-control" name='repeatPassword' type="password" value={registerForm.repeatPassword} onChange={e => handleOnChanged(e)} />
                            </div>
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary btn-block"> Register  </button>
                        </div>
                        <div className="form-group">
                            <label className="custom-control custom-checkbox">
                                <input type="checkbox" name='agreePolicy' className="custom-control-input" defaultChecked value={registerForm.agreePolicy} onChange={e => handleTickPolicy(e)} />
                                <div className="custom-control-label">
                                    I am agree with <a href="#">terms and contitions</a>
                                </div>
                            </label>
                        </div>
                    </form>
                </article>
            </div>
            <p className="text-center mt-4">Have an account? <Link to="/login">Log In</Link></p>
            <br />



        </section >
    )
}

export default SignUp