import { Link } from "react-router-dom"
import { useState } from 'react'



const ProductDetailImage = ({ product }) => {
    const [amount, setAmount] = useState(1)
    const { name, displayImageUrl, shortDescription, price, soldCount, stockCount, manufacturerName } = product

    const onModifyAmount = (value) => {
        const nextValue = amount + value
        setAmount(nextValue > 1 ? (nextValue <= stockCount ? nextValue : stockCount) : 1)
    }

    return (
        <section className="section-content bg-white padding-y">
            <div className="container">
                <div className="row">
                    <aside className="col-md-6">
                        <div className="card">
                            <article className="gallery-wrap">
                                <div className="img-big-wrap">
                                    <div>
                                        <Link to="">
                                            <img src={displayImageUrl} />
                                        </Link>
                                    </div>
                                </div>
                                <div className="thumbs-wrap">
                                    <Link to="" className="item-thumb">
                                        <img src="images/items/15.jpg" />
                                    </Link>
                                    <Link to="" className="item-thumb">
                                        <img src="images/items/15-1.jpg" />
                                    </Link>
                                    <Link to="" className="item-thumb">
                                        <img src="images/items/15-2.jpg" />
                                    </Link>
                                    <Link to="" className="item-thumb">
                                        <img src="images/items/15-1.jpg" />
                                    </Link>
                                </div>
                            </article>
                        </div>
                    </aside>
                    <main className="col-md-6">
                        <article className="product-info-aside">

                            <h2 className="title mt-3">{name}</h2>

                            <div className="rating-wrap my-3">
                                <ul className="rating-stars">
                                    <li style={{ width: '80%' }} className="stars-active">
                                        <i className="fa fa-star"></i> <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i> <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                    </li>
                                    <li>
                                        <i className="fa fa-star"></i> <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i> <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                    </li>
                                </ul>
                                <small className="label-rating text-muted">132 reviews</small>
                                <small className="label-rating text-success"> <i className="fa fa-clipboard-check"></i> {soldCount} orders </small>
                            </div>

                            <div className="mb-3">
                                <var className="price h4">USD {price}</var>
                                {/* <span className="text-muted">USD 562.65 incl. VAT</span> */}
                            </div>

                            <p>{shortDescription}</p>


                            <dl className="row">
                                <dt className="col-sm-3">Manufacturer</dt>
                                <dd className="col-sm-9"><Link to="">{manufacturerName}</Link></dd>

                                <dt className="col-sm-3">Article number</dt>
                                <dd className="col-sm-9">596 065</dd>

                                <dt className="col-sm-3">Guarantee</dt>
                                <dd className="col-sm-9">2 year</dd>

                                <dt className="col-sm-3">Delivery time</dt>
                                <dd className="col-sm-9">3-4 days</dd>

                                <dt className="col-sm-3">Availabilty</dt>
                                <dd className="col-sm-9">{stockCount > 0 ? `Available: ${stockCount} item${stockCount > 1 ? 's' : ''}` : 'Out of stock'}</dd>
                            </dl>

                            <div className="form-row  mt-4">
                                <div className="form-group col-md flex-grow-0">
                                    <div className="input-group mb-3 input-spinner input-spinner-modified">
                                        <div className="input-group-prepend">
                                            <button onClick={e => onModifyAmount(1)} className="btn btn-light" type="button" id="button-plus"> + </button>
                                        </div>
                                        <input type="text" className="form-control" value={amount} readOnly />
                                        <div className="input-group-append">
                                            <button onClick={e => onModifyAmount(-1)} className="btn btn-light" type="button" id="button-minus"> − </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group col-md">
                                    <button className="btn  btn-primary">
                                        <i className="fas fa-shopping-cart"></i> <span className="text">Add to cart</span>
                                    </button>
                                    <button className="btn btn-light">
                                        <i className="fas fa-envelope"></i> <span className="text">Contact supplier</span>
                                    </button>
                                </div>
                            </div>

                        </article>
                    </main>
                </div>




            </div>
        </section>
    )
}

export default ProductDetailImage