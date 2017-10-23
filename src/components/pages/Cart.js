import React from "react";
import { connect } from "react-redux";
import { getCart, deleteCart, updateCart } from "../../actions/cartActions";
import CheckOutModal from "./CheckOutModal";
import { Panel, Col, Row, Button, ButtonGroup, Label } from "react-bootstrap";

class Cart extends React.Component {
  state = { showModal: false };

  componentDidMount() {
    this.props.getCart();
  }
  open = () => {
    this.setState(() => {
      return { showModal: true };
    });
  };
  close = () => {
    this.setState(() => {
      return { showModal: false };
    });
  };
  deleteCartItem = (_id, cart) => {
    this.props.deleteCart(_id, cart);
  };
  renderCart() {
    const cartItemList = this.props.cart.map(cart => {
      return (
        <Panel key={cart._id}>
          <Row>
            <Col xs={12} sm={4}>
              <h6>{cart.title}</h6>
              <span> </span>
            </Col>
            <Col xs={12} sm={2}>
              <h6>usd. {cart.price}</h6>
            </Col>
            <Col xs={12} sm={2}>
              <h6>
                qty. <Label bsStyle="success">{cart.qty}</Label>
              </h6>
            </Col>
            <Col xs={12} sm={4}>
              <ButtonGroup style={{ minWidth: "300px" }}>
                <Button
                  onClick={() => this.decrement(cart._id, cart.qty)}
                  bsStyle="default"
                  bsSize="small"
                >
                  -
                </Button>
                <Button
                  onClick={() =>
                    this.props.updateCart(cart._id, 1, this.props.cart)}
                  bsStyle="default"
                  bsSize="small"
                >
                  +
                </Button>
                <span> </span>
                <Button
                  onClick={() => this.deleteCartItem(cart._id, this.props.cart)}
                  bsStyle="danger"
                  bsSize="small"
                >
                  Delete
                </Button>
              </ButtonGroup>
              {cart.qty === 0
                ? this.deleteCartItem(cart._id, this.props.cart)
                : ""}
            </Col>
          </Row>
        </Panel>
      );
    });
    return (
      <div>
        <Panel header="CART" bsStyle="primary">
          {cartItemList}
          <Row>
            <Col xs={12}>
              <h6>Total amount: {this.props.totalAmount} </h6>
              <Button onClick={this.open} bsStyle="success" bsSize="small">
                Procceed To CheckPoint
              </Button>
            </Col>
          </Row>
          <CheckOutModal
            showModal={this.state.showModal}
            onClose={this.close}
          />
        </Panel>
      </div>
    );
  }
  decrement = (_id, currentQuantity) => {
    if (currentQuantity > 0) {
      this.props.updateCart(_id, -1, this.props.cart);
    }
  };
  render() {
    if (this.props.cart.length > 0) {
      return this.renderCart();
    }
    return <div />;
  }
}
const mapStateToProps = ({ carts }) => ({
  cart: carts.cart,
  totalAmount: carts.totalAmount
});

export default connect(mapStateToProps, { getCart, deleteCart, updateCart })(
  Cart
);
