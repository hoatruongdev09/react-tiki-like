import { useState, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal';

const CustomerEditAddressModal = (props) => {
    const { show, onHide, handleChangeEditingAddress, addressShouldEdit, postEditAddress } = props


    if (addressShouldEdit == null) {
        return <></>
    }

    const { firstName, lastName, country, city, ward, address, phone, address_type, defaultAddress } = addressShouldEdit
    const handleChangeForm = (e) => {
        handleChangeEditingAddress(e)
    }

    const onHideModal = () => {
        onHide()
    }
    const submitForm = () => {
        const body = addressShouldEdit
        postEditAddress(body, () => {
            onHideModal()
        }, (code, err) => {
            console.log(err)
        })
    }
    const onMakeDefaultClicked = () => {
        handleChangeEditingAddress({
            target: {
                name: 'defaultAddress',
                value: !defaultAddress
            }
        })
    }
    return (
        <>
            <Modal
                show={show}
                onHide={onHide}
                size="lg"
                aria-labelledby="customer-edit-address-modal"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="customer-edit-address-modal">
                        Edit address
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
                                    <input className="custom-control-input" defaultChecked={address_type !== 0 ? true : false} type="radio" name="address_type" value={0} onChange={e => handleChangeForm(e)} />
                                    <span className="custom-control-label"> Home </span>
                                </label>
                                <label className="custom-control custom-radio custom-control-inline">
                                    <input className="custom-control-input" defaultChecked={address_type === 0 ? true : false} type="radio" name="address_type" value={1} onChange={e => handleChangeForm(e)} />
                                    <span className="custom-control-label"> Work </span>
                                </label>
                            </div>
                            <div className="form-group">
                                <button type='button' className={`btn ${defaultAddress ? 'btn-primary' : ''} `} onClick={() => onMakeDefaultClicked()}>Make this default</button>
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

export default CustomerEditAddressModal