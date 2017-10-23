import React from "react";
import { Col, Well, Row, Button, Image } from "react-bootstrap";
import { connect } from "react-redux";
import { getCart, startAddToCart, updateCart } from "../../actions/cartActions";

class BookItem extends React.Component {
  state = {
    readMore: false
  };
  componentDidMount() {
    this.props.getCart();
  }
  onReadMore = () => {
    this.setState(() => ({ readMore: true }));
  };
  handleCart = () => {
    const book = [
      ...this.props.cart,
      {
        _id: this.props._id,
        title: this.props.title,
        description: this.props.description,
        image: this.props.image,
        price: this.props.price,
        qty: 1
      }
    ];

    if (this.props.cart.length >= 0) {
      const index = this.props.cart.findIndex(
        cart => cart._id === this.props._id
      );
      if (index !== -1) {
        this.props.updateCart(this.props.cart[index]._id, 1, this.props.cart);
      } else {
        this.props.startAddToCart(book);
      }
    }
  };
  render() {
    return (
      <Well>
        <Row>
          <Col xs={12} sm={4}>
            <Image src={this.props.image} responsive />
          </Col>
          <Col xs={12} sm={8}>
            <h6>{this.props.title}</h6>
            <p>
              {!!this.state.readMore
                ? this.props.description
                : this.props.description.substring(0, 50)}
              <button className="link" onClick={this.onReadMore}>
                {!this.state.readMore && <span>...read more</span>}
              </button>
            </p>
            <p>usd. {this.props.price}</p>
            <Button onClick={this.handleCart} bsStyle="primary">
              Add to Cart
            </Button>
          </Col>
        </Row>
      </Well>
    );
  }
}
const mapStateToProps = ({ carts }) => {
  return {
    cart: carts.cart
  };
};
export default connect(mapStateToProps, {
  getCart,
  startAddToCart,
  updateCart
})(BookItem);
