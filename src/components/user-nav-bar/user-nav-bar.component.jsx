import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { selectUserData } from '../../store/user/user.selector'
import { selectAuthorized } from '../../store/general/general.selector'
import { clearUserData } from '../../store/user/user.action'
import { clearAuthorization } from '../../store/general/general.action'


const NavBarUser = () => {
    const dispatch = useDispatch()
    const userData = useSelector(selectUserData)
    const authorized = useSelector(selectAuthorized)

    const { firstName, lastName } = userData
    const handleLogout = (e) => {
        e.preventDefault()
        dispatch(clearAuthorization())
        dispatch(clearUserData())
    }
    return (
        <nav className="navbar d-none d-md-flex p-md-0 navbar-expand-sm navbar-light border-bottom">
            <div className="container">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTop4"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarTop4">
                    <ul className="navbar-nav mr-auto">
                        <li>
                            {
                                authorized ?
                                    <span className="nav-link">
                                        Hi <Link to='customer'>{firstName} {lastName}</Link>, <Link onClick={e => handleLogout(e)} to=""> Logout </Link>
                                    </span> :

                                    <span className="nav-link">
                                        Hi, <Link to="/login"> Sign in </Link> or <Link to="/signup"> Register </Link>
                                    </span>

                            }

                        </li>
                        <li><Link to="#" className="nav-link"> Deals </Link></li>
                        <li><Link to="#" className="nav-link"> Sell </Link></li>
                        <li><Link to="#" className="nav-link"> Help </Link></li>
                    </ul>
                    <ul className="navbar-nav">
                        <li className="nav-item dropdown">
                            <Link to="#" className="nav-link dropdown-toggle" data-toggle="dropdown"> Watchlist </Link>
                            <ul className="dropdown-menu small">
                                <li><Link className="dropdown-item" to="#">First item</Link></li>
                                <li><Link className="dropdown-item" to="#">Second item</Link></li>
                                <li><Link className="dropdown-item" to="#">Third item </Link></li>
                            </ul>
                        </li>
                        <li><Link to="#" className="nav-link"> My shop </Link></li>
                        <li><Link to="#" className="nav-link"> <i className="fa fa-bell"></i> </Link></li>
                        <li><Link to="/cart" className="nav-link"> <i className="fa fa-shopping-cart"></i> </Link></li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default NavBarUser