import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'


import { setUserData } from '../../store/user/user.action'

import { setLastRouteBeforeAuth } from '../../store/general/general.action'
import { selectAccessToken, selectAuthorized } from '../../store/general/general.selector'
import { selectCartItems } from '../../store/cart/cart.selector'
import { clearCartItem, saveCart } from '../../store/cart/cart.actions'

import { BASE_URL, API_ENDPOINTS, generateHeaders } from '../../utils/api-requesting/api-requesting.util'
import CartPaymentAddressForm from './cart-payment-new-address-form.component'
import CartPaymentAddressItem from './cart-payment-address-item.component'
import CartPaymentVisaInfo from './cart-payment-visa-info.component'


const defaultAddressForm = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: '',
    city: '',
    ward: '',
    address: '',
    address_type: 0
}
const CartPayment = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch()

    const authorized = useSelector(selectAuthorized)
    const accessToken = useSelector(selectAccessToken)

    const cartItems = useSelector(selectCartItems)

    const [useStandard, setUseStandard] = useState(true)
    const [userAddresses, setUserAddresses] = useState([])
    const [selectedAddress, setSelectedAddress] = useState(null)
    const [useOtherAddress, setUseOtherAddress] = useState(false)

    const [otherAddressData, setOtherAddressData] = useState(defaultAddressForm)
    const [paymentMethod, setPaymentMethod] = useState(0)

    useEffect(() => {
        if (!authorized) { return }
        fetchUserAddresses(accessToken)
    }, [authorized, accessToken])

    useEffect(() => {
        if (cartItems == null || cartItems.length == 0) {
            navigate('/cart', { replace: true })
            return
        }
        if (!authorized) {
            if (accessToken) {
                fetchAuth(accessToken)
            } else {
                dispatch(setLastRouteBeforeAuth(location.pathname))
                navigate('/login', { replace: true })
                return
            }
        }
    }, [authorized, accessToken, cartItems, dispatch])

    const fetchUserAddresses = (token) => {
        const url = `${BASE_URL}${API_ENDPOINTS.GET_CUSTOMER_ADDRESSES}`
        const header = generateHeaders(token)
        fetch(url, {
            method: 'GET',
            headers: header
        }).then(res => {
            if (res.status == 200) {
                res.json().then(data => {
                    setUserAddresses(data)
                    const defaultAddress = data.find(add => add.defaultAddress)
                    setSelectedAddress(defaultAddress)
                }).catch(err => {

                })
            }
        }).catch(err => {

        })
    }

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
    const onChangeDelivery = (value) => {
        setUseStandard(value)
    }
    const onSelectAddress = (address) => {
        setUseOtherAddress(false)
        setSelectedAddress(address)
    }
    const onAddressFormValueChanged = (e) => {
        const { name, value } = e.target
        setOtherAddressData({
            ...otherAddressData,
            [name]: value
        })
    }
    const onConfirmClicked = (e) => {

        const data = {
            useStandardDelivery: useStandard,
            useOtherAddress: useOtherAddress,
            addressID: useOtherAddress ? -1 : selectedAddress.id,
            addressData: useOtherAddress ? otherAddressData : null,
            paymentMethod: paymentMethod,
            items: cartItems
        }
        fetch(`${BASE_URL}${API_ENDPOINTS.POST_PLACE_ORDER}`, {
            method: 'POST',
            headers: generateHeaders(accessToken),
            body: JSON.stringify(data)
        }).then(res => {
            if (res.status == 200) {
                res.json().then(data => {
                    dispatch(clearCartItem())
                    dispatch(saveCart())
                    //TODO: go to order detail page

                })
            } else {
                console.error(`request failed: ${res.status} : ${res.statusText}`)
            }
        }).catch(err => {
            console.error(err)
        })
    }
    return (
        <section className="section-content padding-y">
            <div className="container" style={{ maxWidth: "720px" }}  >

                <div className="card mb-4">
                    <div className="card-body">
                        <h4 className="card-title mb-3" style={{ fontWeight: 'bolder' }}>Delivery info</h4>

                        <div className="form-row">
                            <div className="form-group col-sm-6">
                                <label className={`js-check box ${useStandard ? "active" : ""}`}>
                                    <input type="radio" value={useStandard} checked={useStandard} onChange={() => onChangeDelivery(true)} />
                                    <h6 className="title">Standart delivery</h6>
                                    <p className="text-muted">Free by airline within 20 days</p>
                                </label>
                            </div>
                            <div className="form-group col-sm-6">
                                <label className={`js-check box ${!useStandard ? "active" : ""}`}>
                                    <input type="radio" value={!useStandard} checked={!useStandard} onChange={() => onChangeDelivery(false)} />
                                    <h6 className="title">Fast delivery</h6>
                                    <p className="text-muted">Extra 20$ will be charged </p>
                                </label>
                            </div>
                        </div>
                        <hr />
                        <h4 className="card-title mb-3" style={{ fontWeight: 'bolder' }}>Addresses</h4>
                        <div className='form-row'>
                            {
                                userAddresses.map(address => (
                                    <CartPaymentAddressItem
                                        key={`address-item-${address.id}`}
                                        address={address}
                                        selected={address == selectedAddress && !useOtherAddress}
                                        onSelectAddress={e => onSelectAddress(e)} />
                                ))
                            }
                            <div className="form-group col-sm-6">
                                <label className={`js-check box ${useOtherAddress ? 'active' : ''}`}>
                                    <input type="radio" value={useOtherAddress} checked={useOtherAddress} onChange={() => setUseOtherAddress(!useOtherAddress)} />
                                    <h6 className="title">Other Address</h6>
                                    <p className="text-muted">Enter new address </p>
                                </label>
                            </div>
                        </div>
                        {useOtherAddress ? <CartPaymentAddressForm addressData={otherAddressData} onAddressFormValueChanged={onAddressFormValueChanged} /> : <></>}
                    </div>
                </div>

                <div className="card mb-4">
                    <div className="card-body">
                        <h4 className="card-title mb-4">Payment</h4>
                        <div className="form-row">
                            <div className="form-group col-sm-12">
                                <label className={`js-check box ${paymentMethod == 0 ? "active" : ""}`}>
                                    <input type="radio" value={paymentMethod == 0} checked={paymentMethod == 0} onChange={() => setPaymentMethod(0)} />
                                    <h6 className="title">Cast on delivery (COD)</h6>
                                    <p className="text-muted">Free by airline within 20 days</p>
                                </label>
                            </div>
                            <div className="form-group col-sm-12">
                                <label className={`js-check box ${paymentMethod == 1 ? "active" : ""}`}>
                                    <input type="radio" value={paymentMethod == 1} checked={paymentMethod == 1} onChange={() => setPaymentMethod(1)} />
                                    <h6 className="title">Visa/Master Card</h6>
                                    <p className="text-muted">Extra 20$ will be charged </p>
                                </label>
                            </div>
                        </div>
                        {
                            paymentMethod == 1 ? <CartPaymentVisaInfo /> : <></>
                        }

                    </div>
                    <div className='w-100 d-flex justify-content-center'>
                        <button onClick={onConfirmClicked} className="btn btn-primary btn-block" type="button"> Confirm  </button>
                    </div>
                </div>

            </div>
        </section>
    )
}

export default CartPayment