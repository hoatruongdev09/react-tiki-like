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
                    <div className='row '>
                        <button className='btn btn-primary' onClick={loadMoreProduct}>Load More</button>
                    </div>
            }
        </section >

    )
}
export default IndexRecommendedProduct