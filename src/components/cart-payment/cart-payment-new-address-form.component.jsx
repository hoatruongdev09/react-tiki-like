import { Fragment } from "react"

const CartPaymentAddressForm = ({ addressData, onAddressFormValueChanged }) => {
    const { firstName, lastName, email, phone, country, city, ward, address } = addressData
    return (
        <Fragment>
            <div className="form-row">
                <div className="col form-group">
                    <label>First name</label>
                    <input type="text" className="form-control" name="firstName" value={firstName} onChange={e => onAddressFormValueChanged(e)} placeholder="" />
                </div>
                <div className="col form-group">
                    <label>Last name</label>
                    <input type="text" className="form-control" name="lastName" value={lastName} onChange={e => onAddressFormValueChanged(e)} placeholder="" />
                </div>
            </div>

            <div className="form-row">
                <div className="col form-group">
                    <label>Email</label>
                    <input type="email" className="form-control" name="email" value={email} onChange={e => onAddressFormValueChanged(e)} placeholder="" />
                </div>
                <div className="col form-group">
                    <label>Phone</label>
                    <input type="number" className="form-control" name="phone" value={phone} onChange={e => onAddressFormValueChanged(e)} placeholder="" />
                </div>
            </div>

            <div className="form-row">
                <div className="form-group col-md-4">
                    <label>Country</label>
                    <input type="text" value={country} name="country" onChange={e => onAddressFormValueChanged(e)} className="form-control" />
                </div>
                <div className="form-group col-md-4">
                    <label>City</label>
                    <input type="text" value={city} name="city" onChange={e => onAddressFormValueChanged(e)} className="form-control" />
                </div>
                <div className="form-group col-md-4">
                    <label>Ward</label>
                    <input type="text" value={ward} name="ward" onChange={e => onAddressFormValueChanged(e)} className="form-control" />
                </div>
            </div>
            <div className="form-group">
                <label>Address</label>
                <textarea className="form-control" name="address" value={address} onChange={e => onAddressFormValueChanged(e)} rows="2"></textarea>
            </div>

            <div className="form-group">
                <label className="custom-control custom-radio custom-control-inline">
                    <input className="custom-control-input" type="radio" name="address_type" defaultChecked value="0" onChange={e => onAddressFormValueChanged(e)} />
                    <span className="custom-control-label"> Home </span></label >
                <label className="custom-control custom-radio custom-control-inline" >
                    <input className="custom-control-input" type="radio" name="address_type" value="1" onChange={e => onAddressFormValueChanged(e)} />
                    <span className="custom-control-label" > Work </span ></label >
            </div >
        </Fragment >
    )
}

export default CartPaymentAddressForm