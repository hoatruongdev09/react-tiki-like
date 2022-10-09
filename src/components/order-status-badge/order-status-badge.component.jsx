const OrderStatusBadge = ({ status }) => {
    console.log('badge status: ', status)
    switch (status) {
        case 0: return (<span className="badge badge-info" > Processing </span >)
        case 1: return (<span className="badge badge-warning" > Delivering </span >)
        case 3: return (<span className="badge badge-success" > Delivered </span >)
        case 3: return (<span className="badge badge-danger" > Cancelled </span >)
        default: return (<></>)
    }
}
export default OrderStatusBadge