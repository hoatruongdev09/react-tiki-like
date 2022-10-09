import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { selectAccessToken } from '../../store/general/general.selector'
import { clearAuthorization, setAuthorize, setSelectedCustomerTab } from '../../store/general/general.action'
import { setUserData, clearUserData } from '../../store/user/user.action'
import { selectUserData } from '../../store/user/user.selector'
import { BASE_URL, API_ENDPOINTS, generateHeaders } from '../../utils/api-requesting/api-requesting.util'
import OrderStatusBadge from '../order-status-badge/order-status-badge.component'

const CustomerMyOrder = () => {
    const token = useSelector(selectAccessToken)
    const [orders, setOrders] = useState([])
    useEffect(() => {
        fetchOrder()
    }, [token])

    const fetchOrder = () => {
        const url = `${BASE_URL}${API_ENDPOINTS.GET_USER_ORDERS}`
        const headers = generateHeaders(token)
        fetch(url, {
            method: 'GET',
            headers: headers
        }).then(res => {
            if (res.status == 200) {
                res.json().then(data => {
                    console.log(data)
                    setOrders(data)
                })
            } else {
                console.error(`res status: ${res.status}`)
            }
        }).catch(err => {
            console.error(err)
        })
    }

    const CustomerOrderCard = ({ order }) => {
        const { id, firstName, lastName, phone, email,
            country, city, ward, address, address_type,
            status,
            paymentMethod,
            useStandardDelivery,
            value,
            couponId,
            createdAt } = order
        return (
            <article className="card mb-4">
                <header className="card-header">
                    <OrderStatusBadge status={status} />
                    <Link to={`/customer/order-detail/${id}`} className='btn btn-primary float-right'>View Detail</Link>
                    <strong className="d-inline-block ml-3 mr-3">Order ID: {id}</strong>
                    <span>Order Date: {new Date(createdAt).toDateString()}</span>
                </header>
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-8">
                            <h6 className="text-muted" style={{ fontWeight: 'bolder' }}>Delivery to</h6>
                            <p>{firstName} {lastName} <br />
                                Phone: {phone} <br /> Email: {email} <br />
                                Location: {address}, {city}, {country} <br />
                                {/* P.O. Box: 100123 */}
                            </p>
                        </div>
                        <div className="col-md-4">
                            <h6 className="text-muted" style={{ fontWeight: 'bolder' }}>Payment</h6>
                            {
                                paymentMethod == 0 ?
                                    (<span className="text-success">
                                        Cash On Delivery
                                    </span>)
                                    : (<span className="text-success">
                                        <i className="fab fa-lg fa-cc-visa"></i> Visa  **** 4216
                                    </span>)
                            }
                            <p>Subtotal: ${value} <br />
                                Shipping fee:  $56 <br />
                                <span className="b">Total:  ${value} </span>
                            </p>
                        </div>
                    </div>
                </div>

            </article>
        )
    }
    return (
        orders.map(order => (
            <CustomerOrderCard key={`order-key-${order.id}`} order={order} />
        ))
    )
}

export default CustomerMyOrder