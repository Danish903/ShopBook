import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Nav, NavItem, Navbar, Badge } from "react-bootstrap";
import { connect } from "react-redux";
import { getCart } from "../../actions/cartActions";
import { LinkContainer } from "react-router-bootstrap";
class Header extends Component {
  componentDidMount() {
    this.props.getCart();
  }
  render() {
    let { carts } = this.props;
    return (
      <Navbar inverse fixedTop>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">React-Bootstrap</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem eventKey={1} href="#">
              About
            </NavItem>
            <NavItem eventKey={2} href="#">
              Contact
            </NavItem>
          </Nav>
          <Nav pullRight>
            <LinkContainer to="/admin">
              <NavItem eventKey={1}>Admin</NavItem>
            </LinkContainer>
            <LinkContainer to="/cart">
              <NavItem eventKey={2}>
                Your Cart
                <span>
                  <Badge className="badge">{carts.totalQuantity}</Badge>
                </span>
              </NavItem>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
const mapStateToProps = ({ carts }) => ({
  carts
});
export default connect(mapStateToProps, { getCart })(Header);
