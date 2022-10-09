const CartPaymentAddressItem = ({ address, selected, onSelectAddress }) => {
    return (
        <div className="form-group col-sm-6">
            <label className={`js-check box ${selected ? "active" : ""}`}>
                <input type="radio" value={selected} checked={selected} onChange={() => onSelectAddress(address)} />
                <h6 className="title">{address.firstName} {address.lastName} - {address.phone}</h6>
                <p className="text-muted">{address.country}, {address.city}, {address.address}</p>
            </label>
        </div>
    )
}

export default CartPaymentAddressItem