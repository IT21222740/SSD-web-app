import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import React, {
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
  useCallback,
} from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Card, ListGroup, Badge, Button, Form, Spinner } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { Store } from "../../components/Online-shopping-components/Store";
import Rating from "../../components/Online-shopping-components/Rating";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import MessageBox from "../../components/Online-shopping-components/MessageBox";
import { getError } from "../../components/Online-shopping-components/Utils";
import { motion } from "framer-motion";
import { message } from "antd";
import DOMPurify from "dompurify";
import "./product.css";

const reducer = (state, action) => {
  switch (action.type) {
    case "REFRESH_PRODUCT":
      return { ...state, product: action.payload };
    case "CREATE_REQUEST":
      return { ...state, loadingCreateReview: true };
    case "CREATE_SUCCESS":
      return { ...state, loadingCreateReview: false };
    case "CREATE_FAIL":
      return { ...state, loadingCreateReview: false };
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, product: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function Product() {
  const isValidImageUrl = (url) => {
    return url?.startsWith("http") && /\.(jpeg|jpg|gif|png)$/.test(url);
  };

  const reviewsRef = useRef();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  const [{ loading, error, product, loadingCreateReview }, dispatch] =
    useReducer(reducer, {
      product: {},
      loading: true,
      error: "",
    });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get(`/api/products/id/${id}`);
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (error) {
        dispatch({ type: "FETCH_FAIL", payload: getError(error) });
      }
    };
    fetchData();
  }, [id]);

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const addToCartHandler = useCallback(async () => {
    const existItem = cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);

    if (data.countInStock < quantity) {
      message.error("Sorry, the product is out of stock");
      return;
    }

    ctxDispatch({ type: "CART_ADD_ITEM", payload: { ...product, quantity } });
    navigate("/cart");
  }, [cart.cartItems, ctxDispatch, navigate, product]);

  const submitHandler = useCallback(
    async (e) => {
      e.preventDefault();
      if (!comment || !rating) {
        message.error("Please enter comment and rating");
        return;
      }

      try {
        // Sanitize inputs before sending
        const sanitizedComment = DOMPurify.sanitize(comment);
        const sanitizedName = DOMPurify.sanitize(userInfo.name);
        const sanitizedRating = parseInt(rating, 10);

        const { data } = await axios.post(
          `/api/products/${product._id}/reviews`,
          {
            rating: sanitizedRating,
            comment: sanitizedComment,
            name: sanitizedName,
          }
        );

        dispatch({ type: "CREATE_SUCCESS" });
        message.success("Review submitted successfully");

        product.reviews.unshift(data.review);
        product.numReviews = data.numReviews;
        product.rating = data.rating;
        dispatch({ type: "REFRESH_PRODUCT", payload: product });

        window.scrollTo({
          behavior: "smooth",
          top: reviewsRef.current.offsetTop,
        });
      } catch (error) {
        dispatch({ type: "CREATE_FAIL" });
        message.error(getError(error));
      }
    },
    [comment, rating, product, userInfo]
  );

  return loading ? (
    <Spinner animation="border" variant="primary" />
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Row>
        <Col md={6}>
          {isValidImageUrl(product.image) ? (
            <img
              className="img-large"
              src={DOMPurify.sanitize(product.image)}
              alt={DOMPurify.sanitize(product.name)}
            />
          ) : (
            <p>Invalid image format</p>
          )}
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <Helmet>
                <title>{product.name}</title>
              </Helmet>
              <h1>{product.name}</h1>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating rating={product.rating} numReviews={product.numReviews} />
            </ListGroup.Item>
            <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
            <ListGroup.Item>Save 5% 😄</ListGroup.Item>
            <ListGroup.Item>Category: {product.category}</ListGroup.Item>
            <ListGroup.Item>
              <p>{product.description}</p>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>${product.price}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      {product.countInStock > 0 ? (
                        <Badge bg="success">In Stock</Badge>
                      ) : (
                        <Badge bg="danger">Unavailable</Badge>
                      )}
                    </Col>
                  </Row>
                </ListGroup.Item>
                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <div className="d-grid">
                      <Button onClick={addToCartHandler} variant="primary">
                        Add to Cart
                      </Button>
                      <Button
                        onClick={() => navigate("/homeee")}
                        variant="primary"
                      >
                        Customize
                      </Button>
                    </div>
                  </ListGroup.Item>
                )}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <div className="my-3">
        <h2 ref={reviewsRef}>Reviews</h2>
        <div className="mb-3">
          {product.reviews.length === 0 && (
            <MessageBox>There is no review</MessageBox>
          )}
        </div>
        <ListGroup>
          {product.reviews.map((review) => (
            <ListGroup.Item key={review._id}>
              <strong>{review.name}</strong>
              <Rating rating={review.rating} caption=" " />
              <p>{review.createdAt.substring(0, 10)}</p>
              <p>{review.comment}</p>
            </ListGroup.Item>
          ))}
        </ListGroup>
        <div className="my-3">
          {userInfo ? (
            <form onSubmit={submitHandler}>
              <h2>Write a customer review</h2>
              <Form.Group className="mb-3" controlId="rating">
                <Form.Label>Rating</Form.Label>
                <Form.Select
                  aria-label="Rating"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                >
                  <option value="">Select...</option>
                  <option value="1">1 - Poor</option>
                  <option value="2">2 - Fair</option>
                  <option value="3">3 - Good</option>
                  <option value="4">4 - Very Good</option>
                  <option value="5">5 - Excellent</option>
                </Form.Select>
              </Form.Group>
              <FloatingLabel
                controlId="floatingTextarea"
                label="Comment"
                className="mb-3"
              >
                <Form.Control
                  as="textarea"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Leave a comment here"
                  style={{ height: "100px" }}
                />
              </FloatingLabel>
              <div className="d-grid">
                <Button
                  disabled={loadingCreateReview}
                  type="submit"
                  variant="primary"
                >
                  Submit
                </Button>
                {loadingCreateReview && (
                  <Spinner animation="border" variant="primary" />
                )}
              </div>
            </form>
          ) : (
            <MessageBox>
              Please <Link to="/signin">sign in</Link> to write a review.
            </MessageBox>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default Product;
