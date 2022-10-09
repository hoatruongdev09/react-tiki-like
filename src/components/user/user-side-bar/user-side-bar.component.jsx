import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { selectedCustomerTab } from '../../../store/general/general.selector'
import { setSelectedCustomerTab } from '../../../store/general/general.action'
import './user-side-bar.styles.scss'
import { useEffect } from 'react'


const UserSideBar = () => {
    const location = useLocation()
    const dispatch = useDispatch()
    const selectedTab = useSelector(selectedCustomerTab)
    console.log(`location: `, location.pathname)

    useEffect(() => {
        const pathname = location.pathname
        if (pathname.endsWith('addresses')) {
            onChangeTab(1)
        } else if (pathname.endsWith('my-orders') || pathname.includes('order-detail')) {
            onChangeTab(2)
        } else if (pathname.endsWith('wishlist')) {
            onChangeTab(3)
        } else if (pathname.endsWith('settings')) {
            onChangeTab(4)
        } else {
            onChangeTab(0)
        }
    })

    const onChangeTab = (tab) => {
        dispatch(setSelectedCustomerTab(tab))
    }

    return (
        <aside className="col-md-3 mb-2">
            <nav className="list-group list-group-modified">
                <Link onClick={(e) => onChangeTab(0)} to="" className={`list-group-item list-group-item-modified ${selectedTab == 0 ? 'active-modified' : ''}`}> Account overview </Link>
                <Link onClick={(e) => onChangeTab(1)} to="addresses" className={`list-group-item list-group-item-modified ${selectedTab == 1 ? 'active-modified' : ''}`}> My Address </Link>
                <Link onClick={(e) => onChangeTab(2)} to="my-orders" className={`list-group-item list-group-item-modified ${selectedTab == 2 ? 'active-modified' : ''}`}> My Orders </Link>
                <Link onClick={(e) => onChangeTab(3)} to="wishlist" className={`list-group-item list-group-item-modified ${selectedTab == 3 ? 'active-modified' : ''}`}> My wishlist </Link>
                <Link onClick={(e) => onChangeTab(4)} to="settings" className={`list-group-item list-group-item-modified ${selectedTab == 4 ? 'active-modified' : ''}`}> Settings </Link>
                {/* <Link onClick={(e) => onChangeTab(0)} to="" className={`list-group-item list-group-item-modified ${selectedTab == 0 ? 'active-modified' : ''}`}> My Selling Items </Link> */}
                {/* <Link to="" className={`list-group-item list-group-item-modified ${selectedTab == 0 ? 'active-modified' : ''}`}> Log out </Link> */}
            </nav>
        </aside>
    )
}

export default UserSideBar