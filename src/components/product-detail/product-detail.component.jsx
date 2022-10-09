import { Link, useParams } from 'react-router-dom'
import { useEffect, useState, Fragment } from 'react'

import ProductDetailImage from "./product-detail-image.component"
import { BASE_URL, API_ENDPOINTS, generateHeaders } from '../../utils/api-requesting/api-requesting.util'
import ProductDetailDescription from './product-detail-description.component'

import './product-detail.styles.scss'

const ProductDetail = () => {
    const { id } = useParams()
    const [productData, setProductData] = useState(null)
    const [productImages, setProductImages] = useState([])
    const [categoryTree, setCategoryTree] = useState([])



    useEffect(() => {
        if (productData) {
            fetchCategoryTree(productData.categoryId)
        }
    }, [productData])

    useEffect(() => {
        fetchProductDetail(id)
    }, [id])

    const fetchProductDetail = (id) => {
        const url = `${BASE_URL}${API_ENDPOINTS.GET_PRODUCT_DETAIL}${id}`
        fetch(url, {
            method: 'GET',
            headers: generateHeaders('')
        }).then(res => {
            if (res.status == 200) {
                res.json().then(data => {
                    const { product, images } = data
                    setProductData(product)
                    setProductImages(images)
                })
            } else {
                console.log('hey')
            }
        }).catch(err => {
            console.error(err)
        })
    }
    const fetchCategoryTree = (id) => {
        const url = `${BASE_URL}${API_ENDPOINTS.GET_CATEGORY_TREE}${id}`
        fetch(url, {
            method: 'GET',
            headers: generateHeaders('')
        }).then(res => {
            if (res.status == 200) {
                res.json().then(data => {
                    setCategoryTree(data)
                })
            } else {
                setCategoryTree([])
            }
        }).catch(err => {
            console.error(err)
        })
    }

    return (
        productData == null ? <></> :
            <>

                <section className="py-3 bg-light">
                    <div className="container">
                        <ol className="breadcrumb breadcrumb-modified">
                            <li className="breadcrumb-item "><Link className='breadcrumb-modified-item' to="/">Home</Link></li>
                            {
                                categoryTree.map((cat, index) => (
                                    index == categoryTree.length - 1 ?
                                        <Fragment key={cat.id}>
                                            <li className="breadcrumb-item "><Link className='breadcrumb-modified-item' to="">{cat.name}</Link></li>
                                            <li className="breadcrumb-item  active" aria-current="page">{productData.name}</li>
                                        </Fragment> :
                                        <li key={cat.id} className="breadcrumb-item "><Link className='breadcrumb-modified-item' to="">{cat.name}</Link></li>
                                ))
                            }
                            {/* <li className="breadcrumb-item "><Link className='breadcrumb-modified-item' to="">Category name</Link></li> */}
                            {/* <li className="breadcrumb-item "><Link className='breadcrumb-modified-item' to="">Sub category</Link></li> */}
                            {/* <li className="breadcrumb-item  active" aria-current="page">Items</li> */}
                        </ol>
                    </div>
                </section>
                <ProductDetailImage product={productData} images={productImages} />
                <ProductDetailDescription product={productData} />
            </>
    )
}
export default ProductDetail