import { useState } from 'react'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import Badge from 'react-bootstrap/Badge';
const CustomerAddressItem = ({ address, onEditClicked, onMakeDefaultClick, onDeleteClicked }) => {
    const [showToolTip, setShowToolTip] = useState(false)

    return (
        <div className={`col-md-6`} key={address.id}>
            <article className={`box mb-4 ${address.defaultAddress ? 'bg-light' : ''}`}>
                <Badge bg="info" text="dark" style={{ float: 'right' }}>
                    {address.address_type ? 'Home' : 'Work'}
                </Badge>
                <h6>Name: {address.firstName} {address.lastName}
                </h6>
                <h6>Phone: {address.phone}</h6>
                <p>{address.city} {address.country} <br /> {address.address}</p>
                {
                    address.defaultAddress ?
                        <button className="btn btn-primary disabled mr-2">
                            <i className="fa fa-check text-light"></i> Default
                        </button> :
                        <button onClick={e => onMakeDefaultClick(address)} className="btn btn-light mr-2">Set default</button>
                }

                <button onClick={e => onEditClicked(address)} className="btn btn-light mr-2">
                    <i className="fa fa-pen"></i>
                </button>
                <OverlayTrigger
                    show={showToolTip}
                    trigger="click"
                    placement='top'
                    overlay={
                        <Popover id={`popover-positioned-top`}>
                            <Popover.Header className='bg-danger text-light' as="h3">{`Confirm delete`}</Popover.Header>
                            <Popover.Body>
                                <button onClick={() => setShowToolTip(false)} className="btn btn-light mr-2">
                                    Cancel
                                </button>
                                <button onClick={e => onDeleteClicked(address)} className="btn btn-danger mr-2">
                                    Delete
                                </button>
                            </Popover.Body>
                        </Popover>
                    }
                >
                    {
                        address.defaultAddress ? <></> :
                            <button onClick={e => setShowToolTip(true)} className="btn btn-light" style={{ float: 'right' }}>
                                <i className="text-danger fa fa-trash"></i>
                            </button>
                    }

                </OverlayTrigger>

            </article>
        </div>
    )
}

export default CustomerAddressItem