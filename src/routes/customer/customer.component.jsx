import { useEffect } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { selectAccessToken } from '../../store/general/general.selector'
import { setLastRouteBeforeAuth } from '../../store/general/general.action'
import { setUserData } from '../../store/user/user.action'

import UserSideBar from '../../components/user/user-side-bar/user-side-bar.component'
import UserTitleBar from '../../components/user/user-title-bar/user-title-bar.component'

import { BASE_URL, API_ENDPOINTS, generateHeaders } from '../../utils/api-requesting/api-requesting.util'

const Customer = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch()
    const token = useSelector(selectAccessToken)

    useEffect(() => {
        if (token) {
            fetchAuth(token)
        } else {
            dispatch(setLastRouteBeforeAuth(location.pathname))
            navigate('/login', { replace: true })
        }
    }, [token, dispatch])

    const fetchAuth = (token) => {
        const url = `${BASE_URL}${API_ENDPOINTS.CUSTOMER_AUTH}`
        const headers = generateHeaders(token)
        fetch(url, {
            headers: headers
        }).then(res => {
            if (res.status == 200) {
                res.json().then(data => {
                    console.log(data)
                    dispatch(setUserData(data))
                })
            } else if (res.status == 403) {
                dispatch(setLastRouteBeforeAuth(location.pathname))
                navigate('/login', { replace: true })
            }
        }).catch(err => {

            console.error(err)
        })
    }

    return (
        <>
            <UserTitleBar />

            <section className="section-content padding-y">
                <div className="container">

                    <div className="row">
                        <UserSideBar />
                        <main className="col-md-9">
                            <Outlet />
                        </main>
                    </div>
                </div>
            </section>

        </>
    )
}
export default Customer