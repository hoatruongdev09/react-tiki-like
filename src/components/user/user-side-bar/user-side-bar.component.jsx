import { Link } from 'react-router-dom'

import './user-side-bar.styles.scss'


const UserSideBar = () => {
    return (
        <aside className="col-md-3">
            <nav className="list-group list-group-modified">
                <Link to="" className="list-group-item list-group-item-modified active-modified"> Account overview </Link>
                <Link to="addresses" className="list-group-item list-group-item-modified"> My Address </Link>
                <Link to="orders" className="list-group-item list-group-item-modified"> My Orders </Link>
                <Link to="wishlist" className="list-group-item list-group-item-modified"> My wishlist </Link>
                {/* <Link to="" className="list-group-item list-group-item-modified"> My Selling Items </Link> */}
                <Link to="settings" className="list-group-item list-group-item-modified"> Settings </Link>
                {/* <Link to="" className="list-group-item list-group-item-modified"> Log out </Link> */}
            </nav>
        </aside>
    )
}

export default UserSideBar