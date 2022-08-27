import { Link } from 'react-router-dom'

const MenuBar = () => {
    return (
        <nav className="navbar navbar-main navbar-expand pl-0">
            <ul className="navbar-nav flex-wrap">
                <li className="nav-item">
                    <Link className="nav-link" to="#">Home</Link>
                </li>
                <li className="nav-item dropdown">
                    <Link className="nav-link dropdown-toggle" data-toggle="dropdown" to="#"> Demo pages </Link>
                    <div className="dropdown-menu dropdown-large dropdown-large-modified">
                        <nav className="row">
                            <div className="col-6">
                                <Link to="page-index-1.html">Home page 1</Link>
                                <Link to="page-index-2.html">Home page 2</Link>
                                <Link to="page-category.html">All category</Link>
                                <Link to="page-listing-large.html">Listing list</Link>
                                <Link to="page-listing-grid.html">Listing grid</Link>
                                <Link to="page-shopping-cart.html">Shopping cart</Link>
                                <Link to="page-detail-product.html">Product detail</Link>
                                <Link to="page-content.html">Page content</Link>
                                <Link to="page-user-login.html">Page login</Link>
                                <Link to="page-user-register.html">Page register</Link>
                            </div>
                            <div className="col-6">
                                <Link to="page-profile-main.html">Profile main</Link>
                                <Link to="page-profile-orders.html">Profile orders</Link>
                                <Link to="page-profile-seller.html">Profile seller</Link>
                                <Link to="page-profile-wishlist.html">Profile wishlist</Link>
                                <Link to="page-profile-setting.html">Profile setting</Link>
                                <Link to="page-profile-address.html">Profile address</Link>
                                <Link to="page-components.html" target="_blank">More components</Link>
                            </div>
                        </nav>
                    </div>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="#">Electronics</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="#">Fashion</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="#">Beauty</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="#">Motors</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="#">Sports</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="#">Gardening</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="#">Deals</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="#">Under $10</Link>
                </li>
            </ul>
        </nav>
    )
}
export default MenuBar