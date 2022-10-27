import { useState, useEffect } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'

import { API_ENDPOINTS, BASE_URL, generateHeaders } from '../../utils/api-requesting/api-requesting.util'
import './filter-style.scss'

const Filter = ({ useCategory = false }) => {
    const [searchParams, setSearchParams] = useSearchParams()
    const { category } = useParams()

    const [lastPage, setLastPage] = useState(1)
    const [currentPage, setCurrentPage] = useState(1)
    const [products, setProducts] = useState([])
    const [categoryTree, setCategoryTree] = useState([])
    const [stores, setStores] = useState([])
    const [brands, setBrands] = useState([])
    const [categories, setCategories] = useState([])

    const [searchValue, setSearchVale] = useState(searchParams.get('search'))

    const [selectedStore, setSelectedStore] = useState([])
    const [selectedBrand, setSelectedBrand] = useState([])
    const [selectedCategories, setSelectedCategories] = useState([])
    const [selectedStars, setSelectedStars] = useState([false, false, false, false, false])

    const [priceRange, setPriceRange] = useState({ min: 1, max: 1000, useMin: false, useMax: false })
    const [appliedPriceRange, setAppliedPriceRange] = useState({ min: 1, max: 1000, useMin: false, useMax: false })


    useEffect(() => {
        fetchStores()
        fetchBrands()
        if (!useCategory) {
            fetchCategory()
        }
    }, [])

    useEffect(() => {
        // fetchProduct(searchValue, useCategory ? category : null, currentPage)
        fetchProducts()
    }, [currentPage, categoryTree, selectedStore, selectedBrand, selectedCategories, appliedPriceRange, selectedBrand, selectedStars])

    useEffect(() => {
        if (useCategory) {
            fetchCategoryTree(category)
        }
    }, [searchParams, category])

    useEffect(() => {
        setSelectedStore(getSelectedStores())
        setSelectedBrand(getSelectedBrands())
        setSelectedCategories(getSelectedCategories())
    }, [stores, brands, categories])
    const fetchProducts = () => {
        const searchCategories = useCategory ? (categoryTree.length == 0 ? null : [categoryTree[categoryTree.length - 1].id]) : selectedCategories
        const { min, max, useMin, useMax } = appliedPriceRange
        const rateSelected = selectedStars.map((star, index) => star ? index + 1 : null).filter((star) => star != null)
        filterProducts(searchValue, min, max, useMin, useMax, searchCategories, selectedStore.length == 0 ? null : selectedStore, null, null, selectedBrand.length == 0 ? null : selectedBrand, rateSelected, currentPage)
    }
    const getSelectedStores = () => {
        return stores.filter((store) => store.selected).map(store => store.id)
    }
    const getSelectedBrands = () => {
        return brands.filter((brand) => brand.selected).map(brand => brand.id)
    }
    const getSelectedCategories = () => {
        return categories.filter(category => category.selected).map(category => category.id)
    }

    const fetchCategory = () => {
        const url = `${BASE_URL}${API_ENDPOINTS.GET_ALL_CATEGORIES}`
        fetch(url, {
            method: 'GET',
            headers: generateHeaders()
        }).then(res => {
            if (res.status == 200) {
                res.json().then(datas => {
                    const newCategories = datas.map(data => {
                        return {
                            ...data,
                            selected: useCategory && data.id == category
                        }
                    })
                    setCategories(newCategories)
                })
            }
        }).catch(err => {

        })
    }
    const fetchBrands = () => {
        const url = `${BASE_URL}${API_ENDPOINTS.GET_ALL_BRANDS}`
        fetch(url,
            {
                method: 'GET',
                headers: generateHeaders()
            }).then(res => {
                if (res.status == 200) {
                    res.json().then(datas => {
                        console.log(`brand data: `, datas)
                        const newBrands = datas.map(data => {
                            return {
                                ...data,
                                selected: false
                            }
                        })
                        setBrands(newBrands)
                    })
                }
            }).catch(err => {

            })
    }
    const fetchStores = () => {
        const url = `${BASE_URL}${API_ENDPOINTS.GET_ALL_STORES}`
        fetch(url,
            {
                method: 'GET',
                headers: generateHeaders()
            }).then(res => {
                if (res.status == 200) {
                    res.json().then(datas => {
                        console.log(`store data: `, datas)
                        const newStore = datas.map((data) => {
                            return {
                                ...data,
                                selected: false
                            }
                        })
                        setStores(newStore)
                    })
                }
            }).catch(err => {

            })
    }
    const fetchCategoryTree = (category) => {
        const url = `${BASE_URL}${API_ENDPOINTS.GET_CATEGORY_TREE}${category}`
        fetch(url, {
            method: 'GET',
            headers: generateHeaders()
        }).then(res => {
            if (res.status == 200) {
                res.json().then(data => {
                    setCategoryTree(data)
                })
            }
        }).catch(err => {
            console.error(err)
        })
    }
    const filterProducts = (searchValue = '', minPrice = -1, maxPrice = -1, useMinPrice = false, useMaxPrice = false, categories = null, stores = null, manufacturers = null, sellers = null, brands = null, stars = null, page = 1) => {
        const params = { searchValue, page }
        const url = new URL(`${BASE_URL}${API_ENDPOINTS.FILTER_PRODUCTS}`)
        Object.keys(params).forEach(key => {
            if (params[key]) {
                url.searchParams.append(key, params[key])
            }
        })
        if (useMinPrice) {
            console.log('useMin')
            url.searchParams.append(`minPrice`, minPrice)
        }
        if (useMaxPrice) {
            console.log('useMax')
            url.searchParams.append(`maxPrice`, maxPrice)
        }
        const body = { categories, stores, manufacturers, sellers, brands, stars }
        fetch(url, {
            method: 'POST',
            headers: generateHeaders(),
            body: JSON.stringify(body)
        }).then(res => {
            if (res.status == 200) {
                res.json().then(data => {
                    console.log("products data: ", data)
                    const { products, page, lastPage } = data
                    setProducts(products)
                    setLastPage(lastPage)
                }).catch(err => {

                })
            } else {

            }
        }).catch(err => {

        })
    }
    const fetchProduct = (searchValue, category = null, page = 1) => {
        const params = {
            product: searchValue,
            category: category,
            page: page
        }
        const url = new URL(`${BASE_URL}${API_ENDPOINTS.GET_PRODUCTS}`)
        Object.keys(params).forEach(key => {
            if (params[key]) {
                url.searchParams.append(key, params[key])
            }
        })
        console.log(`fetch: ${url}`)
        fetch(url, {
            method: 'GET',
            headers: generateHeaders(),
        }).then(res => {
            if (res.status == 200) {
                res.json().then(data => {
                    console.log("products data: ", data)
                    const { products, page, lastPage } = data
                    setProducts(products)
                    setLastPage(lastPage)
                }).catch(err => {

                })
            } else {

            }
        }).catch(err => {

        })
    }
    const changePageLink = (e, pageIndex) => {
        if (pageIndex == 0 || pageIndex > lastPage) { return }
        setCurrentPage(pageIndex)
        e.preventDefault()
    }
    const CreatePagination = ({ currentPage = 1, lastPage = 1 }) => {
        const rows = []
        rows.push(
            <li key={`pagination-filter-previous`} className={`page-item ${currentPage == 1 ? "disabled" : ""}`}><Link className="page-link" onClick={(e) => changePageLink(e, currentPage - 1)} to="">Previous</Link></li>
        )

        for (let index = 0; index < lastPage; index++) {
            rows.push(
                index + 1 == currentPage ? <li key={`pagination-filter-${index}`} className="page-item active"><Link className="page-link" to="">{index + 1}</Link></li>
                    : <li key={`pagination-filter-${index}`} className="page-item"><Link className="page-link" onClick={(e) => changePageLink(e, index + 1)} to="">{index + 1}</Link></li>
            )
        }
        rows.push(
            <li key={`pagination-filter-next`} className={`page-item ${currentPage == lastPage ? "disabled" : ""}`}><Link className="page-link" onClick={(e) => changePageLink(e, currentPage + 1)} to="">Next</Link></li>
        )
        return rows
    }
    const onPriceApplyClicked = (e) => {

        setAppliedPriceRange(priceRange)
    }
    const onChangeBrands = (brand) => {
        setBrands(brands.map(br => br == brand ? { ...brand, selected: !brand.selected } : br))
    }
    const onChangeStore = (store) => {
        setStores(stores.map(st => st == store ? { ...store, selected: !store.selected } : st))
    }
    const onChangeCategories = (category) => {
        setCategories(categories.map(cat => cat == category ? { ...category, selected: !category.selected } : cat))
    }
    const onChangePrice = (e) => {
        setPriceRange({
            ...priceRange,
            [e.target.name]: e.target.value
        })
    }
    const onChangeUseMin = (value) => {

        if (!value) {
            setPriceRange({
                ...priceRange,
                min: '',
                useMin: value
            })
        } else {
            setPriceRange({
                ...priceRange,
                useMin: value
            })
        }
    }
    const onChangeUseMax = (value) => {

        if (!value) {
            setPriceRange({
                ...priceRange,
                max: '',
                useMax: value
            })
        } else {
            setPriceRange({
                ...priceRange,
                useMax: value
            })
        }
    }
    const ProductStars = ({ rate }) => {
        console.log(`show rate ${rate}`)
        const stars = []
        for (let i = 1; i <= rate; i++) {
            stars.push(<i key={`product-start-${i}`} className="fa fa-star"></i>)
        }
        return stars
    }

    const onChangeStar = (index, value) => {
        setSelectedStars(selectedStars.map((star, idx) => idx == index ? value : star))
    }

    return (
        <section className="section-content padding-y">
            <div className="container">

                <div className="card mb-3">
                    <div className="card-body">
                        <ol className="breadcrumb float-left breadcrumb-modified" >
                            <li className="breadcrumb-item"><Link className='breadcrumb-link' to="/">Home</Link></li>
                            {
                                useCategory ? categoryTree.map((cat, index) => (
                                    index < categoryTree.length - 1 ? <li key={`brcrumb-cat-${cat.id}`} className="breadcrumb-item"><Link className='breadcrumb-link' to={`/${cat.name}`} replace={true}>{cat.name}</Link></li>
                                        : <li key={`brcrumb-cat-${cat.id}`} className="breadcrumb-item active">{cat.name}</li>
                                )) : <li className="breadcrumb-item active">{searchValue}</li>
                            }
                        </ol>
                    </div>
                </div>

                <div className="row">
                    <aside className="col-md-2">

                        {/* <article className="filter-group">
                            <h6 className="title">
                                <Link to="" className="dropdown-toggle breadcrumb-link" data-toggle="collapse" data-target="#collapse_1">
                                    Product type </Link>
                            </h6>
                            <div className="filter-content collapse show" id="collapse_1">
                                <div className="inner">
                                    <ul className="list-menu">
                                        <li><Link to="">Shorts </Link></li>
                                        <li><Link to="">Trousers </Link></li>
                                        <li><Link to="">Sweaters </Link></li>
                                        <li><Link to="">Clothes </Link></li>
                                        <li><Link to="">Home items </Link></li>
                                        <li><Link to="">Jackats</Link></li>
                                        <li><Link to="">Somethings </Link></li>
                                    </ul>
                                </div>
                            </div>
                        </article> */}
                        {
                            useCategory ? <></> :
                                <article className="filter-group">
                                    <h6 className="title">
                                        <Link to="" className="dropdown-toggle breadcrumb-link" data-toggle="collapse" data-target="#collapse_2"> Categories
                                        </Link>
                                    </h6>
                                    <div className="filter-content collapse show" id="collapse_2">
                                        <div className="inner">
                                            {
                                                categories.map(category => (
                                                    <label key={`brand-selection-${category.id}`} className="custom-control custom-checkbox">
                                                        <input type="checkbox" checked={category.selected} className="custom-control-input" onChange={(e) => onChangeCategories(category)} />
                                                        <div className="custom-control-label">{category.name}
                                                            {/* <b className="badge badge-pill badge-light float-right">120</b> */}
                                                        </div>
                                                    </label>
                                                ))
                                            }
                                        </div>
                                    </div>
                                </article>
                        }
                        <article className="filter-group">
                            <h6 className="title">
                                <Link to="" className="dropdown-toggle breadcrumb-link" data-toggle="collapse" data-target="#collapse_2"> Brands
                                </Link>
                            </h6>
                            <div className="filter-content collapse show" id="collapse_2">
                                <div className="inner">
                                    {
                                        brands.map(brand => (
                                            <label key={`brand-selection-${brand.id}`} className="custom-control custom-checkbox">
                                                <input type="checkbox" checked={brand.selected} className="custom-control-input" onChange={(e) => onChangeBrands(brand)} />
                                                <div className="custom-control-label">{brand.name}
                                                    {/* <b className="badge badge-pill badge-light float-right">120</b> */}
                                                </div>
                                            </label>
                                        ))
                                    }
                                </div>
                            </div>
                        </article>
                        <article className="filter-group">
                            <h6 className="title">
                                <Link to="" className="dropdown-toggle breadcrumb-link" data-toggle="collapse" data-target="#collapse_provider">
                                    Stores
                                </Link>
                            </h6>
                            <div className="filter-content collapse show" id="collapse_provider">
                                <div className="inner">
                                    {
                                        stores.map(store => (

                                            <label key={`store-selection-${store.id}`} className="custom-control custom-checkbox">
                                                <input type="checkbox" checked={store.selected} onChange={e => onChangeStore(store)} className="custom-control-input" />
                                                <div className="custom-control-label">{store.name}
                                                    {/* <b className="badge badge-pill badge-light float-right">120</b> */}
                                                </div>
                                            </label>
                                        ))
                                    }

                                </div>
                            </div>
                        </article>
                        <article className="filter-group">
                            <h6 className="title">
                                <Link to="" className="dropdown-toggle breadcrumb-link" data-toggle="collapse" data-target="#collapse_price"> Price
                                    range </Link>
                            </h6>
                            <div className="filter-content collapse show" id="collapse_price">
                                <div className="inner">
                                    {/* <input type="range" className="custom-range" min="0" max="100" name="" /> */}
                                    <div className="form-row">

                                        <div className="form-group col-md-6">
                                            <div class="form-check">
                                                <input class="form-check-input" name='useMin' type="checkbox" value={priceRange.useMin} onChange={e => onChangeUseMin(!priceRange.useMin)} id="min-checkbox" />
                                                <label class="form-check-label" for="min-checkbox">
                                                    Min
                                                </label>
                                            </div>
                                            <input className="form-control" name='min' value={priceRange.min} onChange={e => onChangePrice(e)} placeholder="$0" type="number" disabled={!priceRange.useMin} />
                                        </div>
                                        <div className="form-group col-md-6">
                                            <div class="form-check">
                                                <input class="form-check-input" name='useMax' type="checkbox" value={priceRange.useMax} onChange={e => onChangeUseMax(!priceRange.useMax)} id="max-checkbox" />
                                                <label class="form-check-label" for="max-checkbox">
                                                    Max
                                                </label>
                                            </div>

                                            <input className="form-control" name='max' value={priceRange.max} onChange={e => onChangePrice(e)} placeholder="$1,0000" type="number" disabled={!priceRange.useMax} />
                                        </div>
                                    </div>
                                    <button onClick={(e) => onPriceApplyClicked(e)} className="btn btn-block btn-primary">Apply</button>
                                </div>
                            </div>
                        </article>
                        <article className="filter-group">
                            <h6 className="title">
                                <Link to="" className="dropdown-toggle breadcrumb-link" data-toggle="collapse" data-target="#collapse_4"> Rates
                                </Link>
                            </h6>
                            <div className="filter-content collapse show" id="collapse_4">
                                <div className="inner">
                                    {
                                        selectedStars.map((star, index) => (
                                            <label className="checkbox-btn mr-1">
                                                <input value={selectedStars[index]} onChange={(e) => onChangeStar(index, !star)} type="checkbox" />
                                                <span className="btn btn-light"> {index + 1} {(index + 1) > 1 ? `Stars` : `Star`} </span>
                                            </label>
                                        ))
                                    }
                                </div>
                            </div>
                        </article>
                        {/* <article className="filter-group">
                            <h6 className="title">
                                <Link to="" className="dropdown-toggle breadcrumb-link" data-toggle="collapse" data-target="#collapse_5">
                                    Condition </Link>
                            </h6>
                            <div className="filter-content collapse show" id="collapse_5">
                                <div className="inner">
                                    <label className="custom-control custom-radio">
                                        <input type="radio" name="myfilter_radio" checked="" className="custom-control-input" />
                                        <div className="custom-control-label">Any condition</div>
                                    </label>

                                    <label className="custom-control custom-radio">
                                        <input type="radio" name="myfilter_radio" className="custom-control-input" />
                                        <div className="custom-control-label">Brand new </div>
                                    </label>

                                    <label className="custom-control custom-radio">
                                        <input type="radio" name="myfilter_radio" className="custom-control-input" />
                                        <div className="custom-control-label">Used items</div>
                                    </label>

                                    <label className="custom-control custom-radio">
                                        <input type="radio" name="myfilter_radio" className="custom-control-input" />
                                        <div className="custom-control-label">Very old</div>
                                    </label>
                                </div>
                            </div>
                        </article> */}

                    </aside>
                    <main className="col-md-10">


                        {/* <header className="mb-3">
                            <div className="form-inline">
                                <strong className="mr-md-auto">32 Items found </strong>
                                <select className="mr-2 form-control">
                                    <option>Latest items</option>
                                    <option>Trending</option>
                                    <option>Most Popular</option>
                                    <option>Cheapest</option>
                                </select>
                                <div className="btn-group">
                                    <a href="page-listing-grid.html" className="btn btn-light" data-toggle="tooltip"
                                        title="List view">
                                        <i className="fa fa-bars"></i></a>
                                    <a href="page-listing-large.html" className="btn btn-light active" data-toggle="tooltip"
                                        title="Grid view">
                                        <i className="fa fa-th"></i></a>
                                </div>
                            </div>
                        </header> */}

                        {
                            products.map(product => (
                                <article key={`product-list-${product.id}`} className="card card-product-list">
                                    <div className="row no-gutters">
                                        <aside className="col-md-3">
                                            <Link to={`/product-detail/${product.id}`} className="img-wrap" >
                                                <span className="badge badge-danger"> NEW </span>
                                                <img src={product.displayImageUrl} />
                                            </Link>
                                        </aside>
                                        <div className="col-md-6">
                                            <div className="info-main">
                                                <Link to={`/product-detail/${product.id}`} className="h5 title" >{product.name}</Link>
                                                <div className="rating-wrap mb-2">
                                                    <ul className="rating-stars">
                                                        <li style={{ width: "100%" }} className="stars-active">
                                                            <ProductStars rate={product.rate} />
                                                        </li>
                                                        <li>
                                                            <i className="fa fa-star"></i>
                                                            <i className="fa fa-star"></i>
                                                            <i className="fa fa-star"></i>
                                                            <i className="fa fa-star"></i>
                                                            <i className="fa fa-star"></i>
                                                        </li>
                                                    </ul>
                                                    <div className="label-rating">{product.rate == 0 ? 'No review yet' : product.rate}</div>
                                                </div>

                                                <p className="mb-3">
                                                    <span className="tag"> <i className="fa fa-check"></i> Verified</span>
                                                    <span className="tag"> 5 Years </span>
                                                    <span className="tag"> 80 reviews </span>
                                                    <span className="tag"> Russia </span>
                                                </p>

                                                <p>{product.shortDescription} </p>

                                            </div>
                                        </div>
                                        <aside className="col-sm-3">
                                            <div className="info-aside">
                                                <div className="price-wrap">
                                                    <span className="h5 price">${product.price}</span>
                                                    <small className="text-muted">/per item</small>
                                                </div>
                                                <small className="text-warning">Paid shipping</small>

                                                <p className="text-muted mt-3">Grand textile Co</p>
                                                <p className="mt-3">
                                                    <a href="#" className="btn btn-outline-primary"> <i className="fa fa-envelope"></i>
                                                        Contact supplier </a>
                                                    <a href="#" className="btn btn-light"><i className="fa fa-heart"></i> Save </a>
                                                </p>

                                                <label className="custom-control mt-3 custom-checkbox">
                                                    <input type="checkbox" className="custom-control-input" />
                                                    <div className="custom-control-label">Add to compare
                                                    </div>
                                                </label>

                                            </div>
                                        </aside>
                                    </div>
                                </article>
                            ))
                        }



                        <nav className="mb-4" aria-label="Page navigation sample">
                            <ul className="pagination">
                                <CreatePagination currentPage={currentPage} lastPage={lastPage} />
                            </ul>
                        </nav>


                        <div className="box text-center">
                            <p>Did you find what you were looking for？</p>
                            <a href="" className="btn btn-light">Yes</a>
                            <a href="" className="btn btn-light">No</a>
                        </div>


                    </main>

                </div>

            </div>
        </section>
    )
}

export default Filter