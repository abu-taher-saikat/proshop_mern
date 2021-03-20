import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Image, ListGroup, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { listProductDetails } from '../actions/productActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
// import products from '../products';
import Rating from '../components/Rating';




const ProductScreen = ({history, match}) => {
    const [qty, setQty] = useState(1);
    const dispatch = useDispatch();
    const productDetails = useSelector(state => state.productDetails);
    const {loading, error, product} = productDetails;

    useEffect(() => {
        dispatch(listProductDetails(match.params.id));
    },[dispatch, match]);

    const addToCartHandler = () =>{
        history.push(`/cart/${match.params.id}?qty=${qty}`);
    }
    
    return (
        <>
            <Link className="btn btn-dark my-3" to="/">Go Back</Link>
            {loading ? <Loader></Loader> : error ? <Message variant='danger'>{error}</Message> : (<Row>
                <Col md={6}>
                    <Image src={product.image} fluid alt={product.name}>

                    </Image>
                </Col>
                <Col md={3}>
                    <ListGroup varient='flush'>
                        <ListGroup.Item>
                            <h3>{product.name}</h3>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Rating value={product.rating} text={`${product.numReviews} reviews`}></Rating>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Price: ${product.price}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Description : {product.description}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>

                <Col md={3}>
                    <ListGroup varient="flush">
                        <ListGroup.Item>
                            <Row>
                                <Col>Price:</Col>
                                <Col><strong>${product.price}</strong></Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Status:</Col>
                                <Col>{product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}</Col>
                            </Row>
                        </ListGroup.Item>
                        {product.countInStock > 0 && (
                            <ListGroup.Item>
                                <Row>
                                    <Col>Qty</Col>
                                    <Col>
                                        <Form.Control as='select' value={qty} onChange={(e)=> setQty(e.target.value)}>
                                           { [...Array(product.countInStock).keys()].map((x)=> (
                                                <option key={x + 1} value={x + 1}>
                                                    {x + 1}
                                                </option>
                                            ))
                                           }
                                        </Form.Control>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        )}
                        <ListGroup.Item>
                            <Button 
                                onClick={addToCartHandler}
                                className="btn-black" 
                                type="button" 
                                disabled={product.countInStock === 0}>
                                Add To Cart  
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>) }

        </>
    )
}

export default ProductScreen
