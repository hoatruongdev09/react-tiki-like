import { useEffect, useState } from 'react'

import { API_ENDPOINTS, BASE_URL, generateHeaders } from '../../utils/api-requesting/api-requesting.util'

import MainPageCarousel from './main-page-carousel.component'
import IndexRecommendedItems from '../index-recommended-products/index-recommended-product.component'

const IndexPage = () => {

    const [recommendedProducts, setRecommendedProducts] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [isLastPage, setIsLastPage] = useState(false)
    useEffect(() => {
        fetchRecommendProducts(currentPage)
    }, [currentPage])

    const loadMoreProduct = () => {
        setCurrentPage(currentPage + 1)
    }
    const fetchRecommendProducts = (pageIndex = 1) => {
        const url = `${BASE_URL}${API_ENDPOINTS.GET_PRODUCTS}?page=${pageIndex}`
        fetch(url, {
            method: 'GET',
            headers: generateHeaders('')
        }).then(res => {
            if (res.status == 200) {
                res.json().then(data => {
                    const { products, page, lastPage } = data
                    setRecommendedProducts([...recommendedProducts, ...products])
                    setIsLastPage(page >= lastPage)
                })
            } else {
                console.error(res)
            }
        }).catch(err => {
            console.error(err)
        })
    }

    return (
        <>
            <MainPageCarousel />
            <div className="container">
                <IndexRecommendedItems sectionName={'Recommended items'} products={recommendedProducts} loadMoreProduct={loadMoreProduct} isLastPage={isLastPage} />
            </div>
        </>
    )
}
export default IndexPage