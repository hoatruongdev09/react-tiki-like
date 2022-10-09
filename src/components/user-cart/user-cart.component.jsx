import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useLocation } from 'react-router-dom'

import { selectCartItems } from '../../store/cart/cart.selector'
import { setLastRouteBeforeAuth } from '../../store/general/general.action'
import { selectAuthorized } from '../../store/general/general.selector'
import { addItemToCart, deleteItemFromCart, removeItemFromCart, saveCart } from '../../store/cart/cart.actions'
import { BASE_URL, generateHeaders, API_ENDPOINTS } from '../../utils/api-requesting/api-requesting.util'
import paymentImg from '../../assets/images/misc/payments.png'

const UserCart = () => {
    const cartItems = useSelector(selectCartItems)
    const authorized = useSelector(selectAuthorized)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    const [products, setProducts] = useState([])
    const [cartTotal, setCartTotal] = useState(0)
    const [cartDiscounted, setCartDiscounted] = useState(0)

    useEffect(() => {
        fetchProduct(cartItems.map(item => item.id))
    }, [dispatch])

    useEffect(() => {
        if (cartItems == null || products.length == 0) { return }
        const filteredProducts = products.filter(product => cartItems.find(it => it.id == product.product.id) != null)
        const mappedProducts = filteredProducts.map(product => {
            const count = cartItems.find(it => it.id == product.product.id).count
            return {
                ...product,
                count: count
            }
        })
        setProducts(mappedProducts)
    }, [cartItems, dispatch])

    useEffect(() => {
        setCartTotal(calculateCartTotal(products))
    }, [products])

    const fetchProduct = (productIds) => {
        if (productIds == null || productIds.length == 0) { return }
        let ids = ``
        productIds.forEach((id, index) => {
            ids += index > 0 ? `,${id}` : `${id}`
        })
        fetch(`${BASE_URL}${API_ENDPOINTS.GET_PRODUCTS_DETAIL}${ids}`, {
            method: 'GET',
            headers: generateHeaders('')
        }).then(res => {
            if (res.status == 200) {
                res.json().then(data => {
                    const items = []
                    data.forEach(product => {
                        const count = cartItems.find(it => it.id == product.id).count
                        items.push({
                            product: product,
                            count: count
                        })
                    })
                    setProducts(items)
                }).catch(error => {
                    console.error(error)
                })
            }
        }).catch(error => {
            console.error(error)
        })
    }
    const calculateCartTotal = (products) => {
        console.log(products)
        return products.reduce((prv, crn) => prv + crn.product.price * crn.count * (1 - crn.product.discount), 0)
    }
    const onModifyAmount = (productId, amount) => {
        console.log(`amount: ${amount}`)
        if (amount < 0) {
            dispatch(removeItemFromCart(productId, Math.abs(amount)))
        } else if (amount > 0) {
            dispatch(addItemToCart(productId, Math.abs(amount)))
        }
        dispatch(saveCart())
    }
    const handleRemoveProduct = (productId) => {
        dispatch(deleteItemFromCart(productId))
        dispatch(saveCart())
    }

    const onGoToPayment = () => {
        // to="/cart-payment"
        if (authorized) {
            navigate("/cart-payment")
        } else {
            dispatch(setLastRouteBeforeAuth(location.pathname))
            navigate("/login")
        }
    }

    return (
        <>
            <section className="section-content padding-y">
                <div className="container">

                    <div className="row">
                        <main className="col-md-9">
                            <div className="card">

                                <table className="table table-borderless table-shopping-cart">
                                    <thead className="text-muted">
                                        <tr className="small text-uppercase">
                                            <th scope="col">Product</th>
                                            <th scope="col" width="240">Quantity</th>
                                            <th scope="col" width="120">Price</th>
                                            <th scope="col" className="text-right" width="200"> </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            products.map(product => (
                                                <tr key={product.product.id}>
                                                    <td>
                                                        <figure className="itemside">
                                                            <div className="aside"><img src={product.product.displayImageUrl} className="img-sm" /></div>
                                                            <figcaption className="info">
                                                                <Link to="" className="title text-dark">{product.product.name}</Link>
                                                                {/* <p className="text-muted small">Size: XL, Color: blue, <br /> Brand: Gucci</p> */}
                                                            </figcaption>
                                                        </figure>
                                                    </td>
                                                    <td width='240' className='input-group input-spinner' style={{ width: '240px !important' }}>
                                                        <div className="input-group-prepend">
                                                            <button onClick={e => onModifyAmount(product.product.id, 1)} className="btn btn-light" type="button" id="button-plus"> + </button>
                                                        </div>
                                                        <input type="text" className="form-control" value={product.count} readOnly />
                                                        <div className="input-group-append">
                                                            <button onClick={e => onModifyAmount(product.product.id, -1)} className="btn btn-light" type="button" id="button-minus"> − </button>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="price-wrap">
                                                            <var className="price">${product.product.price * product.count}</var>
                                                            {
                                                                product.count > 1 ? <small className="text-muted"> ${product.product.price} each </small> : <></>
                                                            }
                                                        </div>
                                                    </td>
                                                    <td className="text-right">
                                                        <a data-original-title="Save to Wishlist" title="" href="" className="btn btn-light" data-toggle="tooltip"> <i className="fa fa-heart"></i></a>
                                                        <button className="btn btn-light" onClick={() => handleRemoveProduct(product.product.id)}> Remove</button>
                                                    </td>
                                                </tr>
                                            ))
                                        }

                                    </tbody>
                                </table>

                                <div className="card-body border-top">
                                    <button className="btn btn-primary float-md-right" onClick={e => onGoToPayment()}> Make Purchase <i className="fa fa-chevron-right"></i> </button>
                                    <Link to="/" className="btn btn-light"> <i className="fa fa-chevron-left"></i> Continue shopping </Link>
                                </div>
                            </div>

                            <div className="alert alert-success mt-3">
                                <p className="icontext"><i className="icon text-success fa fa-truck"></i> Free Delivery within 1-2 weeks</p>
                            </div>

                        </main>
                        <aside className="col-md-3">
                            <div className="card mb-3">
                                <div className="card-body">
                                    <form>
                                        <div className="form-group">
                                            <label>Have coupon?</label>
                                            <div className="input-group">
                                                <input type="text" className="form-control" name="" placeholder="Coupon code" />
                                                <span className="input-group-append">
                                                    <button className="btn btn-primary">Apply</button>
                                                </span>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-body">
                                    <dl className="dlist-align">
                                        <dt>Total price:</dt>
                                        <dd className="text-right">USD {cartTotal}</dd>
                                    </dl>
                                    <dl className="dlist-align">
                                        <dt>Discount:</dt>
                                        <dd className="text-right">USD {cartDiscounted}</dd>
                                    </dl>
                                    <dl className="dlist-align">
                                        <dt>Total:</dt>
                                        <dd className="text-right  h5"><strong>${cartTotal * (1 - cartDiscounted)}</strong></dd>
                                    </dl>
                                    <hr />
                                    <p className="text-center mb-3">
                                        <img src={paymentImg} height="26" />
                                    </p>

                                </div>
                            </div>
                        </aside>
                    </div>

                </div>
            </section>

            <section className="section-name border-top padding-y">
                <div className="container">
                    <h6>Payment and refund policy</h6>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                        cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                        proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                        cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                        proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

                </div>
            </section>
        </>
    )
}

export default UserCart