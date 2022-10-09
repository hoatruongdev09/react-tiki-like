import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { selectAccessToken } from '../../store/general/general.selector'
import { clearAuthorization, setAuthorize, setSelectedCustomerTab } from '../../store/general/general.action'
import { setUserData, clearUserData } from '../../store/user/user.action'
import { selectUserData } from '../../store/user/user.selector'
import { BASE_URL, API_ENDPOINTS, generateHeaders } from '../../utils/api-requesting/api-requesting.util'
import OrderStatusBadge from '../order-status-badge/order-status-badge.component'


const CustomerOrderDetail = () => {
    const token = useSelector(selectAccessToken)
    const { id } = useParams()

    const [orderDetail, setOrderDetail] = useState(null)



    useEffect(() => {
        if (id) {
            fetchOrderData(id)
        }
    }, [id])

    const fetchOrderData = (id) => {
        const url = `${BASE_URL}${API_ENDPOINTS.GET_ORDER_DETAIL}${id}`
        const header = generateHeaders(token)
        fetch(url, {
            method: 'GET',
            headers: header
        }).then(res => {
            if (res.status == 200) {
                res.json().then(data => {
                    console.log(data)
                    setOrderDetail(data)
                })
            } else {
                console.error(`response status: ${res.status}`)
            }
        }).catch(err => {
            console.error(err)
        })
    }
    const calculateOrderSubtotal = (items) => {
        let total = 0
        items.forEach(item => {
            total += item.price * item.count * (1 - item.discount / 100)
        })
        return total
    }
    if (orderDetail) {
        return (
            <>
                <div className="text">
                    <p className="mr-2 float-left">Order Detail: <strong>#{orderDetail.id}</strong></p>
                    <OrderStatusBadge className='float-right' status={orderDetail.status} />
                </div>
                <hr />
                <article className="card-group card-stat">
                    <figure className="card bg">
                        <div className="p-3">
                            <h6 className="title">DELIVERY TO</h6>
                            <p>
                                Address: {orderDetail.address}, {orderDetail.city}, {orderDetail.country} <br />
                                Phone: {orderDetail.phone}
                            </p>
                        </div>
                    </figure>
                    <figure className="card bg">
                        <div className="p-3">
                            <h6 className="title">DELIVERY METHOD</h6>
                            <p>{orderDetail.useStandardDelivery ? 'Standard Delivery' : 'Fast Delivery'}</p>
                        </div>
                    </figure>
                    <figure className="card bg">
                        <div className="p-3">
                            <h6 className="title">PAYMENT METHOD</h6>
                            {orderDetail.paymentMethod == 0 ? 'Cash on delivery' : (
                                <span className="text-success">
                                    <i className="fab fa-lg fa-cc-visa"></i> Visa  **** 4216
                                </span>)
                            }
                        </div>
                    </figure>
                </article>
                <hr />
                <article className="card-group card-stat">
                    <table className="table table-hover table-light">
                        <thead>
                            <tr>
                                <th scope="col"></th>
                                <th scope="col">Products</th>
                                <th scope="col">Price</th>
                                <th scope="col">Count</th>
                                <th scope="col">Discount</th>
                                <th scope="col">Sub total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                orderDetail.items.map(item => (
                                    <tr>
                                        <td style={{ width: '64px' }}><img style={{ width: '64px', height: 'auto' }} src={item.displayImageUrl} /></td>
                                        <td style={{ width: '400px' }}>
                                            <Link to='' className='text-black d-block mb-2'>{item.name}</Link>
                                            <button className='btn btn-outline-primary' style={{ paddingTop: '2px', paddingBottom: '2px', paddingLeft: '5px', paddingRight: '5px' }}>Write review</button>
                                        </td>
                                        <td style={{ width: '64px' }}>${item.price}</td>
                                        <td style={{ width: '64px' }}>{item.count}</td>
                                        <td style={{ width: '64px' }}>{item.discount}</td>
                                        <td style={{ width: '64px' }}>${item.price * (1 - item.discount / 100)}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </article>
                <article className="card-group card-stat">
                    <div className="container">
                        <div className="row justify-content-end">
                            <div className="col-2">
                                <h6 className='float-right'>Sub total:</h6>
                            </div>
                            <div className="col-3">
                                <h6 className='float-right'>${calculateOrderSubtotal(orderDetail.items)}</h6>
                            </div>
                        </div>
                        <div className="row justify-content-end">
                            <div className="col-2">
                                <h6 className='float-right'>Delivery fee:</h6>
                            </div>
                            <div className="col-3">
                                <h6 className='float-right'>$0</h6>
                            </div>
                        </div>
                        <div className="row justify-content-end">
                            <div className="col-2">
                                <h6 className='float-right'>Total:</h6>
                            </div>
                            <div className="col-3">
                                <h5 className='float-right text-danger'>${orderDetail.value}</h5>
                            </div>
                        </div>
                    </div>
                </article>
            </>
        )
    } else {
        return (<></>)
    }
}

export default CustomerOrderDetail