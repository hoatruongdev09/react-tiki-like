import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectedCustomerTab } from '../../../store/general/general.selector'
import './user-side-bar.styles.scss'


const UserSideBar = () => {
    const selectedTab = useSelector(selectedCustomerTab)
    console.log('selected tab ', selectedTab)
    return (
        <aside className="col-md-3 mb-2">
            <nav className="list-group list-group-modified">
                <Link to="" className={`list-group-item list-group-item-modified ${selectedTab == 0 ? 'active-modified' : ''}`}> Account overview </Link>
                <Link to="addresses" className={`list-group-item list-group-item-modified ${selectedTab == 1 ? 'active-modified' : ''}`}> My Address </Link>
                <Link to="orders" className={`list-group-item list-group-item-modified ${selectedTab == 2 ? 'active-modified' : ''}`}> My Orders </Link>
                <Link to="wishlist" className={`list-group-item list-group-item-modified ${selectedTab == 3 ? 'active-modified' : ''}`}> My wishlist </Link>
                {/* <Link to="" className={`list-group-item list-group-item-modified ${selectedTab == 0 ? 'active-modified' : ''}`}> My Selling Items </Link> */}
                <Link to="settings" className={`list-group-item list-group-item-modified ${selectedTab == 4 ? 'active-modified' : ''}`}> Settings </Link>
                {/* <Link to="" className={`list-group-item list-group-item-modified ${selectedTab == 0 ? 'active-modified' : ''}`}> Log out </Link> */}
            </nav>
        </aside>
    )
}

export default UserSideBar