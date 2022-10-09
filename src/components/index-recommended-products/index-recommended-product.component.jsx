import { Col, Container, Row } from 'react-bootstrap'
import IndexProductItem from '../index-product-item/index-product-item.component'
const IndexRecommendedProduct = ({ sectionName, products, loadMoreProduct, isLastPage }) => {
    return (

        <section className="padding-bottom" >
            <header className="section-heading mb-4">
                <h3 className="title-section">{sectionName}</h3>
            </header>
            <div className="row">
                {
                    products.map(product => <IndexProductItem key={product.id} product={product} />)
                }
            </div>
            {
                isLastPage ? <></> :
                    <div className='row justify-content-center'>
                        <div className='col-4 d-flex justify-content-center'>
                            <button className='btn btn-primary' onClick={loadMoreProduct}>Load More</button>
                        </div>
                    </div>
            }
        </section >

    )
}
export default IndexRecommendedProduct