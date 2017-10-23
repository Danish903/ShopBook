import React, { Component } from "react";
import { connect } from "react-redux";
import { startGetBooks } from "../../actions/booksActions";
import { Carousel, Grid, Col, Row } from "react-bootstrap";
import BookItem from "./BookItem";
import Cart from "./Cart";

class BooksList extends Component {
  componentDidMount() {
    this.props.startGetBooks();
  }

  render() {
    const booksList = this.props.books.books.map(book => {
      return (
        <Col xs={12} sm={6} /*md={4}*/ key={book._id}>
          <BookItem key={book._id} {...book} />
        </Col>
      );
    });
    return (
      <Grid style={{ marginTop: "70px" }}>
        <Row>
          <Carousel>
            <Carousel.Item>
              <img
                width={1650}
                height={100}
                alt="900x100"
                src="/images/home2.png"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                width={1650}
                height={300}
                alt="900x100"
                src="/images/home3.jpg"
              />
            </Carousel.Item>
          </Carousel>
        </Row>
        <Row style={{marginTop : "70px"}}>
          <Cart />
        </Row>
        <Row>
          {booksList}
        </Row>
      </Grid>
    );
  }
}

const mapStateToProps = ({ books }) => ({ books });

export default connect(mapStateToProps, { startGetBooks })(BooksList);
