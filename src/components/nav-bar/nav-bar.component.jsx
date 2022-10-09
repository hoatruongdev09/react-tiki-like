import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

import { BASE_URL, API_ENDPOINTS } from '../../utils/api-requesting/api-requesting.util'

const MenuBar = () => {

    const [categories, setCategories] = useState([])


    useEffect(() => {
        fetchCategories()
    }, [])

    const fetchCategories = () => {
        console.log(`FETCH DATA`)
        const url = `${BASE_URL}${API_ENDPOINTS.GET_ALL_PARENT_CATEGORIES}`
        fetch(url, {
            method: 'GET'
        }).then(res => {
            if (res.status == 200) {
                res.json().then(data => {
                    console.log('category data: ', data)
                    setCategories(data)
                })
            }
        }).catch(err => {
            console.error(err)
        })
    }

    return (
        <nav className="navbar navbar-main navbar-expand pl-0">
            <ul className="navbar-nav flex-wrap">
                {
                    categories.map(category => (
                        <li className="nav-item">
                            <Link className="nav-link" to={`#${category.id}`}>{category.name}</Link>
                        </li>
                    ))
                }
                {/* <li className="nav-item dropdown">
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
                </li> */}
            </ul>
        </nav>
    )
}
export default MenuBar