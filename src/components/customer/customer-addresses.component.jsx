import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectAccessToken } from '../../store/general/general.selector'
import { setSelectedCustomerTab } from '../../store/general/general.action'
import { API_ENDPOINTS, BASE_URL, generateHeaders } from '../../utils/api-requesting/api-requesting.util'

import CustomerAddressItem from '../customer-address-item/customer-address-item.component'
import CustomerCreateAddressModal from '../customer-create-address-modal/customer-create-address-model.component'
import CustomerEditAddressModal from '../customer-address-edit-modal/customer-address-edit-modal.component'

const CustomerAddresses = () => {
    const dispatch = useDispatch()
    const token = useSelector(selectAccessToken)
    const [addresses, setAddresses] = useState([])
    const [showCreateAddressModal, setShowCreateAddressModal] = useState(false);
    const [showEditAddressModal, setShowEditAddressModal] = useState(false);
    const [editingAddressData, setEditingAddressData] = useState(null)
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

    const onPostEditAddress = (body, onSuccess, onFail) => {
        const { id, firstName, lastName, phone, country, city, ward, address, address_type, defaultAddress } = body
        const url = `${BASE_URL}${API_ENDPOINTS.POST_UPDATE_ADDRESS}${id}`
        const data = { firstName, lastName, phone, country, city, ward, address, address_type, defaultAddress }
        fetch(url, {
            method: 'POST',
            headers: generateHeaders(token),
            body: JSON.stringify(data)
        }).then(res => {
            if (res.status == 200) {
                res.json().then(resData => {
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
    const handleChangeEditingAddress = (e) => {
        const { name, value } = e.target
        console.log(`${name}  ${value}`)
        setEditingAddressData({
            ...editingAddressData,
            [name]: value
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
        setEditingAddressData({ ...address })
        setShowEditAddressModal(true)
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
                <button onClick={e => setShowCreateAddressModal(true)} className="btn btn-light mb-3"> <i className="fa fa-plus"></i> Add new address </button>

                <CustomerCreateAddressModal
                    show={showCreateAddressModal}
                    onHide={() => setShowCreateAddressModal(false)}
                    postCreateAddress={onCreateAddress}
                />
                <CustomerEditAddressModal
                    show={showEditAddressModal}
                    onHide={() => setShowEditAddressModal(false)}
                    postEditAddress={onPostEditAddress}
                    addressShouldEdit={editingAddressData}
                    handleChangeEditingAddress={e => handleChangeEditingAddress(e)}
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

export default CustomerAddresses