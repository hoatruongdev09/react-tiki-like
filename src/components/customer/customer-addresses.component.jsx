import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectAccessToken } from '../../store/general/general.selector'
import { setSelectedCustomerTab } from '../../store/general/general.action'
import { API_ENDPOINTS, BASE_URL, generateHeaders } from '../../utils/api-requesting/api-requesting.util'
import Modal from 'react-bootstrap/Modal';
import CustomerAddressItem from '../customer-address-item/customer-address-item.component'


const CustomerAddresses = () => {
    const dispatch = useDispatch()
    const token = useSelector(selectAccessToken)
    const [addresses, setAddresses] = useState([])
    const [modalShow, setModalShow] = useState(false);
    const [fetchingData, setFetchingData] = useState(true)


    useEffect(() => {
        dispatch(setSelectedCustomerTab(1))
        fetchAddresses(token)
    }, [token, dispatch])

    const fetchAddresses = (token) => {
        const url = `${BASE_URL}${API_ENDPOINTS.GET_CUSTOMER_ADDRESSES}`
        const headers = generateHeaders(token)
        fetch(url, {
            method: 'GET',
            headers: headers
        }).then(res => {
            if (res.status == 200) {
                res.json().then(data => {
                    setAddresses(data)
                    setFetchingData(false)
                })
            }
        }).catch(err => {
            setFetchingData(false)
            console.error(err)
        })
    }

    const onCreateAddress = (body, onSuccess, onFail) => {
        console.log(body)
        const url = `${BASE_URL}${API_ENDPOINTS.POST_CREATE_CUSTOMER_ADDRESS}`
        fetch(url, {
            method: 'POST',
            headers: generateHeaders(token),
            body: JSON.stringify(body),
        }).then(res => {
            if (res.status == 200) {
                res.json().then(data => {
                    onSuccess()
                    fetchAddresses(token)
                })
            } else {
                onFail('normal', res)
            }
        }).catch(err => {
            onFail('internal', err)
        })
    }

    const onDeleteAddress = (address) => {
        const { id } = address
        const url = `${BASE_URL}${API_ENDPOINTS.POST_DELETE_CUSTOMER_ADDRESS}${id}`
        fetch(url, {
            method: 'POST',
            headers: generateHeaders(token)
        }).then(res => {
            if (res.status == 200) {
                fetchAddresses(token)
            }
        }).catch(error => {
            console.log(error)
        })
    }
    const onEditAddress = (address) => {

    }
    const onMakeAddressDefault = (address) => {
        const { id } = address
        const url = `${BASE_URL}${API_ENDPOINTS.POST_SET_CUSTOMER_DEFAULT_ADDRESS}${id}`
        fetch(url, {
            method: 'POST',
            headers: generateHeaders(token)
        }).then(res => {
            if (res.status == 200) {
                fetchAddresses(token)
            }
        }).catch(error => {
            console.log(error)
        })
    }

    return (

        fetchingData ? <></> :
            <>
                <button onClick={e => setModalShow(true)} className="btn btn-light mb-3"> <i className="fa fa-plus"></i> Add new address </button>

                <CustomerCreateAddressModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    postCreateAddress={onCreateAddress}
                />

                <div className="row">
                    {
                        addresses.map(address => (
                            <CustomerAddressItem
                                key={address.id}
                                address={address}
                                onDeleteClicked={onDeleteAddress}
                                onMakeDefaultClick={onMakeAddressDefault}
                                onEditClicked={onEditAddress}
                            />
                        ))
                    }
                </div>
            </>



    )

}
const defaultCreateAddressForm = {
    firstName: '',
    lastName: '',
    country: '',
    city: '',
    ward: '',
    address: '',
    phone: '',
    address_type: 0,
    use_default: false
}
const CustomerCreateAddressModal = (props) => {
    const [formData, setFormData] = useState(defaultCreateAddressForm)
    const { firstName, lastName, country, city, ward, address, phone, address_type, use_default } = formData

    const { show, onHide, postCreateAddress } = props

    const handleChangeForm = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const onHideModal = () => {
        setFormData(defaultCreateAddressForm)
        onHide()
    }

    const submitForm = () => {
        const body = { ...formData }
        postCreateAddress(body, () => {
            onHideModal()
        }, (code, err) => {
            console.log(err)
        })
    }

    const onMakeDefaultClicked = () => {
        const defaultAddress = formData.use_default
        setFormData({
            ...formData,
            use_default: !defaultAddress
        })
    }

    return (
        <>
            <Modal
                show={show}
                onHide={onHide}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Add new address
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <div className="card-body">
                        <form>
                            <div className="form-row">
                                <div className="col form-group">
                                    <label>First name</label>
                                    <input onChange={e => handleChangeForm(e)} name='firstName' type="text" className="form-control" value={firstName} />
                                </div>
                                <div className="col form-group">
                                    <label>Last name</label>
                                    <input onChange={e => handleChangeForm(e)} name='lastName' type="text" className="form-control" value={lastName} />
                                </div>
                                {/* <div class="col form-group">
                                    <label>Email</label>
                                    <input type="email" class="form-control" value="Michael" />
                                </div> */}
                            </div>

                            <div className="form-row">
                                <div className="form-group col-md-4">
                                    <label>Country</label>
                                    <input onChange={e => handleChangeForm(e)} name='country' type="text" className="form-control" value={country} />
                                    {/* <select id="inputState" class="form-control">
                                        <option> Choose...</option>
                                        <option>Uzbekistan</option>
                                        <option>Russia</option>
                                        <option selected="">United States</option>
                                        <option>India</option>
                                        <option>Afganistan</option>
                                    </select> */}
                                </div>
                                <div className="form-group col-md-4">
                                    <label>City</label>
                                    <input onChange={e => handleChangeForm(e)} name='city' type="text" className="form-control" value={city} />
                                </div>
                                <div className="form-group col-md-4">
                                    <label>Ward</label>
                                    <input onChange={e => handleChangeForm(e)} name='ward' type="text" className="form-control" value={ward} />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label>Address</label>
                                    <input onChange={e => handleChangeForm(e)} name='address' type="text" className="form-control" value={address} />
                                </div>
                                <div className="form-group col-md-6">
                                    <label>Phone</label>
                                    <input onChange={e => handleChangeForm(e)} name='phone' type="number" className="form-control" value={phone} />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="custom-control custom-radio custom-control-inline">
                                    <input className="custom-control-input" defaultChecked type="radio" name="address_type" value={0} onChange={e => handleChangeForm(e)} />
                                    <span className="custom-control-label"> Home </span>
                                </label>
                                <label className="custom-control custom-radio custom-control-inline">
                                    <input className="custom-control-input" type="radio" name="address_type" value={1} onChange={e => handleChangeForm(e)} />
                                    <span className="custom-control-label"> Work </span>
                                </label>
                            </div>
                            <div className="form-group">
                                <button type='button' className={`btn ${use_default ? 'btn-primary' : ''} `} onClick={() => onMakeDefaultClicked()}>Make this default</button>
                            </div>
                        </form>
                    </div>

                </Modal.Body>
                <Modal.Footer>
                    <button className='btn' onClick={onHideModal}>Cancel</button>
                    <button className={`btn btn-primary`} onClick={submitForm}>Submit</button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default CustomerAddresses