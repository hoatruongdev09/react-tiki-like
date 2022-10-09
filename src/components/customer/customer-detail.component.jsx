import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { selectAccessToken } from '../../store/general/general.selector'
import { clearAuthorization, setAuthorize, setSelectedCustomerTab } from '../../store/general/general.action'
import { setUserData, clearUserData } from '../../store/user/user.action'
import { selectUserData } from '../../store/user/user.selector'
import { BASE_URL, API_ENDPOINTS } from '../../utils/api-requesting/api-requesting.util'
// import './styles/customer-detail.styles'

const defaultInfoForm = {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    avatar: '',
    zipcode: '',
    phone: '',
    gender: ''
}

const defaultChangePasswordForm = {
    currentPassword: '',
    newPassword: '',
    repeatPassword: ''
}

const CustomerDetail = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const token = useSelector(selectAccessToken)
    const userInfo = useSelector(selectUserData)
    const [formData, setFormData] = useState(defaultInfoForm)
    const [passwordFormData, setPasswordFormData] = useState(defaultChangePasswordForm)

    const { firstName, lastName, email, avatar, zipcode, phone } = formData
    const { currentPassword, newPassword, repeatPassword } = passwordFormData

    const [editingMode, setEditingMode] = useState(false)

    useEffect(() => {
        setFormData(userInfo)
    }, [userInfo, dispatch])

    const handleEditMode = (e) => {
        if (editingMode) {
            setFormData(userInfo)
        }
        setEditingMode(!editingMode)
    }

    const handleChangePassword = (e) => {
        if (!currentPassword || !newPassword) {
            console.log('please enter current password')
            return
        }
        if (newPassword !== repeatPassword) {
            console.log('new password & repeat password are not matching')
            return
        }
        const body = {
            currentPassword: currentPassword,
            newPassword: newPassword
        }
        var url = `${BASE_URL}${API_ENDPOINTS.POST_UPDATE_CUSTOMER_PASSWORD}`
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            }
        }).then(res => {
            if (res.status == 200) {
                res.json().then(data => {
                    console.log('change password: ', data)
                    setPasswordFormData(defaultChangePasswordForm)
                    dispatch(setAuthorize(false))
                    dispatch(clearAuthorization())
                    dispatch(clearUserData())
                    navigate('/login', { replace: true })
                })
            }
        }).catch(err => {
            console.log(err)
        })
    }

    const handleChangeInfoForm = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }
    const handleChangePasswordForm = (e) => {
        setPasswordFormData({
            ...passwordFormData,
            [e.target.name]: e.target.value
        })
    }
    const onSaveInfoChanges = () => {
        const body = { ...formData }
        const url = `${BASE_URL}${API_ENDPOINTS.POST_UPDATE_CUSTOMER_INFO}`
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            }
        }).then(res => {
            if (res.status == 200) {
                res.json().then(data => {
                    console.log(data)
                    dispatch(setUserData(body))
                })
            }
        }).catch(err => {
            console.log(err)
        })
    }
    return (
        <>
            <div className="card">
                <div className="card-body">
                    <form className="row">
                        <div className="col-md-9">
                            <div className="form-row">
                                <div className="col form-group">
                                    <label>First Name</label>
                                    <input name='firstName' readOnly={!editingMode} onChange={(e) => handleChangeInfoForm(e)} type="text" className="form-control" value={firstName} />
                                </div>
                                <div className="col form-group">
                                    <label>Last Name</label>
                                    <input name='lastName' readOnly={!editingMode} onChange={(e) => handleChangeInfoForm(e)} type="text" className="form-control" value={lastName} />
                                </div>

                            </div>

                            <div className="form-row">
                                <div className="col form-group">
                                    <label>Email</label>
                                    <input name='email' readOnly={!editingMode} onChange={(e) => handleChangeInfoForm(e)} type="email" className="form-control" value={email} />
                                </div>
                                {/* <div className="form-group col-md-6">
                                <label>Country</label>
                                <select id="inputState" className="form-control">
                                    <option> Choose...</option>
                                    <option>Uzbekistan</option>
                                    <option>Russia</option>
                                    <option selected="">United States</option>
                                    <option>India</option>
                                    <option>Afganistan</option>
                                </select>
                            </div>
                            <div className="form-group col-md-6">
                                <label>City</label>
                                <input type="text" className="form-control" />
                            </div> */}
                            </div>

                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label>Zip Code</label>
                                    <input name='zipcode' readOnly={!editingMode} onChange={(e) => handleChangeInfoForm(e)} type="number" className="form-control" value={zipcode} />
                                </div>
                                <div className="form-group col-md-6">
                                    <label>Phone</label>
                                    <input name='phone' readOnly={!editingMode} onChange={(e) => handleChangeInfoForm(e)} type="number" className="form-control" value={phone} />
                                </div>
                            </div>

                            {
                                editingMode ?
                                    <button type='button' onClick={onSaveInfoChanges} className="btn btn-primary mr-1">Save changes</button> :
                                    <></>
                            }
                            <button type='button' onClick={handleEditMode} className={`btn ${editingMode ? '' : 'btn-primary'}  mr-1`}>{editingMode ? 'Cancel' : 'Edit'}</button>

                        </div>
                        <div className="col-md ">
                            <div className='w-100'>
                                <img src={avatar} className="img-md rounded-circle border" />
                                <button type='button' className="btn btn-light mt-2 ml-2">Change avatar</button>
                            </div>
                        </div>
                    </form>
                </div >
            </div >

            <div className="card mt-2">
                <div className="card-body">
                    <div className="form-row pt-1">
                        <div className="form-group col-md-7">
                            <label>Current Password</label>
                            <input name='currentPassword' type="password" className="form-control" value={currentPassword} onChange={(e) => handleChangePasswordForm(e)} />
                        </div>
                        <div className="form-group col-md-7">
                            <label>New Password</label>
                            <input name='newPassword' type="password" className="form-control" value={newPassword} onChange={(e) => handleChangePasswordForm(e)} />
                        </div>
                        <div className="form-group col-md-7">
                            <label>Repeat Password</label>
                            <input name='repeatPassword' type="password" className="form-control" value={repeatPassword} onChange={(e) => handleChangePasswordForm(e)} />
                        </div>
                    </div>


                    <button type='button' onClick={handleChangePassword} className="btn btn-light mr-1">Change password</button>
                </div>
            </div>
        </>
    )
}

export default CustomerDetail