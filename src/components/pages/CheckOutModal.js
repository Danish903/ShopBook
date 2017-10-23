import React from "react";
import {connect} from "react-redux";
import { Modal, Button, Col} from "react-bootstrap";

class CheckOutModal extends React.Component {
  render() {
    return (
      <div>
        <Modal show={this.props.showModal} onHide={this.props.onClose}>
          <Modal.Header closeButton>
            <Modal.Title>Order Confirmation</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h2>Thank You</h2>
            <h6>Your order has been saved</h6>
            <p>Your will recieve an email for confirmatoin</p>

          </Modal.Body>
          <Modal.Footer>
            <Col xs={6}>
              <h6>Total:  ${this.props.totalAmount} </h6>
            </Col>
            <Button onClick={() => this.props.onClose()}>Close</Button>
          </Modal.Footer>
        </Modal>

      </div>
    );
  }
}
const mapStateToProps = ({carts}) => {
  console.log(carts);
  return{
    totalAmount: carts.totalAmount
  };
};
export default connect(mapStateToProps)(CheckOutModal);
