import React from "react";
import { connect } from "react-redux";
import {
  InputGroup,
  Image,
  Col,
  Row,
  Well,
  Panel,
  FormControl,
  FormGroup,
  ControlLabel,
  Button,
  DropdownButton,
  MenuItem
} from "react-bootstrap";
import { findDOMNode } from "react-dom";
import {
  StartPostBooks,
  startDeleteBooks,
  startGetBooks,
  resetForm
} from "../../actions/booksActions";
import axios from "axios";

class BooksForm extends React.Component {
  state = { images: [{}], img: "" };
  componentDidMount() {
    this.props.startGetBooks();
    axios
      .get("/api/images")
      .then(res => {
        const images = res.data;
        this.setState(() => ({ images }));
      })
      .catch(error => {
        console.log("image api error");
      });
  }
  saveBook = e => {
    e.preventDefault();

    const book = {
      title: findDOMNode(this.refs.title).value,
      description: findDOMNode(this.refs.description).value,
      image: findDOMNode(this.refs.image).value,
      price: findDOMNode(this.refs.price).value
    };

    this.props.StartPostBooks(book);
  };

  handleDeleteBooks = () => {
    const bookId = findDOMNode(this.refs.delete).value;
    console.log(bookId);
    this.props.startDeleteBooks(bookId);
  };

  handleSelect = img => {
    this.setState(() => ({ img: "/images/" + img }));
  };

  resetForm = () => {
    this.props.resetForm();
    findDOMNode(this.refs.title).value = "";
    findDOMNode(this.refs.description).value = "";
    findDOMNode(this.refs.price).value = "";
    this.setState({ img: "" });
  };
  render() {
    const booksList = this.props.books.map(book => (
      <option value={book._id} key={book._id}>
        {book.title}
      </option>
    ));
    const imgList = this.state.images.map((image, i) => (
      <MenuItem
        onClick={() => this.handleSelect(image.name)}
        key={i}
        eventKey={image.name}
      >
        {image.name}
      </MenuItem>
    ));
    return (
      <Well style={{ marginTop: "70px" }}>
        <Row>
          <Col xs={12} sm={6}>
            <Panel>
              <InputGroup>
                <FormControl type="text" ref="image" value={this.state.img} />
                <DropdownButton
                  componentClass={InputGroup.Button}
                  id="input-dropdown-addon"
                  title="Select an image"
                  bsStyle="primary"
                >
                  {imgList}
                </DropdownButton>
              </InputGroup>
              <Image src={this.state.img} responsive />
            </Panel>
          </Col>
          <Col xs={12} sm={6}>
            <Panel>
              <FormGroup
                controlId="title"
                validationState={this.props.validation}
              >
                <ControlLabel>Tittle</ControlLabel>
                <FormControl
                  type="text"
                  placeholder="Enter Title"
                  ref="title"
                />
                <FormControl.Feedback />

              </FormGroup>
              <FormGroup
                controlId="Description"
                validationState={this.props.validation}
              >
                <ControlLabel>Description</ControlLabel>
                <FormControl
                  type="text"
                  placeholder="Enter description"
                  ref="description"
                />
                <FormControl.Feedback />

              </FormGroup>
              <FormGroup
                controlId="price"
                validationState={this.props.validation}
              >
                <ControlLabel>Price</ControlLabel>
                <FormControl
                  type="text"
                  placeholder="Enter Price"
                  ref="price"
                />
                <FormControl.Feedback />
              </FormGroup>
              <Button
                bsStyle={!this.props.style ? "primary" : this.props.style}
                onClick={this.props.msg ? this.resetForm : this.saveBook}
              >
                {!!this.props.msg ? this.props.msg : "Save Book"}
                {/* {(!this.prop.msg)?("Save Book"):(this.props.msg)} */}
              </Button>
            </Panel>
            <Panel>
              <FormGroup controlId="formControlsSelect">
                <ControlLabel>Select a book id to delete</ControlLabel>
                <FormControl
                  ref="delete"
                  componentClass="select"
                  placeholder="select"
                >
                  {booksList}
                </FormControl>
              </FormGroup>
              <Button onClick={this.handleDeleteBooks} bsStyle="danger">
                Delete Book
              </Button>
            </Panel>
          </Col>
        </Row>
      </Well>
    );
  }
}
const mapStateToProps = ({ books }) => {
  return {
    books: books.books,
    msg: books.msg,
    style: books.style,
    validation: books.validation
  };
};

export default connect(mapStateToProps, {
  StartPostBooks,
  startDeleteBooks,
  startGetBooks,
  resetForm
})(BooksForm);
