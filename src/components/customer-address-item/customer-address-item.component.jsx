import { useState } from 'react'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

const CustomerAddressItem = ({ address, onEditClicked, onMakeDefaultClick, onDeleteClicked }) => {
    const [showToolTip, setShowToolTip] = useState(false)



    return (
        <div className="col-md-6" key={address.id}>
            <article className="box mb-4">
                <h6>{address.ward}, {address.city}, {address.country}</h6>
                <p>{address.address}</p>
                {
                    address.default_address ?
                        <button className="btn btn-light disabled mr-2">
                            <i className="fa fa-check"></i> Default
                        </button> :
                        <button onClick={e => onMakeDefaultClick(address)} className="btn btn-light mr-2">Make default</button>
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
                    <button onClick={e => setShowToolTip(true)} className="btn btn-light mr-2">
                        <i className="text-danger fa fa-trash"></i>
                    </button>
                </OverlayTrigger>

            </article>
        </div>
    )
}

export default CustomerAddressItem