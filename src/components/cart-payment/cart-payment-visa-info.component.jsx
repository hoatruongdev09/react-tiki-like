const CartPaymentVisaInfo = () => {
    return (
        <form role="form">
            <div className="form-group">
                <label htmlFor="username">Name on card</label>
                <input type="text" className="form-control" name="username" placeholder="Ex. John Smith" required="" />
            </div>

            <div className="form-group">
                <label htmlFor="cardNumber">Card number</label>
                <div className="input-group">
                    <input type="text" className="form-control" name="cardNumber" placeholder="" />
                    <div className="input-group-append">
                        <span className="input-group-text">
                            <i className="fab fa-cc-visa"></i> &nbsp; <i className="fab fa-cc-amex"></i> &nbsp;
                            <i className="fab fa-cc-mastercard"></i>
                        </span>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-md flex-grow-0">
                    <div className="form-group">
                        <label className="hidden-xs">Expiration</label>
                        <div className="form-inline" style={{ minWidth: "220px" }}>
                            <select className="form-control" style={{ width: "100px" }}>
                                <option>MM</option>
                                <option>01 - January</option>
                                <option>02 - February</option>
                                <option>03 - February</option>
                            </select>
                            <span style={{ width: "20px", textAlign: "center" }}> / </span>
                            <select className="form-control" style={{ width: "100px" }}>
                                <option>YY</option>
                                <option>2018</option>
                                <option>2019</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="form-group">
                        <label data-toggle="tooltip" title="" data-original-title="3 digits code on back side of the card">CVV <i className="fa fa-question-circle"></i></label>
                        <input className="form-control" required="" type="text" />
                    </div>
                </div>
            </div>

        </form>
    )
}

export default CartPaymentVisaInfo