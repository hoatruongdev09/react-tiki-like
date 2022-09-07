import { Link } from "react-router-dom"
import { ReactComponent as StarsActive } from '../../assets/images/stars-active.svg'
import { ReactComponent as StarsDisable } from '../../assets/images/stars-disable.svg'

const IndexProductItem = ({ product }) => {
    const { id, name, price, categoryName, displayImageUrl, soldCount } = product
    return (
        <div className="col-xl-3 col-lg-3 col-md-4 col-6">
            <div className="card card-product-grid">
                <Link to={`product-detail/${id}`} className="img-wrap">
                    <img src={displayImageUrl} />
                </Link>
                <figcaption className="info-wrap">

                    <ul className="rating-stars mb-1">
                        <li style={{ width: "70%" }} className="stars-active">
                            <StarsActive />
                        </li>
                        <li>
                            <StarsDisable />
                        </li>
                    </ul>
                    <p className="text-muted float-right">Sold: {soldCount}</p>

                    <div>
                        <Link to="" className="text-muted">{categoryName}</Link>
                        <Link to={`product-detail/${id}`} className="title">{name}</Link>
                    </div>
                    <div className="price h5 mt-2">${price}</div>
                </figcaption>
            </div>
        </div>
    )
}

export default IndexProductItem