import { ReactComponent } from '../../assets/images/logo.svg'
import { Link } from 'react-router-dom'

const SearchBar = () => {
    return (
        <section className="header-main border-bottom">
            <div className="row row-sm">
                <div className="col-6 col-sm col-md col-lg  flex-grow-0">
                    <Link to="/" className="brand-wrap">
                        <ReactComponent className='logo' />
                    </Link>
                </div>
                <div className="col-6 col-sm col-md col-lg flex-md-grow-0">

                    <div className="d-md-none float-right">
                        <Link to="#" className="btn btn-light"> <i className="fa fa-bell"></i> </Link>
                        <Link to="#" className="btn btn-light"> <i className="fa fa-user"></i> </Link>
                        <Link to="#" className="btn btn-light"> <i className="fa fa-shopping-cart"></i> 2 </Link>
                    </div>


                    <div className="category-wrap d-none dropdown d-md-inline-block">
                        <button type="button" className="btn btn-light dropdown-toggle" data-toggle="dropdown"> Shop by
                        </button>
                        <div className="dropdown-menu">
                            <Link className="dropdown-item" to="#">Machinery / Mechanical Parts / Tools </Link>
                            <Link className="dropdown-item" to="#">Consumer Electronics / Home Appliances </Link>
                            <Link className="dropdown-item" to="#">Auto / Transportation</Link>
                            <Link className="dropdown-item" to="#">Apparel / Textiles / Timepieces </Link>
                            <Link className="dropdown-item" to="#">Home & Garden / Construction / Lights </Link>
                            <Link className="dropdown-item" to="#">Beauty & Personal Care / Health </Link>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6 col-xl col-md-5 col-sm-12 flex-grow-1">
                    <form action="#" className="search-header">
                        <div className="input-group">
                            <input type="text" className="form-control" placeholder="Search" />
                            <select className="custom-select border-left" name="category_name">
                                <option value="">All type</option>
                                <option value="codex">Special</option>
                                <option value="comments">Only best</option>
                                <option value="content">Latest</option>
                            </select>
                        </div>
                    </form>
                </div>
                <div className="col col-lg col-md flex-grow-0">
                    <button className="btn btn-block btn-primary" type="submit"> Search </button>
                </div>
                <div className="col col-lg col-md flex-grow-0">
                    <button className="btn btn-block btn-light" type="submit"> Advanced </button>
                </div>
            </div>
        </section>
    )
}

export default SearchBar