import parse from 'html-react-parser'
const ProductDetailDescription = ({ product }) => {
    const { longDescription } = product
    return (
        <section className="section-name padding-y bg">
            <div className="container">

                <div className="row">
                    <div className="col-md-8">
                        <h5 className="title-description">Description</h5>
                        {parse(longDescription)}


                        <h5 className="title-description">Specifications</h5>
                        <table className="table table-bordered">
                            <tbody>
                                <tr><th colSpan="2">Basic specs</th></tr>
                                <tr><td>Type of energy</td><td>Lava stone</td></tr>
                                <tr><td>Number of zones</td><td>2</td></tr>
                                <tr>
                                    <td>Automatic connection</td>
                                    <td> <i className="fa fa-check text-success"></i> Yes </td>
                                </tr>

                                <tr><th colSpan="2">Dimensions</th></tr>
                                <tr><td>Width</td><td>500mm</td></tr>
                                <tr><td>Depth</td><td>400mm</td></tr>
                                <tr><td>Height	</td><td>700mm</td></tr>

                                <tr><th colSpan="2">Materials</th></tr>
                                <tr><td>Exterior</td><td>Stainless steel</td></tr>
                                <tr><td>Interior</td><td>Iron</td></tr>

                                <tr><th colSpan="2">Connections</th></tr>
                                <tr><td>Heating Type</td><td>Gas</td></tr>
                                <tr><td>Connected load gas</td><td>15 Kw</td></tr>

                            </tbody></table>
                    </div>

                    <aside className="col-md-4">

                        <div className="box">

                            <h5 className="title-description">Files</h5>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                                consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                                cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                                proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </p>

                            <h5 className="title-description">Videos</h5>


                            <article className="media mb-3">
                                <a href="#"><img className="img-sm mr-3" src="images/posts/3.jpg" /></a>
                                <div className="media-body">
                                    <h6 className="mt-0"><a href="#">How to use this item</a></h6>
                                    <p className="mb-2"> Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin </p>
                                </div>
                            </article>

                            <article className="media mb-3">
                                <a href="#"><img className="img-sm mr-3" src="images/posts/2.jpg" /></a>
                                <div className="media-body">
                                    <h6 className="mt-0"><a href="#">New tips and tricks</a></h6>
                                    <p className="mb-2"> Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin </p>
                                </div>
                            </article>

                            <article className="media mb-3">
                                <a href="#"><img className="img-sm mr-3" src="images/posts/1.jpg" /></a>
                                <div className="media-body">
                                    <h6 className="mt-0"><a href="#">New tips and tricks</a></h6>
                                    <p className="mb-2"> Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin </p>
                                </div>
                            </article>



                        </div>
                    </aside>
                </div>

            </div>
        </section>
    )
}

export default ProductDetailDescription